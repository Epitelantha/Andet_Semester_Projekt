$(function () {

    var nav = $('.navbar'),
        doc = $(document),
        win = $(window);

    win.scroll(function () {

        if (doc.scrollTop() > 80) {
            nav.addClass('scrolled');
        } else {
            nav.removeClass('scrolled');
        }

    });

    // Trigger the scroll listener on page load

    win.scroll();
});

var stage;

function init() {
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    stage = new createjs.Stage(document.getElementById('canvas'));

    var backGround = new createjs.Shape(new createjs.Graphics().beginLinearGradientFill(["#333", "#ffffff"], [0, 1], -0, 200, 0, 800).drawRect(-0, -0, canvas.width, canvas.height));
    stage.addChild(backGround);

    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);
    start();
}

function handleTick(e) {
    stage.update();
}

function start() {

    //LOGO
    var logo = new createjs.Bitmap('img/logo.png');
    logo.x = 50;
    logo.y = 50;
    logo.scaleX = 0.2;
    logo.scaleY = 0.2;
    stage.addChild(logo);

    //NAVN
    var navn = new createjs.Text("Pheonix Klip", "bold 120px sans-serif", "#FF0000")
    navn.x = 410;
    navn.y = 180;
    navn.textBaseline = "alphabetic";
    /*navn.shadow = new createjs.Shadow('#000', -15, 25, 18);*/
    stage.addChild(navn)
}
