const yaml = require("js-yaml");
const fs = require("fs");
const { DateTime } = require("luxon");
const truncate = require('./_11ty/filters/truncate');

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
  eleventyConfig.addCollection("peers", function (collection) {
    return collection.getFilteredByGlob("peers/*.md").reverse();
  });
  eleventyConfig.addCollection("students", function (collection) {
    return collection.getFilteredByGlob("students/*.md").reverse();
  });
  eleventyConfig.addCollection("mentors", function (collection) {
    return collection.getFilteredByGlob("mentors/*.md").reverse();
  });
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toISODate();
  });
  eleventyConfig.addFilter("postYear", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy");
  });
  eleventyConfig.addFilter('truncate', truncate);

  eleventyConfig.addTransform("removeEmptyLines", function (content, outputPath) {
    if (outputPath.endsWith(".html")) {
      return content.replace(/^\s*\n/gm, "");
    }
    return content;
  });

  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("robots.txt");

  // Define metadata
  eleventyConfig.addGlobalData("metadata", {
    siteName: "Gaurav Singh",
    description: "Exploring ML, data visualization, and ethical engineering solutions",
    keywords: "Gaurav Singh, personal website, blog, human-computer interaction, ethical AI, data visualization, responsible innovation, design mathematics, researcher Griffith University, researcher Srishti, creative coding, ML and art.",
    author: "Gaurav Singh",
    url: "https://gaurav-singh.info"
  });
};