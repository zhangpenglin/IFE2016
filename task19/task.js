(function () {
    var e, elements, stack;
    e = elements = {
        add: function (s) {
            this[s] = document.querySelector("#" + s)
        }
    }
    elements.add("num")
    elements.add("leftIn")
    elements.add("rightIn")
    elements.add("leftOut")
    elements.add("rightOut")
    elements.add("sort")

    elements.add("list")
    stack = {
        data: [],
        render: function () {
            var that = this
            e.list.innerHTML = ""
            that.data.forEach(function (item, index) {
                var ele = document.createElement('li')
                ele.style.height = item + 'px';
                ele.style.left = (index * (20 + 5)) + 'px'
                ele.addEventListener('click', function () {
                    that.data.splice(index, 1)
                    that.render()
                })
                e.list.appendChild(ele)
            })
        }
    }
    function bubbleSort() {
        var arr = stack.data
        var temp, i = 0, l = arr.length, j = 0;
        // for (i = 0, l = arr.length; i < l; i++) {
        //     // for (var j = 0; j < l-i; j++) {
        //     //     if (arr[j] > arr[j + 1]) {
        //     //         temp = arr[j]
        //     //         arr[j] = arr[j + 1]
        //     //         arr[j + 1] = temp
        //     //     }
        //     // }
        //     innerLoop(0)
        // }
        outerLoop(0)
        function outerLoop(i) {
            if (i >= l) return
            i++
            innerLoop(0, function (cb) {
                return function () {
                    setTimeout(function () {
                        cb(i)
                    }, 200)
                }
            }(outerLoop))

        }

        function innerLoop(j, cb) {
            if (j >= l - i) {
                cb();
                return
            }
            if (arr[j] > arr[j + 1]) {
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
            stack.render()
            j++
            setTimeout(function () {
                innerLoop(j, cb)
            }, 200)
        }
    }

    function validateNum() {
        var num = e.num.value
        if (num < 10 || num > 100) {
            alert('输入的数字必须在10-100之间')
            return false
        }
        return true
    }

    function checkStackCount() {
        if (stack.length > 60) {
            alert('队列中的数量不能超过60')
            return false
        }
        return true
    }

    e.leftIn.addEventListener('click', function () {
        if (!validateNum() || !checkStackCount()) {
            return false
        }
        stack.data.unshift(parseInt(e.num.value))
        stack.render()
    })
    e.rightIn.addEventListener('click', function () {
        if (!validateNum() || !checkStackCount()) {
            return false
        }
        stack.data.push(parseInt(e.num.value))
        stack.render()
    })
    e.leftOut.addEventListener('click', function () {
        stack.data.shift()
        stack.render()
    })
    e.rightOut.addEventListener('click', function () {
        stack.data.pop()
        stack.render()
    })
    e.sort.addEventListener('click', function () {
        bubbleSort()

    })


})()