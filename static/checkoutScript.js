//order summary
var subtotal = $(".subtotal");
var shipping = $(".shipping");
var total = $(".total");

subtotal.html(formatCurrency(cartTotal));

if(cartTotal > 200) {
    shipping.html("Free for orders over $200");
} else {
    shipping.html(formatCurrency(20));
}

var trimSubtotal  = subtotal.html().substr(subtotal.html().indexOf("$") + 1);
var trimShipping = shipping.html().substr(shipping.html().indexOf("$") + 1);
var calc = parseInt(trimSubtotal) + parseInt(trimShipping);
total.html(formatCurrency(calc));