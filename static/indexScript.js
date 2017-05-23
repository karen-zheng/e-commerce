// only one scroll listener
window.addEventListener("scroll", scrollingdown);
// calculate menu height once
var menu = $('#menu');
var targetPos = menu.offset().top;

function scrollingdown() {
    var scrollPos = window.scrollY;

    if (scrollPos > targetPos) {
        menu.addClass("stickyMenu").removeClass("menu");
        $(".logo").css("margin-bottom", "80px");
    } else {
        menu.removeClass("stickyMenu").addClass("menu");
        $(".logo").css("margin-bottom", "0px");
    }
}

// format currency
function formatCurrency (amount) {
    var formatted = amount.toLocaleString('en-GB', {style: 'currency', currency: 'NZD' });
    return formatted;
}