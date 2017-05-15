//use express server
const express = require("express");
//use express-nunjucks
const expressNunjucks = require('express-nunjucks');
//constructor for express server
const app = express();
// use data.js
const data = require("./data");

function getUniqueGroups (groups) {
    const group = [];
    data.forEach(item => {
        if (!group.includes(item[groups])){
            group.push(item[groups]);
        }
    });
    return group;
}

function getItems(category, collection){

    if (!category && !collection) {
        return data;
    }

    //data.filter returns an array
    const results = data.filter(item => {
        if(category && collection) {
            return item.category === category && item.collection === collection;
        }

        return (category && item.category === category) || (collection && item.collection === collection);
    });

    return results;
}

//load unique categories on load
const categories = getUniqueGroups("category");

//load collection on load
const collections = getUniqueGroups("collection");

//send index page
app.get("/", (request,response) => {
    response.render('home', {
        categories, collections
    });
});

app.get("/collection/:collection", (request,response) => {
    const {collection} = request.params;
    const items = getItems(null, collection);
    response.render("results", {
        categories,
        collections,
        items
    });

});

app.get("/category/:category", (request,response) => {
    const {category} = request.params;
    const items = getItems(category, null);
    response.render("results", {
        categories,
        collections,
        items
    });

});

app.use(express.static("static"));

//send data items
app.get("/items", (request, response) => {

});

//send categories
app.get("/categories", (request, response)=>{
    response.send(categories);
});

//storing templates in a particular folder
app.set('views', __dirname + '/templates');
app.set('view engine', 'njk');

expressNunjucks(app, {
    watch: true,
    noCache: true
});


//creating a port - setting to listen
app.listen(9000,() => {
    console.log("listening on port 9000");
});



