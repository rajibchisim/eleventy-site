module.exports = {
    eleventyComputed: {
      layout: "layouts/post",
      permalink: (data) => {
        // let postpermalink = data.draft ? false : `/blogs/${data.slug}/`
        let postpermalink = `/blogs/${data.slug}/`
        console.log(postpermalink)
        // return data.draft ? false : `/blogs/${data.slug}/`
        return postpermalink
      },
      tags: [
        "blog"
      ]
    }
  };