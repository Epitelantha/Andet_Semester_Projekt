var images = new Array('img/dresser.jpg', 'img/dresser2.jpg', 'img/dresser3.jpg', 'img/dresser4.jpg', 'img/dresser5.jpg');
var nextimage = 0;
doSlideshow();


function doSlideshow() {
    if (nextimage >= images.length) {
        nextimage = 0;
    } else {
        //DETTE KAN GØRE AT SAMME BILLEDE KOMMER 2 GANGE!
        nextimage = Math.floor(Math.random() * (images.length));
    }
    $('.headpicture')
        .css('background', 'url("' + images[nextimage] + '")')
        .css('background-size', 'cover')
        .css('background-repeat', 'no-repeat')
        .fadeIn(5000, function () {
            setTimeout(doSlideshow, 3000);
        });
}(jQuery);
