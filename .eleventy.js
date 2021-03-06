const {DateTime} = require("luxon");
const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");
const slugify = require("slugify");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
  // navigation
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // RSS feed
  eleventyConfig.addPlugin(pluginRss);

  // Merge data instead of overriding
  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("d LLL, yyyy");
  });

  // Date formatting (machine readable)
  eleventyConfig.addFilter("machineDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  // Minify CSS
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath !== false && outputPath.indexOf(".html") > -1) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
    }
    return content;
  });

  // Universal slug filter strips unsafe chars from URLs
  eleventyConfig.addFilter("slugify", function (str) {
    return slugify(str, {
      lower: true,
      replacement: "-",
      remove: /[*+~.·,()'"`´%!?¿:@]/g
    });
  });

  // Don't process folders with static assets e.g. images
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("_includes/assets/");
  eleventyConfig.addPassthroughCopy("images/");

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: false
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
      .use(markdownItAnchor, opts)
  );

  eleventyConfig.addCollection("livePosts", function (collectionApi) {
    return collectionApi.getFilteredByTag("post")
    .filter(p => !p.data.draft);
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
