(function () {
    var e ,elements,stack;
    e= elements = {
        add: function (s) {
            this[s] = document.querySelector("#" + s)
        }
    }
    elements.add("insertText")
    elements.add("insertButton")
    elements.add("searchText")
    elements.add("searchButton")
    elements.add("list")
    stack = {
        data: [],
        regStr:"",
        render: function () {
            var that=this
            e.list.innerHTML=""
            that.data.forEach(function (item,index) {
                var ele=document.createElement('li')
                ele.innerHTML=item.replace(new RegExp(that.regStr,"g"),"<em>"+that.regStr+"</em>")
                ele.addEventListener('click',function(){
                    that.data.splice(index,1)
                    that.render()
                })
                e.list.appendChild(ele)
            })
        }
    }
    e.searchButton.addEventListener('click', function () {
        stack.regStr=e.searchText.value
        stack.render()
    })
    e.insertButton.addEventListener('click', function () {
        var str=e.insertText.value
        var arr=str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/)
        stack.data=stack.data.concat(arr)
        stack.render()
    })



})()