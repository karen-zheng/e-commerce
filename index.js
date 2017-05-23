//use express server
const express = require("express");
//use express-nunjucks
const expressNunjucks = require('express-nunjucks');
//constructor for express server
const app = express();
// we need this to enable express to handle POST requests
const bodyParser = require('body-parser');
// we need this to be able to read cookies
const cookieParser = require('cookie-parser');
// use data.js
const data = require("./data");
const uuidV4 = require('uuid/v4');
// to store a cart per session to a cart database
const carts = {};

// boilerplate copypasta enabling express to handle POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
//middle ware for cart so each route doesn't have to request cart
app.use(function(req, res, next){
    const emptyCart = {itemCount: 0, items: []};

    if(req.cookies) {
        const {cartId} = req.cookies; //stores cookies using cookieParser
        if(cartId && carts[cartId]) {
            //reduce iterates over an array and adds each number together. The last argument 0 is the initial value
            const itemCount = carts[cartId].reduce((previous, current) => previous + current.quantity, 0);
            req.cart = {itemCount, items: carts[cartId]};
        } else {
            req.cart = emptyCart;
        }
    } else {
        req.cart = emptyCart;
    }

    next();
});

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
    return data.filter(item => {
        if(category && collection) {
            return item.category === category && item.collection === collection;
        }

        return (category && item.category === category) || (collection && item.collection === collection);
    });
}

//load unique categories on load
const categories = getUniqueGroups("category");

//load collection on load
const collections = getUniqueGroups("collection");

//send index page
app.get("/", (request,response) => {
    let paymentResult = "incomplete";
    response.render('home', {
        categories,
        collections,
        cart: request.cart,
        paymentResult
    });
});

app.get("/home", (request,response) => {
    let paymentResult = "incomplete";
    response.render('home', {
        categories,
        collections,
        cart: request.cart,
        paymentResult
    });
});

app.get("/results" , (request, response) => {
    const items = getItems(null, null);
    response.render("results", {
        categories,
        collections,
        items,
        cart: request.cart
    });
});

app.get("/collection/:collection", (request,response) => {
    const {collection} = request.params;
    const items = getItems(null, collection);
    response.render("results", {
        categories,
        collections,
        items,
        cart: request.cart
    });
});

app.post("/cart", (request, response) => {
    let {item, quantity} = request.body; //request.body contains data from user browser.
    let {cartId} = request.cookies; //gets the cartId from cookie
    const itemData = data.find(dataItem => dataItem.name === item);

    if (carts[cartId]) { //checks for existing shopping cart
        const existingItem = carts[cartId].find(cartItem => cartItem.name === item); // finds matching items already in shopping cart

        if (existingItem) {
            if(quantity == null) {
                existingItem.quantity++;
            } else {
                existingItem.quantity = parseInt(quantity);
            }
        } else {
            carts[cartId].push(Object.assign({quantity: 1}, itemData));  //adds new item, initialised to one. in Object.assign the left argument
            // should be a new object the right argument get copied and merged into the left argument. The right argument can be an existing object that
            //doesn't need to be changed
            console.log("new item created");
        }
    } else {
        // create a new shopping cart
        cartId = uuidV4(); //creates a unique id in cartID
        carts[cartId] = [Object.assign({quantity: 1}, itemData)] //A cartId entry is created in the carts Database,
        // with the name of an item and quantity. Initialised to one.
    }

    response.send({cartId, items: carts[cartId]}); // send cart id and also the items existing in the cart
});

app.post("/checkout", (request, response) => {
    const {cartId} = request.cookies;
    const cart = carts[cartId];
    const message = "your cart is empty";

    if(cart == undefined){
        response.render("cart", {
            categories,
            collections,
            cart: request.cart,
            message
        });
    } else {
        const total = cart.reduce((previous, current) => {
            return previous + (current.price * current.quantity);
        },0);
        if (total == 0){
            response.render("cart", {
                categories,
                collections,
                cart: request.cart,
                message
            });
        } else {
                response.render("checkout", {
                    categories,
                    collections,
                    cart: request.cart,
                    total
                });
            }
    }
});

app.post("/payment", (request, response) => {
    let {firstName,lastName, company, email, streetAddress, suburb, city, country} = request.body;
    const {cartId} = request.cookies;
    const cart = carts[cartId];
    const total = cart.reduce((previous, current) => {
        return previous + (current.price * current.quantity);
    },0);

    response.render("payment", {
        categories,
        collections,
        total,
        firstName,
        lastName,
        company,
        email,
        streetAddress,
        suburb,
        city,
        country
    });
});

app.post("/paymentComplete", (request, response) => {
    const paymentResult = "complete";
    response.render("home", {
        paymentResult
    });
});

app.get("/cart", (request, response) => {
    response.render("cart", {
        categories,
        collections,
        cart: request.cart,
        cartItemJson: JSON.stringify(request.cart.items)
    });
});

app.get("/category/:category", (request,response) => {
    const {category} = request.params;
    const items = getItems(category, null);
    response.render("results", {
        categories,
        collections,
        items,
        cart: request.cart
    });
});

// sets up a route (url pattern) that matches the format /items/itemName
// e.g. items/a items/thing items/abcd
app.get("/items/:itemName", (request, response) => {
    const {itemName} = request.params; // this is where the itemName is stored
    const item = data.find(item => item.name === itemName); // finds the item with the given name in the data array
    response.render("itemDetail", {
        item,
        categories,
        collections,
        cart: request.cart
    }); // renders the given template with the item's data passed into it
});

//send categories
app.get("/categories", (request, response)=>{
    response.send(categories);
});

app.use(express.static("static"));

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
