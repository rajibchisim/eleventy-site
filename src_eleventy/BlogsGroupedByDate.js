/**
 * Group posts by months 
 * purpose: Showing posts links under months in sidebar
 */
const moment = require("moment")

const byDate = function(collectionApi) {
    return group(collectionApi, 'date')
}

const byMonth = function (collectionApi){
    return group(collectionApi, 'month')
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
   
const group = function (collectionApi, by = 'date') {
    let spCollection = {};
    collectionApi.getFilteredByTag('blog').forEach(item => {
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

// using this function as an reference
// might be usefull when sorting other than date by just modifying field sort logic
const latest = function(collectionApi) {
    let blogs = collectionApi.getFilteredByTag('blog')
                    .sort((a, b) => {
                        let dateA = new Date(a.data.date)
                        let dateB = new Date(b.data.date)
                        if(dateA < dateB ) return 1
                        else if (dateA > dateB) return -1
                        else return 0        
                    })
    
    let onlyData = []
    blogs.forEach(item => {
        onlyData.push(item.data)
    })
    
    // console.log(onlyData)
    
    return onlyData
}

const oldest = function(collectionApi) {
    let blogs = collectionApi.getFilteredByTag('blog')
                        .sort((a, b) => {
                            let dateA = new Date(a.data.date)
                            let dateB = new Date(b.data.date)
                            if(dateA < dateB ) return -1
                            else if (dateA > dateB) return 1
                            else return 0        
                        }) 
    let onlyData = []
    blogs.forEach(item => {
        onlyData.push(item.data)
    })           
             
    return onlyData
}

module.exports =  {
    byDate, 
    byMonth,
    latest,
    oldest
}