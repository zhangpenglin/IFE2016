(function (w) {

    w.panel = {
        ele: document.getElementById('panel'),
        shipCount: 0,
        newShipButton: {
            ele: document.getElementById('newShip'),
            hide: function () {
                this.ele.style.display = "none"
            },
            show: function () {
                this.ele.style.display = 'block'
            },
            handler: function (spaceShipFactory) {
                return function () {
                    if (this.shipCount < SHIPLIMIT) {
                        spaceShipFactory.createSpaceShip()
                    }

                }
            }
        },
        /**
         * 建立一组按钮
         * @param parentEle
         * @param ship
         */
        createButton: function (parentEle, ship) {
            var that = this
            var buttons = [{
                buttonName: "开始飞行",
                cb: function () {
                    Mediator.broadCast({id: ship.id, command: "fly"})
                }
            }, {
                buttonName: "停止飞行",
                cb: function () {
                    Mediator.broadCast({id: ship.id, command: "stop"})

                }
            }, {
                buttonName: "销毁飞船",
                cb: function () {
                    Mediator.broadCast({id: ship.id, command: "destroy"})

                }
            }]
            buttons.forEach(function (button) {
                parentEle.appendChild(that.createOneButton(button))
            })

        },
        /**
         * 建立一个按钮
         * @param button
         * @returns {Element}
         */
        createOneButton: function (button) {
            var e = document.createElement("button")
            e.innerText = button.buttonName
            e.addEventListener('click', button.cb)
            return e
        },
        /**
         * 为每个飞船新建一组操控界面
         * @param ship
         */
        addItem: function (ship) {
            var that = this
            that.shipCount++
            var e = document.createElement("div")
            e.className = 'panelItem'
            e.shipId = ship.id
            e.innerHTML = "</span>对" + ship.id + "号飞船下达指令</span>"
            that.createButton(e, ship)
            that.ele.appendChild(e)
        },
        removeItem: function (ship) {
            var that = this;
            var items = [].slice.call(that.ele.querySelectorAll('.panelItem'))
            var itemToRemove = items.filter(function (item) {
                return item.shipId == ship.id
            })
            itemToRemove[0].parentNode.removeChild(itemToRemove[0])
            if (that.shipCount == 4) {
                that.newShipButton.show()
            }
            that.shipCount--
        },
        /**
         * 监听事件
         */
        listenEvent: function () {
            var that = this
            document.addEventListener('createShip', function (e) {
                var ship = e.detail
                console.log("创建了一个飞船,id为:" + ship.id)
                that.addItem(ship)
                if (that.shipCount == 4) {
                    that.newShipButton.hide()
                }
            })
            document.addEventListener('destroyShip', function (e) {
                var ship = e.detail
                console.log("销毁了一个飞船,id为:" + ship.id)
                that.removeItem(ship)
            })
        }
    }

})(window)