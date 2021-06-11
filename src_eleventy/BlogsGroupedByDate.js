/**
 * Group posts by months 
 * purpose: Showing posts links under months in sidebar
 */
const moment = require("moment")

const byDate = function(collection) {
    return group(collection, 'date')
}

const byMonth = function (collection){
    return group(collection, 'month')
}


/* 
    {
        "2021-06-08": [
        {
            title: "some title",
            url: "/posts/some-title"
        },
        {
            title: "another title",
            url: "/posts/another-title"
        }
        ],
        "2021-06-08": [
        {
            title: "some title",
            url: "/posts/some-title"
        },
        {
            title: "another title",
            url: "/posts/another-title"
        }
        ]
    }
    */

    /* 
    [
        {
        name: "2021-06-08",
        posts: [
            {
            title: "some title",
            url: "/posts/some-title"
            },
            {
            title: "another title",
            url: "/posts/another-title"
            }
        ]
        }
    ]
    */
   
const group = function (collection, by = 'date') {
    let spCollection = {};
    collection.getFilteredByTag('blog').forEach(item => {
        let dateKey = ''
        if(by === 'date') {
            dateKey = (new moment(item.data.date)).format('YYYY-MM-DD')
        } else if (by === 'month') {
            dateKey = (new moment(item.data.date).startOf('Month')).format('YYYY-MM-DD')
        } else {
            return null
        }
        
        if(spCollection.hasOwnProperty(dateKey)) {
        spCollection[dateKey].push({
            title: item.data.title,
            url: item.url
        })
        } else {
        let newEntry = []
        newEntry.push({
            title: item.data.title,
            url: item.url
        })
        spCollection[dateKey] = newEntry
        }
    })

    let spCollectionGrouped = [];
    Object.keys(spCollection).forEach(item => {
        spCollectionGrouped.push({
        name: item,
        posts: spCollection[item]
        })
    })
    
    return spCollectionGrouped
}

module.exports =  {
    byDate, byMonth
}