
function init() {
    var spaceShipFactory = new SpaceShipFactory()

    panel.listenEvent()
    panel.newShipButton.ele.addEventListener('click', panel.newShipButton.handler(spaceShipFactory).bind(panel))
    drawShip(cacheCtx,spaceShipFactory.createSpaceShip())
}

init()