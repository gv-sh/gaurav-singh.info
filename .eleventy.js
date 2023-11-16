const yaml = require("js-yaml");
const fs = require("fs");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("*.html");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("bundle.css");
  eleventyConfig.addCollection("projects", function (collection) {
    return collection.getFilteredByGlob("projects/*.md").reverse();
  });
  eleventyConfig.addCollection("research", function (collection) {
    return collection.getFilteredByGlob("research/*.md").reverse();
  });
  eleventyConfig.addCollection("teaching", function (collection) {
    return collection.getFilteredByGlob("teaching/*.md").reverse();
  });
  eleventyConfig.addCollection("journal", function (collection) {
    return collection.getFilteredByGlob("journal/*.md").reverse();
  });
  eleventyConfig.addCollection("store", function (collection) {
    return collection.getFilteredByGlob("store/*.md").reverse();
  });
  eleventyConfig.addCollection("work", function (collection) {
    return collection.getFilteredByGlob("work/*.md").reverse();
  });
  eleventyConfig.addCollection("education", function (collection) {
    return collection.getFilteredByGlob("education/*.md").reverse();
  });
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toISODate();
  });
  eleventyConfig.addFilter("postYear", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy");
  });

  eleventyConfig.addTransform("removeEmptyLines", function (content, outputPath) {
    if (outputPath.endsWith(".html")) {
      return content.replace(/^\s*\n/gm, "");
    }
    return content;
  });

  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("robots.txt");
};