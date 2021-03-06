(function (w) {
    w.TIME = 1000
    w.REFRESHTIME = 20
    w.FLYSPEED = 2
    w.DISCHARGESPEED = 5/TIME*REFRESHTIME
    w.CHARGESPEED = 2/TIME*REFRESHTIME
    w.SHIPLIMIT = 4
    
    function SpaceShip(id) {
        this.id = id;
        this.flying = null;//飞行状态
        this.energy = 100;
        this.deg=0
        this.receiverHandler = this.receiver()
        this.receiverHandler.listen()
    }

    SpaceShip.prototype = {
        constructor: SpaceShip,
        receiver: function () {
            var ship = this

            function handler(e) {
                console.log(ship.id + "号飞船接受到MediatorForShipEvent,数据为:")
                console.dir(e.detail)
                if (e.detail.id == ship.id) {
                    ship[e.detail.command]()
                }
            }

            return {

                listen: function () {
                    document.addEventListener("MediatorForShipEvent", handler)
                },
                unListen: function () {
                    document.removeEventListener("MediatorForShipEvent", handler)
                }
            }

        },
        energyManager: function () {
            var that = this
            return {
                charge: function () {
                    if (that.energy < 100) {
                        that.energy += CHARGESPEED
                        console.log(that.id + "号飞船正在充电:" + that.energy)

                    } else {
                        that.energy = 100
                        console.log(that.id + "号飞船已充满电:" + that.energy)
                    }
                },
                discharge: function () {
                    if (that.energy > 0) {
                        that.energy -= DISCHARGESPEED
                        console.log(that.id + "号飞船正在耗电:" + that.energy)
                    } else {
                        that.energy = 0
                        console.log(that.id + "号飞船电力耗尽:" + that.energy)
                        that.stop()
                    }
                }
            }
        },

        fly: function () {
            var that = this
            console.log(that.id + '号飞船开始飞行')

            that.flying = setInterval(function () {
                that.deg += FLYSPEED
                if(that.deg==360){that.deg=0}
                that.energyManager().discharge()
            }, REFRESHTIME)
        },
        stop: function () {
            var that = this
            console.log(that.id + '号飞船停止飞行')
            that.energyManager().charge()
            that.flying = clearInterval(that.flying)
        },
        destroy: function () {
            var that = this
            that.flying = clearInterval(that.flying)
            console.log(that.id + '号飞船已经销毁')
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
    w.SpaceShipFactory=SpaceShipFactory
})(window)