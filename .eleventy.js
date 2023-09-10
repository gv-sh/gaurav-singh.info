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
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toISODate();
  });
  eleventyConfig.addFilter("postYear", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy");
  });
  eleventyConfig.addPassthroughCopy("CNAME");
};