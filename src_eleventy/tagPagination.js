const lodashChunk = require('lodash.chunk')

const getCategoryTitleBySlug = function(categoriesCollection, slug) {
  let category = categoriesCollection.find(item => {
    return item.data.slug == slug
  })
  
  return category ? category.data.title : null
}

module.exports = function(collection) {
    // Get unique list of tags
    let tagSet = new Set();
    collection.getAllSorted().map(function(item) {
      if( "tags" in item.data ) {
        let tags = item.data.tags;

        // optionally filter things out before you iterate over?
        for (let tag of tags) {
          tagSet.add(tag);
        }

      }
    });
    
    // remove blog and category from taglist. blog used to tag all blogs and used to access blog list from collection
    // category are used to get categories list from collection. No need for a dedicated page.
    tagSet.delete('blog')
    tagSet.delete('category')

    // Get each item that matches the tag
    let paginationSize = 2;
    let tagMap = [];
    let tagArray = [...tagSet];    
    let categories = collection.getFilteredByTag('category')
    for( let tagName of tagArray) {
      // newest items first
      let tagItems = collection.getFilteredByTag(tagName).reverse();
      let pagedItems = lodashChunk(tagItems, paginationSize);
      // console.log( tagName, tagItems.length, pagedItems.length );
      for( let pageNumber = 0, max = pagedItems.length; pageNumber < max; pageNumber++) {
        let previous = pageNumber === 0 ? null : pageNumber - 1
        let next = pageNumber === max-1 ? null : pageNumber + 1
        tagMap.push({
          tagName: tagName,
          tagTitle: getCategoryTitleBySlug(categories, tagName),
          pageNumber: pageNumber,
          items: pagedItems[pageNumber],
          href: {
            previous,
            next
          }
        });
      }
    }

    /* return data looks like:
      [{
        tagName: "tag1",
        pageNumber: 0
        pageData: [] // array of items
      },{
        tagName: "tag1",
        pageNumber: 1
        pageData: [] // array of items
      },{
        tagName: "tag1",
        pageNumber: 2
        pageData: [] // array of items
      },{
        tagName: "tag2",
        pageNumber: 0
        pageData: [] // array of items
      }]
    */
    // console.log( tagMap );
    return tagMap;
};