(function () {
    var e ,elements,stack;
    e= elements = {
        add: function (s) {
            this[s] = document.querySelector("#" + s)
        }
    }
    elements.add("num")
    elements.add("leftIn")
    elements.add("rightIn")
    elements.add("leftOut")
    elements.add("rightOut")
    elements.add("list")
    stack = {
        data: [],
        render: function () {
            var that=this
            e.list.innerHTML=""
            that.data.forEach(function (item,index) {
                var ele=document.createElement('li')
                ele.innerText=item
                ele.addEventListener('click',function(){
                    that.data.splice(index,1)
                    that.render()
                })
                e.list.appendChild(ele)
            })
        }
    }
    e.leftIn.addEventListener('click', function () {
        stack.data.unshift(e.num.value)
        stack.render()
    })
    e.rightIn.addEventListener('click', function () {
        stack.data.push(e.num.value)
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


})()