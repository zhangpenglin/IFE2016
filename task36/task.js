(function () {
    var TIMER=500
    var WIDTH = 600
    var HEIGHT = 600
    var ITEM_ROW_COUNT = 10
    var ITEM_COL_COUNT = 10
    var ITEM_SIZE = HEIGHT / 10
    var DEFAULT_WALL_COLOR="deepskyblue"
    var DEFAULT_BRUSH_COLOR="orange"
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
        walls:[],
        faceElement:null,
        element: document.getElementById('square'),
        init: function () {
            square.row = 5
            square.col = 5
            square.rotation = 0
            square.direction = 'top'
            square.faceElement=square.getFaceElement()
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
                } else {
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
                that.faceElement=square.getFaceElement()

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
                            } else {
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
                }, TIMER)
            }

            function equal(a, b) {
                return a.left == b.left && a.right == b.left && a.transform == b.transform
            }

        },

        move: function (dire, length) {
            var that = this
            var length = length || 1
            var moveFuncs = {
                top: function () {
                    this.row = this.row - length >= 0 ? this.row - length : 0
                },
                left: function () {
                    this.col = this.col - length >= 0 ? this.col - length : 0
                },
                right: function () {
                    this.col = this.col + length <= ITEM_COL_COUNT-1 ? this.col + length : ITEM_COL_COUNT-1
                },
                bottom: function () {
                    this.row = this.row + length <= ITEM_ROW_COUNT-1 ? this.row + length : ITEM_ROW_COUNT-1
                }
            }
            if (dire) {
                return function () {
                    moveFuncs[dire].call(that)
                    console.log('向' + dire + '移动')
                    that.render()
                }
            }
            moveFuncs[that.direction].call(that)
            console.log('向' + that.direction + '移动')

            that.render()
        },
        turnLeft: function () {
            this.rotation = this.rotation - 90
            this.direction = direction(this.direction).left
            console.log('左转,当前方向为' + this.direction)

            this.render()

        },
        turnRight: function () {
            this.rotation = this.rotation + 90
            this.direction = direction(this.direction).right
            console.log('右转,当前方向为' + this.direction)
            this.render()

        },
        turnBack: function () {
            this.rotation = this.rotation + 180
            this.direction = direction(this.direction).back
            console.log('后转,当前方向为' + this.direction)
            this.render()
        },
        turnMove: function (dire, length) {
            var that = this
            var currentDire = direction(this.direction)
            if (currentDire.left == dire) {
                return function () {
                    that.turnLeft()
                    that.move(null, length)
                }
            } else if (currentDire.right == dire) {
                return function () {
                    that.turnRight()
                    that.move(null, length)
                }
            } else if (currentDire.back == dire) {
                return function () {
                    that.turnBack()
                    that.move(null, length)
                }
            } else if (this.direction == dire) {
                return function () {
                    that.move(null, length)
                }
            }
        },
        build:function(){
            var that=this
            if(that.faceElement){
                that.addWall(that.faceElement)
            }else{
                console.error('超出边界')
            }
        },
        getFaceElement:function(){
            var that=this
            var ele={
                x:this.row,
                y:this.col
            }
            var funcs={
                top:function(){
                    if(that.row>0){
                        ele.x-=1
                        return ele
                    }
                },
                bottom:function(){
                    if(that.row<ITEM_ROW_COUNT-1){
                        ele.x+=1
                        return ele
                    }

                },
                left:function(){
                    if(that.col>0){
                        ele.y-=1
                        return ele
                    }

                },
                right:function(){
                    if(that.col<ITEM_COL_COUNT-1){
                        ele.y+=1
                        return ele
                    }

                }
            }
            var position=funcs[that.direction]()
            if (position){
                ele.element=items[position.x][position.y]
                return ele
            }
            return null
        },
        addWall:function(wall){
            var element=wall.element
            //已经被添加过的wall不被添加到数组中
            if(element.className.indexOf('wall')>-1){
                console.error("wall已经添加过了")
                return
            }
            this.brushWall(element,DEFAULT_WALL_COLOR)
            this.walls.push(wall)
        },
        brush:function(color){
            if(this.faceElement&&this.faceElement.backgroundColor!=""){//判断是不是墙
                this.brushWall(this.faceElement,color)
            }
        },
        brushWall:function(element,color){
            element.style.backgroundColor=color
        },
        command: function (length) {
            var square = this

            return {
                'GO': square.move(square.direction, length),
                'TUN LEF': square.turnLeft,
                'TUN RIG': square.turnRight,
                'TUN BAC': square.turnBack,
                'TRA LEF': square.move('left', length),
                'TRA RIG': square.move('right', length),
                'TRA TOP': square.move('top', length),
                'TRA BOT': square.move('bottom', length),
                'MOV LEF': square.turnMove('left', length),
                'MOV RIG': square.turnMove('right', length),
                'MOV TOP': square.turnMove('top', length),
                'MOV BOT': square.turnMove('bottom', length),
                'BUILD':square.build,
                'BRUSH':square.brush
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
                var commands = that.element.value.split("\n")
                commands.forEach(function (cmd) {
                    var cmd = parseCmd(cmd)
                    if (!cmd) {
                        alert('非法的命令');
                        return
                    }
                    square.command(cmd.length)[cmd.cmdToExecute].call(square)
                })

            });
            ['move', 'turnLeft', 'turnRight', 'turnBack', 'traLeft', 'traRight', 'traTop', 'traBottom', 'moveLeft', 'moveRight', 'moveTop', 'moveBottom','build'].forEach(function (dire) {
                var ele = document.getElementById(dire)
                ele.addEventListener('click', function () {
                    var cmd = parseCmd(ele.innerText)
                    if (!cmd) {
                        alert('非法的命令');
                        return
                    }
                    var func = square.command(cmd.length)[cmd.cmdToExecute].bind(square)
                    square.commandQueue.push(func)
                    if (!square.animating) {
                        var func = square.commandQueue.shift()
                        func.call(that)
                    } else {
                        console.log('正在进行动画,加入到commandQueue中')
                    }
                })
            })
        }
    }

    function parseCmd(str) {
        var lengthMatch = str.match(/[0-9]/)
        var colorMatch=/BRU/.test(str)&&str.split(" ")[1]
        var cmds = Object.keys(square.command())
        var cmdArg = {
            length:1,
            cmdToExecute:"",
            color:colorMatch||DEFAULT_BRUSH_COLOR
        }
        cmds.forEach(function (cmd) {
            if (str.indexOf(cmd) > -1) {
                cmdArg.cmdToExecute = cmd
            }
        })
        if (cmdToExecute == "") {
            return false
        }
        if (lengthMatch) {
            cmdArg.length=parseInt(lengthMatch[0])
        }
        return cmdArg
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