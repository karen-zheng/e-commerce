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

// show menu
var menuItems = $(".menuItem");

var supportsTouchEvents = false;

try{
    document.createEvent("TouchEvent");
    supportsTouchEvents = true;
} catch (e){
    //do nothing
}

if(supportsTouchEvents){
    menuItems.on("click", function(e) {
        $(this).children('ul').toggleClass("showMenuItem");
        e.preventDefault();
    });
} else {
    menuItems.on("mouseover", function(e) {
        $(this).children('ul').addClass("showMenuItem");
        e.preventDefault();
    });

    menuItems.on("mouseleave", function(e) {
        $(this).children('ul').removeClass("showMenuItem");
        e.preventDefault();
    });
}

// format currency
function formatCurrency (amount) {
    var formatted = amount.toLocaleString('en-GB', {style: 'currency', currency: 'NZD' });
    return formatted;
}