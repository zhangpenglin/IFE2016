(function () {

    var e, elements, hobbyQueue;
    e = elements = {
        add: function (s) {
            this[s] = document.querySelector("#" + s)
        }
    }
    var t = ["tagText", "tagList", "hobbyText", "hobbyList", "hobbyButton"]
    t.forEach(e.add.bind(e))
    function Queue(list) {
        this.list = list
        Object.defineProperty(this, 'data', {
            get: function () {
                //getter
                return this._data
            },
            set: function (x) {
                //setter
                x = unique(x) //unique trim
                var data = x.length > 10 ? x.slice(-10) : x;//取后10个
                this._data = data
                this.render()

            }
        })
    }

    Queue.prototype.render = function () {
        var that = this
        that.list.innerHTML = ""
        that.data.forEach(function (item, index) {
            var ele = document.createElement('li')
            ele.innerHTML = item
            ele.addEventListener('click', function () {
                that.data.splice(index, 1)
                that.render()
            })
            that.list.appendChild(ele)
        })
    }


    var hobbyQueue = new Queue(e.hobbyList)
    hobbyQueue.data = []
    var tagQueue = new Queue(e.tagList)
    tagQueue.data = []

    e.tagText.addEventListener('keyup', function (event) {
        console.log('change')
        var codes = [13, 32, 188]
        if (codes.indexOf(event.keyCode) > -1) {
            var str = event.keyCode == 188 ? e.tagText.value.slice(0, e.tagText.value.length - 1) : e.tagText.value
            if (str.trim() == "")return
            tagQueue.data.push(str)
            tagQueue.data = tagQueue.data
            e.tagText.value = ""

        }
    })
    e.hobbyButton.addEventListener('click', function () {
        var str = e.hobbyText.value
        hobbyQueue.data = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/)
    })

    function unique(arr) {
        var temp = {};
        var tempArr = [];

        for (var i = 0, j = arr.length; i < j; i++) {
            var trimed = arr[i].trim()
            if (temp[trimed] == undefined) {
                temp[trimed] = 1
                tempArr.push(trimed)
            }
        }
        return tempArr
    }
})()