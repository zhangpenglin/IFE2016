(function (w) {
    var EVENTDELAY=1000
    var Mediator = {
        broadCast: function (command) {
            fireEvent('MediatorForUniverseEvent', command)
            console.log('Mediator发送MediatorForUniverseEvent')
        }
    }
    var Universe = {
        /**
         * 延迟发送
         * @param cb
         */
        delay: function (cb) {
            setTimeout(cb,EVENTDELAY)
        },
        /**
         * 广播是否丢失算法
         */
        pass: function () {
            var n=Math.random()
            if(n>0.3){
                return true
            }
            return false
        },
        listen: function () {
            var that = this
            document.addEventListener('MediatorForUniverseEvent', function (e) {
                console.log("Universe接受到MediatorForUniverseEvent")
                that.delay(function () {
                    if (that.pass()) {
                        fireEvent('MediatorForShipEvent', e.detail)
                        console.log('Universe发送MediatorForShipEvent')
                    } else {
                        console.log('Universe未能发送MediatorForShipEvent')
                    }
                })

            })
        }
    }
    Universe.listen()
    window.Mediator = Mediator
})(window)