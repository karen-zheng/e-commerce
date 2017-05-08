//use express server
const express = require("express");
//constructor for express server
const app = express();
// use data.js
const data = require("./data");

//load categories on load
const categories = [];
data.forEach(item => {
    if (!categories.includes(item.category)){
        categories.push(item.category);
    }
});

//send index page
app.get("/", (request,response) => {
    response.sendFile(__dirname + "/static/index.html");
});

//send css
app.get("/main.css", (request,response) => {
    response.sendFile(__dirname + "/static/main.css");
});

//send data items
app.get("/items", (request, response) => {
    response.send(data);
});

//send categories
app.get("/categories", (request, response)=>{
    response.send(categories);
});


//creating a port - setting to listen
app.listen(9000,() => {
    console.log("listening on port 9000");
});

