// item name display animation
$(".itemImage a img").on("mouseover", function(event) {

    var item = $(event.target);
    if(item.next().is("p")){
        item.next().addClass("showName").removeClass("hiddenName");
    }
});

$(" .itemImage a img").on("mouseout", function(event) {
    var item = $(event.target);
    if(item.next().is("p")){
        item.next().addClass("hiddenName").removeClass("showName");
    }
});