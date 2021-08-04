module.exports = {
    eleventyComputed: {
      /* categories: () => {
        return ['one', 'two', 'three']
      }, */
      permalink: (data) => {
        let postpermalink = `/blogs/${data.slug}/`
        return postpermalink
      }
    }
  };