const now = String(Date.now())
const yaml = require("js-yaml")
const blogsGrouped = require('./src_eleventy/BlogsGroupedByDate')
const htmlmin = require('html-minifier')


module.exports = (eleventyConfig) => {
    const {Liquid} = require("liquidjs");
    const options = {
      extname: ".liquid",
      dynamicPartials: true,
      strictFilters: true,
      root: ["_includes"]
    };
    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.setDataDeepMerge(true);
    eleventyConfig.setLibrary("liquid", new Liquid(options));
    eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
  
    eleventyConfig.addFilter("eleventy_version", () => require("@11ty/eleventy/package.json").version);
    eleventyConfig.addFilter("liquid_version", () => require("liquidjs/package.json").version);
  
    
    eleventyConfig.addCollection("blogsGroupedByDate", blogsGrouped.byDate);
    eleventyConfig.addCollection("blogsGroupedByMonth", blogsGrouped.byMonth);
    
    // Copy css to _site directory
    /* eleventyConfig.addWatchTarget('./_tmp/style.css')
    eleventyConfig.addPassthroughCopy({'_tmp/main.css': 'css/main.css' })
    eleventyConfig.addShortcode('version', function(){ return now }) */
    
    eleventyConfig.addShortcode('version', function(){ return now })
    
    
    // Watch our generated CSS file for changes
    eleventyConfig.addWatchTarget("./_tmp/css/main.css");
    // If it changes, write it to our generated full site
    eleventyConfig.addPassthroughCopy({ 
      "assets/img": "assets/img",
      "src/admin/config.yml": "admin/config.yml",
      "_tmp/css/main.css": "assets/css/main.css" 
    });
    
    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
      // Eleventy 1.0+: use this.inputPath and this.outputPath instead
      if (outputPath.endsWith(".html")) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });
        return minified;
      }
  
      return content;
    });
    
    return {
      // markdownTemplateEngine: 'liquid',
      // templateFormats: ['html', 'liquid', 'md'],
      dir: {
        input: "src",
        output: "_site",
        data: '_data'
      }
    };
  };