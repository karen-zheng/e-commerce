// empty cat message popup
var message = $(".showPopup");
pMessage = message.data("result");
if(pMessage === "your cart is empty"){
    message.addClass("active");
    $(".message").html(pMessage);
    setInterval(revert, 3000);
    function revert () {
        $(".showPopup").removeClass("active");
    }

} else {
    message.css("display", "none");
}

//order summary
const defaultShipping = 20;
var shipping = $(".shipping");
var inputs = $("input");
var total = $(".total")

$(inputs).each( function (i, input) {
    updatePrice(input);
});

var subtotal = $(".subtotal");
var prices = $(".price");

updateSubtotal();


//update price and quantity using inputs
inputs.on("change", function(e) {

    updatePrice(e.target);

    var amount = e.target.parentElement.nextElementSibling.innerText;
    var trimAmount= amount.substr(amount.indexOf("$") + 1);

    updateSubtotal();

    $.post("/cart", { //first argument is the route
        item: e.target.name, //second argument is the data to post to server
        quantity: e.target.value
    }, function(data) { //third argument is a call back that gives the data retrieved from the server
        var totalCartItems = data.items.reduce((previous, current) => previous + current.quantity, 0);
        $(".cartItem").html(totalCartItems);
    })


});

function updatePrice(input) {
    var unitPrice = input.dataset.price;
    var cartQuantity = input.value;
    var price = $(input).parent().next();
    var calc = formatCurrency(parseInt(cartQuantity) * parseInt(unitPrice));
    price.html(calc);
}


// update order summary prices
function updateSubtotal() {
    var subtotalPrice = 0;

    $(prices).each( function (i, price) {
        var amount = price.innerText;
        var trimAmount= amount.substr(amount.indexOf("$") + 1);
        subtotalPrice += parseInt(trimAmount);
    });

    subtotal.html(formatCurrency(subtotalPrice));

    updateShipping(subtotalPrice);
}

function updateShipping (subtotalPrice) {
    if (subtotalPrice > 200) {
        shipping.html("FREE for purchases over $200");
        total.html(formatCurrency(subtotalPrice));
    } else {
        shipping.html(formatCurrency(defaultShipping));
        total.html(formatCurrency(subtotalPrice + defaultShipping));
    }
}
