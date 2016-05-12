(function (w) {
    var CANVAS_HEIGHT = 600
    var CANVAS_WIDTH = 600
    var SHIP_SIZE = 20
    var canvas = document.getElementById('canvas')
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT
    var ctx = canvas.getContext('2d')
    var cacheCanvas = document.createElement('canvas')
    cacheCanvas.width = CANVAS_WIDTH
    cacheCanvas.height = CANVAS_HEIGHT
    var cacheCtx = cacheCanvas.getContext('2d')

    function drawShip(_ctx, ship) {
        var spaceshipImg = new Image(); //创建飞船贴图
        spaceshipImg.src = "ship.png";
        spaceshipImg.onload = function () {
            _ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            _ctx.save();
            _ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
            _ctx.rotate(-ship.deg * Math.PI / 180);
            // _ctx.arc(200,0,SHIP_SIZE,0,Math.PI*2)
            // _ctx.fillStyle="red"
            // _ctx.fill()
            _ctx.strokeStyle='red'
            _ctx.font='12px Arial'
            _ctx.fillText(ship.id+'号飞船'+Math.ceil(ship.energy)+"%",190,0)
            _ctx.drawImage(spaceshipImg, 200, 0, 48, 48);
            _ctx.restore();
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.drawImage(cacheCanvas, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            requestAnimationFrame(function () {
                drawShip(_ctx, ship)
            })
        }

    }

    w.ctx = ctx
    w.cacheCtx = cacheCtx
    w.drawShip = drawShip
})(window)