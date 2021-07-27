module.exports = {
    eleventyComputed: {
      permalink: (data) => {
        let postpermalink = `/blogs/${data.slug}/`
        return postpermalink
      }
    }
  };