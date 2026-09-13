export default function (eleventyConfig) {
  // Copy assets to output
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  // Ink Signal is staged as a self-contained project site because its source
  // repository is private and GitHub Pages cannot check it out with the
  // site's read-only GITHUB_TOKEN.
  eleventyConfig.addPassthroughCopy({ "src/ink-signal": "ink-signal" });

  // Never process a stray build-output folder nested under src (iCloud can
  // leave one behind); it would crash the notes permalink (no `id`).
  eleventyConfig.ignores.add("src/**/_site/**");

  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("src/assets/css/");

  eleventyConfig.addTransform("deferMedia", function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      return content
        .replace(/<img(?![^>]*\balt=)(\s)/g, '<img alt=""$1')
        .replace(/<img (?![^>]*\bloading=)/g, '<img loading="lazy" decoding="async" ')
        .replace(/<iframe (?![^>]*\bloading=)/g, '<iframe loading="lazy" ');
    }
    return content;
  });

  // Drafts: still shown under `eleventy --serve` for previewing, but excluded
  // from the production build (`eleventy`). Mark a page with `draft: true`.
  eleventyConfig.addPreprocessor("drafts", "njk,md,html", (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") return false;
  });

  // Bear-blog style date, e.g. "07 Jun, 2026" (zero-padded day), for the notes listing.
  eleventyConfig.addFilter("blogDate", function (d) {
    const dt = d instanceof Date ? d : new Date(d);
    const day = String(dt.getUTCDate()).padStart(2, "0");
    const mon = dt.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
    return `${day} ${mon}, ${dt.getUTCFullYear()}`;
  });

  // ISO date (YYYY-MM-DD).
  eleventyConfig.addFilter("isoDate", function (d) {
    const dt = d instanceof Date ? d : new Date(d);
    return dt.toISOString().slice(0, 10);
  });

  // Safely serialize template values used in structured metadata.
  eleventyConfig.addFilter("json", function (value) {
    return JSON.stringify(value);
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
