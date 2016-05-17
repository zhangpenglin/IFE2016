(function () {
    var WIDTH = 600
    var HEIGHT = 600
    var ITEM_ROW_COUNT = 10
    var ITEM_COL_COUNT = 10
    var ITEM_SIZE = HEIGHT / 10
    var container = document.getElementById('container')

    container.style.width = WIDTH + 'px'
    container.style.height = HEIGHT + 'px'
    var items = []
    for (var i = 0; i < ITEM_ROW_COUNT; i++) {
        items[i] = []
        for (var j = 0; j < ITEM_COL_COUNT; j++) {
            items[i][j] = createItem(i, j)
        }
    }
    function createItem(row, col) {
        var item = document.createElement('div')
        item.className = 'item'
        item.style.width = ITEM_SIZE + "px"
        item.style.height = ITEM_SIZE + "px"
        item.style.top = ITEM_SIZE * row
        item.style.left = ITEM_SIZE * col
        container.appendChild(item)
        return item
    }

    console.log(items)
    var square = {
        animateQueue: [],
        commandQueue: [],
        animating: false,
        element: document.getElementById('square'),
        init: function () {
            square.row = 5
            square.col = 5
            square.rotation = 0
            square.direction = 'top'
            square.render()
        },
        render: function () {
            if (//都不为空时渲染
            (this.row != undefined) &&
            (this.col != undefined) &&
            (this.direction != undefined)
            ) {
                // console.log('render')
                this.animateQueue.push({
                    left: this.col * ITEM_SIZE + "px",
                    top: this.row * ITEM_SIZE + "px",
                    transform: "rotate(" + this.rotation + "deg)"
                })//当前状态push到队列中

                if (!this.animating) {
                    doRender.call(this, this.animateQueue.shift())
                }else{
                    console.log('正在进行动画，加入到animateQueue中')
                }
            }
            function doRender(renderParam) {

                var that = this
                that.animating = true
                console.log('开始动画,当前命令队列为')
                console.log(that.commandQueue)
                that.element.style.left = renderParam.left;
                that.element.style.top = renderParam.top;
                that.element.style.transform = renderParam.transform
                setTimeout(function () {
                    if (that.animateQueue.length > 0) {
                        while (true) {
                            //当前参数与下一动画参数相同 不做动作
                            if (that.animateQueue.length == 0) {
                                console.log('animateQueue为空')
                                break;
                            }
                            var nextParam = that.animateQueue.shift()
                            if (!equal(renderParam, nextParam)) {
                                doRender.call(that, nextParam)
                                console.log('请求队列中下一个')
                                break;
                            }else{
                                console.log('参数相同')
                            }
                        }
                    } else {
                        that.animating = false
                        console.log('停止动画')
                        if (that.commandQueue.length > 0) {
                            that.commandQueue.shift().call(that)
                        }
                    }
                }, 1000)
            }

            function equal(a, b) {
                return a.left == b.left && a.right == b.left && a.transform == b.transform
            }

        },

        move: function (dire) {
            var that = this
            var moveFuncs = {
                top: function () {
                    this.row = this.row > 0 ? this.row - 1 : this.row
                },
                left: function () {
                    this.col = this.col > 0 ? this.col - 1 : this.col
                },
                right: function () {
                    this.col = this.col < ITEM_COL_COUNT ? this.col + 1 : ITEM_COL_COUNT
                },
                bottom: function () {
                    this.row = this.row < ITEM_ROW_COUNT ? this.row + 1 : ITEM_ROW_COUNT
                }
            }
            if (dire) {
                return function () {
                    that.direction = dire
                    moveFuncs[dire].call(that)
                    console.log('向'+dire+'移动')
                    that.render()
                }
            }
            moveFuncs[that.direction].call(that)
            console.log('向'+that.direction+'移动')

            that.render()
        },
        turnLeft: function () {
            this.rotation = this.rotation - 90
            this.direction = direction(this.direction).left
            console.log('左转,当前方向为'+this.direction)
            this.render()

        },
        turnRight: function () {
            this.rotation = this.rotation + 90
            this.direction = direction(this.direction).right
            console.log('右转,当前方向为'+this.direction)
            this.render()

        },
        turnBack: function () {
            this.rotation = this.rotation + 180
            this.direction = direction(this.direction).back
            console.log('后转,当前方向为'+this.direction)

            this.render()
        },
        turnMove: function (dire) {
            var that = this
            var currentDire = direction(this.direction)
            if (currentDire.left == dire) {
                return function () {
                    that.turnLeft()
                    that.move()
                }
            } else if (currentDire.right == dire) {
                return function () {
                    that.turnRight()
                    that.move()
                }
            } else if (currentDire.back == dire) {
                return function () {
                    that.turnBack()
                    that.move()
                }
            } else if (this.direction == dire) {
                return function () {
                    that.move()
                }
            }
        },
        command: function () {
            var square = this

            return {
                'GO': square.move.bind(square),
                'TUN LEF': square.turnLeft.bind(square),
                'TUN RIG': square.turnRight.bind(square),
                'TUN BAC': square.turnBack.bind(square),
                'TRA LEF': square.move('left'),
                'TRA RIG': square.move('right'),
                'TRA TOP': square.move('top'),
                'TRA BOT': square.move('bottom'),
                'MOV LEF': square.turnMove('left'),
                'MOV RIG': square.turnMove('right'),
                'MOV TOP': square.turnMove('top'),
                'MOV BOT': square.turnMove('bottom'),
            }
        }
    }

    var textarea = {
        element: document.getElementsByTagName('textarea')[0],
        lineElement: document.getElementsByTagName('ul')[0],
        init: function () {
            this.lineHandle()
            this.bindEvent()
        },
        lineHandle: function () {
            var that = this
            that.lineElement.innerHTML = ""
            var str = that.element.value;
            console.log(str)
            var matches = str.match(/\n/g)
            var lineCount = matches ? matches.length + 1 : 1
            for (var i = 1; i <= lineCount; i++) {
                var li = document.createElement('li')
                li.innerText = i
                that.lineElement.appendChild(li)
            }
        },
        bindEvent: function () {
            var that = this
            that.element.addEventListener('keyup', this.lineHandle.bind(this))//textarea事件
            //button事件
            var button = document.getElementsByTagName('button')[0]
            button.addEventListener('click', function () {
                //执行按钮命令
                var commands=that.element.value.split("\n")
                commands.forEach(function(cmd){
                    square.command()[cmd]()
                })

            });
            ['move', 'turnLeft', 'turnRight', 'turnBack', 'traLeft', 'traRight', 'traTop', 'traBottom', 'moveLeft', 'moveRight', 'moveTop', 'moveBottom'].forEach(function (dire) {
                var ele = document.getElementById(dire)
                ele.addEventListener('click', function () {
                    var func = square.command()[ele.innerText].bind(square)
                    square.commandQueue.push(func)
                    if (!square.animating) {
                        var func=square.commandQueue.shift()
                        func.call(that)
                    }else{
                        console.log('正在进行动画,加入到commandQueue中')
                    }
                })
            })
        }
    }


    function direction(dire) {
        var left, right, back
        var directions = ['top', 'right', 'bottom', 'left']
        var index = directions.indexOf(dire);

        return {
            left: index == 0 ? directions[directions.length - 1] : directions[index - 1],
            right: index == directions.length - 1 ? directions[0] : directions[index + 1],
            back: index > 1 ? directions[index + 2 - directions.length] : directions[index + 2]
        }
    }

    square.init()
    textarea.init()
})()