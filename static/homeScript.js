// payment complete popup
var payment = $(".showPopup");
pResult = payment.data("result");
if(pResult== "complete") {
    payment.addClass("active");
    setInterval(revert, 6000);
    function revert () {
        $(".showPopup").removeClass("active");
    }
}

//featured collections animation
window.addEventListener("scroll", scrolling);
const feature1 = $(".feature1").offset().top;
const feature2 = $(".feature2").offset().top;
const feature3 = $(".feature3").offset().top;

function scrolling() {
    var scrollPos = $(this).scrollTop();

    slideDown(feature1, ".feature1 .collectionImage img");
    slideDown(feature2, ".feature2 .collectionImage img");
    slideDown(feature3, ".feature3 .collectionImage img");
    slideDown(feature1, ".feature1 .collectionDes");
    slideDown(feature2, ".feature2 .collectionDes");
    slideDown(feature3, ".feature3 .collectionDes");

    function slideDown (featureNo, tag){
        if (scrollPos > (featureNo - 400)) {
            $(tag).animate({
                top: "0px",
                opacity: "1"
            }, 750, "easeInQuad");
        }
    }
}

// item name display animation
$(".col-md-4").on("mouseover", function(event) {
    var item = $(event.target);
    if(item.next().is("p")){
        item.next().addClass("showName").removeClass("hiddenName");
    }
});

$(".col-md-4").on("mouseout", function(event) {
    var item = $(event.target);
    if(item.next().is("p")){
        item.next().addClass("hiddenName").removeClass("showName");
    }
});

// Carousel animation
function nextLinkClicked(){

    var currentActiveImage = $(".imageShow");
    var nextActiveImage = currentActiveImage.next();

    if(currentActiveImage.is("#firstHero")) {
        $(".LinkHero").attr("href", "/collection/the stars" );
    } else if (currentActiveImage.is("#secondHero")) {
        $(".LinkHero").attr("href", "/collection/a touch of leather" );
    } else if (currentActiveImage.is("#thirdHero")) {
        $(".LinkHero").attr("href", "/collection/the stars" );
    } else {
        $(".LinkHero").attr("href", "/collection/on the same boat" );
    }

    if(currentActiveImage.next().hasClass("nextLink")){
        nextActiveImage = $(".heroImage img").first();
    }
    currentActiveImage.removeClass("imageShow").addClass("imageHidden").css("z-index", -10);
    nextActiveImage.addClass("imageShow").removeClass("imageHidden").css("z-index", 10);

    $(".heroImage img").not([currentActiveImage, nextActiveImage]).css("z-index", 1);
}

function previousLinkClicked(){

    var currentActiveImage = $(".imageShow");
    var nextActiveImage = currentActiveImage.prev();

    if(currentActiveImage.prev().hasClass("previousLink")){
        nextActiveImage = $(".heroImage img").last();
    }

    currentActiveImage.addClass("imageHidden").removeClass("imageShow").css("z-index", -10);
    nextActiveImage.addClass("imageShow").removeClass("imageHidden").css("z-index", 10)


    $(".heroImage img").not([currentActiveImage, nextActiveImage]).css("z-index", 1);

}


$(".nextLink").on("click", function(e){
    nextLinkClicked();
    e.preventDefault();
});


$(".previousLink").on("click", function(e){
    previousLinkClicked();
    e.preventDefault();
});

setInterval(nextLinkClicked, 4000);
