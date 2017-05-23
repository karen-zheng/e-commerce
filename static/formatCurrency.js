//  Format price
var price = $(".price");
var formatPrice = formatCurrency(parseInt(price.text()));
price.html(formatPrice);

