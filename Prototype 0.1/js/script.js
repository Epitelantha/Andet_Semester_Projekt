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

}
