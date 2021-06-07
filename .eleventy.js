const now = String(Date.now())
const yaml = require("js-yaml")


module.exports = (eleventyConfig) => {
    const {Liquid} = require("liquidjs");
    const options = {
      extname: ".liquid",
      dynamicPartials: true,
      strictFilters: true,
      root: ["_includes"]
    };
    eleventyConfig.setLibrary("liquid", new Liquid(options));
    eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
  
    eleventyConfig.addFilter("eleventy_version", () => require("@11ty/eleventy/package.json").version);
    eleventyConfig.addFilter("liquid_version", () => require("liquidjs/package.json").version);
  
    
    // Copy css to _site directory
    /* eleventyConfig.addWatchTarget('./_tmp/style.css')
    eleventyConfig.addPassthroughCopy({'_tmp/main.css': 'css/main.css' })
    eleventyConfig.addShortcode('version', function(){ return now }) */
    
    eleventyConfig.addShortcode('version', function(){ return now })
    
    eleventyConfig.addPassthroughCopy()
    eleventyConfig.addPassthroughCopy({
      "assets": "assets",
      "src/admin/config.yml": "admin/config.yml",
    })
    
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