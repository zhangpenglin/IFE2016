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
        init: function () {
            square.row = 6
            square.col = 6
            square.direction = 'top'
            square.render()
        },
        render: function () {
            (this.row != undefined) &&
            (this.col != undefined) &&
            (this.row != direction) &&
            (items[this.row][this.col].className = 'item ' + this.direction)
        },
        reset: function () {
            (this.row != undefined) &&
            (this.col != undefined) &&
            (this.row != direction) &&
            (items[this.row][this.col].className = 'item')
        },
        move: function () {
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
            moveFuncs[this.direction].call(this)
        },
        turnLeft: function () {
            this.direction = direction(this.direction).left
        },
        turnRight: function () {
            this.direction = direction(this.direction).right
        },
        turnBack: function () {
            this.direction = direction(this.direction).back
        }
    }

    Object.defineProperties(square, {
        "row": {
            set: function (val) {
                this.reset()
                this._row = val;
                this.render()
            }, get: function () {
                return this._row
            }
        },
        "col": {
            set: function (val) {
                this.reset()
                this._col = val;
                this.render()

            }, get: function () {
                return this._col
            }
        },
        "direction": {
            set: function (val) {
                this.reset()
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


    function command() {
        return {
            'GO': square.move.bind(square),
            'TUN LEF': square.turnLeft.bind(square),
            'TUN RIG': square.turnRight.bind(square),
            'TUN BAC': square.turnBack.bind(square)
        }
    }

    function bindEvent() {
        var input = document.getElementsByTagName('input')[0]
        var button = document.getElementsByTagName('button')[0]
        button.addEventListener('click', function () {
            console.log("执行" + input.value + "命令")
            command()[input.value]()
        });
        ['move', 'turnLeft', 'turnRight', 'turnBack'].forEach(function (dire) {
            var ele = document.getElementById(dire)
            ele.addEventListener('click', square[dire].bind(square))
        })

    }


    square.init()
    bindEvent()
})()