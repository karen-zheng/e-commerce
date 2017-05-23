//  Format price
var price = $(".price");
var formatPrice = formatCurrency(parseInt(price.text()));
price.html(formatPrice);

// Add to cart
$("#addItem").on("click", function() {
    var cartId = Cookies.get("cartId");
    //var cartItemData = {"name": "{{item.name}}", "quantity" :  null };

    $.post("/cart", { //post to route "/cart"
        item: "{{ item.name }}", //posts item name;
    }, function (data) { //success response from server
        if (data.cartId !== cartId) { //if there isn't already a cartID then,
            //localStorage.setItem("cartId", data.cartId); //save cartId as key name and data.cartId as value
            Cookies.set("cartId", data.cartId);
        }
        var cartItemCurr = parseInt($(".cartItem").html());
        $(".cartItem").html(cartItemCurr + 1);
    });
});
