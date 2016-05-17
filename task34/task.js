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
    console.log(items)
    var square = {
        element: document.getElementById('square'),
        init: function () {
            square.row = 5
            square.col = 5
            square.rotation = 0
            square.direction = 'top'
            square.render()
        },
        render: function () {
            console.log(this.element.style.transform);
            (this.row != undefined) &&
            (this.col != undefined) &&
            (this.row != direction) &&
            (this.element.style.left = this.col * ITEM_SIZE + "px",
                    this.element.style.top = this.row * ITEM_SIZE + "px",
                    this.element.style.transform = "rotate(" + this.rotation + "deg)"
            )
        },

        move: function (dire) {
            var that=this
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
            if(dire){
                return function(){
                    that.direction=dire
                    moveFuncs[dire].call(that)
                }
            }
            moveFuncs[that.direction].call(that)
        },
        turnLeft: function () {
            this.rotation = this.rotation - 90
            this.direction = direction(this.direction).left
        },
        turnRight: function () {
            this.rotation = this.rotation + 90
            this.direction = direction(this.direction).right
        },
        turnBack: function () {
            this.rotation = this.rotation + 180
            this.direction = direction(this.direction).back

        },
        turnMove:function(dire){
            var that=this
            var currentDire=direction(this.direction)
            if(currentDire.left==dire){
                return function(){
                    that.turnLeft()
                    that.move()
                }
            }else if(currentDire.right==dire){
                return function(){
                    that.turnRight()
                    that.move()
                }
            } else if(currentDire.back==dire){
                return function(){
                    that.turnBack()
                    that.move()
                }
            }else if(this.direction==dire){
                return function(){
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

    Object.defineProperties(square, {
        "row": {
            set: function (val) {
                this._row = val;
                this.render()
            }, get: function () {
                return this._row
            }
        },
        "col": {
            set: function (val) {
                this._col = val;
                this.render()

            }, get: function () {
                return this._col
            }
        },
        "direction": {
            set: function (val) {
                this._direction = val;
                this.render()

            }, get: function () {
                return this._direction
            }
        },
    })


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

    function bindEvent() {
        var input = document.getElementsByTagName('input')[0]
        var button = document.getElementsByTagName('button')[0]
        button.addEventListener('click', function () {
            console.log("执行" + input.value + "命令")
            square.command()[input.value]()
        });
        ['move', 'turnLeft', 'turnRight', 'turnBack','traLeft','traRight','traTop','traBottom', 'moveLeft','moveRight','moveTop','moveBottom'].forEach(function (dire) {
            var ele = document.getElementById(dire)
            ele.addEventListener('click', square.command()[ele.innerText].bind(square))
        })

    }


    square.init()
    bindEvent()
})()