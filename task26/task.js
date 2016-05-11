(function (w) {
    w.TIME = 1000
    w.FLYSPEED = 20
    w.CONSUMESPEED = 5
    w.CHARGESPEED = 2
    w.SHIPLIMIT = 4
    function SpaceShip(id) {
        this.id = id;
        this.flying = null;//飞行状态
        this.energy = 100;
        this.charge()
        this.receiverHandler=this.receiver()
        this.receiverHandler.listen()
    }

    SpaceShip.prototype = {
        constructor: SpaceShip,
        receiver: function () {
            var ship=this
            function handler(e){
                console.log(ship.id+"号飞船接受到MediatorForShipEvent,数据为:")
                console.dir(e.detail)
                if(e.detail.id==ship.id){
                    ship[e.detail.command]()
                }
            }
            return {

                listen: function () {
                    document.addEventListener("MediatorForShipEvent", handler)
                },
                unListen:function(){
                    document.removeEventListener("MediatorForShipEvent",handler)
                }
            }

        },
        charge: function () {
            var that = this

            setInterval(function () {
                if (that.energy < 100) {
                    if (100 - that.energy <= CHARGESPEED) {
                        //当前能源99的情况
                        that.energy = 100
                        console.log(that.id + "号飞船已充满电:" + that.energy)

                    } else {
                        that.energy += CHARGESPEED
                        console.log(that.id + "号飞船正在充电:" + that.energy)
                    }
                }
            }, TIME)
        },
        fly: function () {
            var that = this
            console.log(that.id+'号飞船开始飞行')

            that.flying = setInterval(function () {
                if (that.energy > 0) {
                    if (that.energy <= CONSUMESPEED) {
                        //当前能源1 2 3 4的情况
                        that.energy = 0
                        console.log(that.id + "号飞船电力耗尽:" + that.energy)
                        that.stop()

                    } else {
                        that.energy -= CONSUMESPEED
                        console.log(that.id + "号飞船正在耗电:" + that.energy)
                    }
                }
            }, TIME)
        },
        stop: function () {
            var that=this
            console.log(that.id+'号飞船停止飞行')

            that.flying = clearInterval(that.flying)
        },
        destroy: function () {
            var that=this
            that.flying = clearInterval(that.flying)
            console.log(that.id+'号飞船已经销毁')
            that.receiverHandler.unListen()
        }
    }
    function SpaceShipFactory() {
        this.ships = []
        this.createSpaceShip = function () {
            var id = this.ships.length
            var ship = new SpaceShip(id)
            this.ships.push(ship)
            fireEvent('createShip', ship)
            return ship
        }
    }

    function init() {
        var spaceShipFactory = new SpaceShipFactory()

        panel.listenEvent()
        panel.newShipButton.ele.addEventListener('click', panel.newShipButton.handler(spaceShipFactory).bind(panel))
    }

    init()
})(window)