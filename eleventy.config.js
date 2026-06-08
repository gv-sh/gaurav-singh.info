import markdownItContainer from "markdown-it-container";

export default function (eleventyConfig) {
  // Copy assets to output
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("src/assets/css/");

  // ::: cite … ::: → <div class="cite">…</div> (used by some ported content)
  eleventyConfig.amendLibrary("md", (md) => {
    md.use(markdownItContainer, "cite");
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

  // Yearly reflections — their own collection, newest year first.
  eleventyConfig.addCollection("reflections", function (collection) {
    return collection
      .getFilteredByGlob("src/reflections/*.md")
      .sort((a, b) => b.data.year - a.data.year);
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
