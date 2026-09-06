import markdownItContainer from "markdown-it-container";
import markdownItKatexModule from "@vscode/markdown-it-katex";
import markdownItFootnote from "markdown-it-footnote";
import makingData from "./src/_data/making.js";
import thesesData from "./src/_data/theses.js";

// CJS/ESM interop: the callable plugin sits at .default.default here.
const markdownItKatex =
  markdownItKatexModule.default?.default ||
  markdownItKatexModule.default ||
  markdownItKatexModule;

export default function (eleventyConfig) {
  // Copy assets to output
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  // Ink Signal is staged as a self-contained project site because its source
  // repository is private and GitHub Pages cannot check it out with the
  // site's read-only GITHUB_TOKEN.
  eleventyConfig.addPassthroughCopy({ "src/ink-signal": "ink-signal" });

  // KaTeX stylesheet + fonts (math is rendered to HTML at build time).
  eleventyConfig.addPassthroughCopy({
    "node_modules/katex/dist/katex.min.css": "assets/katex/katex.min.css",
    "node_modules/katex/dist/fonts": "assets/katex/fonts",
  });

  // Never process a stray build-output folder nested under src (iCloud can
  // leave one behind); it would crash the notes permalink (no `id`).
  eleventyConfig.ignores.add("src/**/_site/**");

  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("src/assets/css/");

  // Lazy-load images that don't already opt out — helps the image-heavy notes.
  eleventyConfig.addTransform("lazyImages", function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      return content.replace(/<img (?![^>]*\bloading=)/g, '<img loading="lazy" ');
    }
    return content;
  });

  // ::: cite … ::: → <div class="cite">…</div> (used by some ported content)
  eleventyConfig.amendLibrary("md", (md) => {
    md.set({ linkify: true }); // auto-link bare URLs (e.g. in footnote references)
    md.use(markdownItContainer, "cite");
    md.use(markdownItKatex);
    md.use(markdownItFootnote);
  });

  // Drafts: still shown under `eleventy --serve` for previewing, but excluded
  // from the production build (`eleventy`). Mark a page with `draft: true`.
  eleventyConfig.addPreprocessor("drafts", "njk,md,html", (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") return false;
  });

  // Newest-first list of blog posts.
  eleventyConfig.addCollection("posts", function (collection) {
    return collection
      .getFilteredByGlob("src/posts/*.md")
      .filter((post) => !post.data.draft)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  // "Making" as one consolidated list: curated things made (making + theses,
  // each optionally linking to its detail note) plus the standalone project
  // notes folded in. Notes already represented elsewhere are excluded — 2-02,
  // 2-07, 2-08 link from their curated entry; 2-01 lives on the teaching page.
  eleventyConfig.addCollection("made", function (collection) {
    // ReRide (2-08) is the single curated entry; its sibling notes (2-04, 2-09,
    // 2-10, 2-11, 2-12, 2-13) are linked from it rather than listed separately.
    // 2-01 lives on teaching; 2-02/2-07 link from their own curated entries.
    const covered = new Set([
      "2-01", "2-02", "2-04", "2-07", "2-08", "2-09", "2-10", "2-11", "2-12", "2-13",
    ]);
    // One-line descriptions for the folded-in project notes (which have no blurb
    // of their own), keyed by note id.
    const desc = {
      "2-05": "The origins and aims of Mathscapes, my maths research studio.",
      "2-06": "The Mathscapes wordmark and its trademark registration.",
      "2-03": "Detecting people approaching a camera with Haar-cascade classifiers; my pre-thesis project.",
      "2-14": "A mobile app using situated memory to support senior citizens' wellbeing.",
    };
    const noteItems = collection
      .getFilteredByGlob("src/notes/*.md")
      .filter((n) => n.data.root === 2 && !covered.has(n.data.id))
      .map((n) => ({
        year: new Date(n.date).getUTCFullYear(),
        title: n.data.title,
        href: n.url,
        note: "",
        blurb: desc[n.data.id] || "",
        links: [],
      }));
    // Theses get a "Thesis" marker prefixed to their subtitle so they are still
    // distinguishable once merged into the single list.
    const norm = (x, isThesis) => ({
      year: Number(x.year),
      title: x.title,
      href: x.href || "",
      note: isThesis ? (x.note ? "Thesis · " + x.note : "Thesis") : x.note || "",
      blurb: x.blurb || "",
      links: x.links || [],
    });
    const curated = [
      ...makingData.map((x) => norm(x, false)),
      ...thesesData.map((x) => norm(x, true)),
    ];
    return [...curated, ...noteItems].sort((a, b) => b.year - a.year);
  });

  // Yearly reflections — their own collection, newest year first.
  eleventyConfig.addCollection("reflections", function (collection) {
    return collection
      .getFilteredByGlob("src/reflections/*.md")
      .sort((a, b) => b.data.year - a.data.year);
  });

  // Notes feed: the "Writing" notes (root 3) plus the yearly reflections,
  // merged into one date-sorted list for the /notes/ page. Reflections are
  // dated to the end of their year (computed here, since Eleventy resolves a
  // page's own `date` before eleventyComputed can touch it).
  eleventyConfig.addCollection("notesFeed", function (collection) {
    const cat = { 2: "Project", 3: "Writing", 4: "Teaching" };
    const notes = collection
      .getFilteredByGlob("src/notes/*.md")
      .filter((n) => [2, 3, 4].includes(n.data.root))
      .map((n) => ({
        url: n.url,
        title: n.data.title || n.data.slug,
        date: n.date,
        category: cat[n.data.root],
      }));
    const refs = collection.getFilteredByGlob("src/reflections/*.md").map((r) => ({
      url: r.url,
      title: r.data.title,
      date: new Date(Date.UTC(Number(r.data.year), 11, 31)),
      category: "Reflection",
    }));
    return [...notes, ...refs].sort((a, b) => b.date - a.date);
  });

  // Date filter for dd.mm.yy format
  eleventyConfig.addFilter("shortDate", function (date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
  });

  // Date filter for post pages (full format)
  eleventyConfig.addFilter("date", function (date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Filter: pick collection items belonging to a specific root number.
  eleventyConfig.addFilter("byRoot", function (items, rootNum) {
    return items.filter((item) => item.data.root === rootNum);
  });

  // Filter: notes for a given root, sorted by id (e.g. 5-01, 5-02, …).
  // Used by the /notes/ index to list each category in order.
  eleventyConfig.addFilter("byRootSorted", function (items, rootNum) {
    return items
      .filter((item) => item.data.root === rootNum)
      .sort((a, b) => String(a.data.id).localeCompare(String(b.data.id)));
  });

  // Year-only filter (e.g. 2021) for compact listings.
  eleventyConfig.addFilter("year", function (d) {
    return new Date(d).getUTCFullYear();
  });

  // Bear-blog style date, e.g. "07 Jun, 2026" (zero-padded day), for the notes listing.
  eleventyConfig.addFilter("blogDate", function (d) {
    const dt = d instanceof Date ? d : new Date(d);
    const day = String(dt.getUTCDate()).padStart(2, "0");
    const mon = dt.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
    return `${day} ${mon}, ${dt.getUTCFullYear()}`;
  });

  // Look up a note's URL by its exact title — used by the People page to link
  // each name to its /5-xx/ about-note where one exists.
  eleventyConfig.addFilter("noteUrlByTitle", function (notes, title) {
    const match = (notes || []).find((n) => n.data.title === title);
    return match ? match.url : "";
  });

  // Long-form readable date (e.g. "30 May 2026").
  eleventyConfig.addFilter("readableDate", function (d) {
    const dt = d instanceof Date ? d : new Date(d);
    return dt.toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  // ISO date (YYYY-MM-DD).
  eleventyConfig.addFilter("isoDate", function (d) {
    const dt = d instanceof Date ? d : new Date(d);
    return dt.toISOString().slice(0, 10);
  });

  // RFC3339 timestamp for the Atom feed.
  eleventyConfig.addFilter("rfc3339", function (d) {
    const dt = d instanceof Date ? d : new Date(d);
    return dt.toISOString();
  });

  // First-sentence excerpt from rendered content, capped — for the reflections list.
  eleventyConfig.addFilter("excerpt", function (content) {
    if (!content) return "";
    const html = String(content);
    const p = html.match(/<p>([\s\S]*?)<\/p>/i);
    const text = (p ? p[1] : html)
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const sentence = text.match(/^(.*?[.!?])(?:\s|$)/);
    let s = sentence ? sentence[1] : text;
    if (s.length > 150) s = s.slice(0, 149).replace(/\s+\S*$/, "") + "…";
    return s;
  });

  // Basic configuration
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}
