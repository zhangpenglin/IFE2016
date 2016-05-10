(function () {

    var selectedNode = null;
    var animating=false;

    /**
     * Element对象
     * @param data
     * @returns {Element}
     * @constructor
     */
    function Element(data) {
        var e = document.createElement('div')
        e.id = "node" + data
        e.className = "node"
        e.innerText = data
        return e
    }

    /**
     * node对象
     * @param data
     * @constructor
     */
    function Node(data) {
        this.data = data;
        this.parent = null;
        this.children = [];
        this.element = Element(data)
        this.element.addEventListener('click', function (e) {
            clearColor()
            selectedNode = this
            this.element.className = "node selected"
            e.stopPropagation()
        }.bind(this), false)
    }

    /**
     * Tree对象
     * @param data
     * @constructor
     */
    function Tree(data) {
        this.root = new Node(data)
        document.querySelector(".container").appendChild(this.root.element)
    }

    /**
     * 添加对象
     * @param data 添加的数据
     * @param toData 父级节点
     * @param traversal 遍历方式
     */
    Tree.prototype.add = function (data, toData, traversal) {
        var child = new Node(data);
        var parent = null;
        this.contains(cb, traversal)
        if (parent) {
            child.parent = parent
            parent.children.push(child)
            parent.element.appendChild(child.element)
        }

        function cb(node) {
            if (node.data == toData) {
                parent = node
            }
        }
    }


    /**
     * 删除节点
     * @param data
     * @param fromData
     * @param traversal
     * @returns {*}
     */
    Tree.prototype.remove = function (data, fromData, traversal) {
        var parent = null,
            childToRemove = null,
            index;

        if(fromData==null){
            //移除root节点
            alert("不能移除root节点")
            return
        }
        var callback = function (node) {
            if (node.data === fromData) {
                parent = node;
                index = findIndex(parent.children, data);
                if (index === undefined) {
                    console.log("没找到父节点下的子节点")
                } else {
                    parent.element.removeChild(selectedNode.element)
                    childToRemove = parent.children.splice(index, 1);
                    selectedNode=null
                }
            }
        };

        this.contains(callback, traversal);


        function findIndex(arr, data) {
            for (var i = 0, l = arr.length; i < l; i++) {
                if (arr[i].data == data) {
                    return i //包括文本节点
                }
            }
        }

        return childToRemove;
    }

    /**
     *
     * @param callback
     * @param traversal
     */
    Tree.prototype.contains = function (callback, traversal) {
        traversal.call(this, callback)
    }

    /**
     * 深度优先遍历
     * @param callback
     */
    Tree.prototype.traverseDF = function (callback) {
        traverseDF(this.root)
        function traverseDF(node) {
            for (var i = 0, j = node.children.length; i < j; i++) {
                traverseDF(node.children[i])
            }
            callback(node)
        }
    }

    /**
     * 广度优先遍历
     * @param callback
     */
    Tree.prototype.traverseBF = function (callback) {
        var queue = []
        var node = this.root
        while (node) {
            for (var i = 0, j = node.children.length; i < j; i++) {
                queue.push(node.children[i])
            }
            callback(node)
            node = queue.shift()
        }
    }

    var t = new Tree("Super")
    t.add("Cat", "Super", t.traverseDF)
    t.add("Note", "Super", t.traverseDF)
    t.add("Fish", "Super", t.traverseDF)

    t.add("Apple", "Cat", t.traverseDF)
    t.add("Phone", "Cat", t.traverseDF)
    t.add("", "Cat", t.traverseDF)

    t.add("Human", "Note", t.traverseDF)
    t.add("Program", "Note", t.traverseDF)


    t.add("Pear", "Apple", t.traverseDF)
    t.add("Pig", "Apple", t.traverseDF)
    t.add("Cola", "Apple", t.traverseDF)
    t.add("Soccer", "Apple", t.traverseDF)

    t.add("Book", "", t.traverseDF)
    t.add("School", "", t.traverseDF)

    t.add("Code", "Human", t.traverseDF)
    t.add("Operate", "Human", t.traverseDF)
    t.add("Man", "Human", t.traverseDF)

    t.add("Benment", "Program", t.traverseDF)
    t.add("Glass", "Program", t.traverseDF)

    t.add("Cat", "Benment", t.traverseDF)

    function $(s) {
        return document.querySelector(s)
    }

    /**
     * 绑定事件
     */
    function bindEvent() {

        [$("#traverseDF"), $("#traverseBF")].forEach(function (item) {
            item.addEventListener('click', function () {
                if(animating) return alert('正在运行动画')
                clearColor()
                var nodeArr = []
                t[item.id](function (data) {
                    nodeArr.push(data)
                    console.log(data.element.id)
                })
                animate(nodeArr, false)
            })
        });
        [$("#traverseDFSearch"), $("#traverseBFSearch")].forEach(function (item) {
            item.addEventListener('click', function () {
                if(animating) return alert('正在运行动画')

                clearColor()
                var nodeArr = []
                t[item.id.replace("Search", "")](function (data) {
                    nodeArr.push(data)
                    console.log(data.element.id)
                })
                animate(nodeArr, true)
            })
        })
        $("#remove").addEventListener('click', function () {
            if(animating) return alert('正在运行动画')

            if (selectedNode) {
                t.remove(selectedNode.data, selectedNode.parent ? selectedNode.parent.data:null, t.traverseDF)
            } else {
                alert("请选择要删除的节点")
            }
        })
        $("#add").addEventListener('click',function(){
            if(animating) return alert('正在运行动画')

            var data=$("#addInput").value
            t.add(data,selectedNode.data,t.traverseDF)
        })
        $("body").addEventListener('click',function(e){
            if(e.target==this){
                if(animating) return alert('正在运行动画')
                clearColor()
                selectedNode=null
            }
        })
    }


    /**
     * 动画队列
     * @param nodeArr
     * @param {boolean}searchMode 是否是搜索模式
     */


    function animate(nodeArr, searchMode) {
        var hasSearchresult = false
        animating=true
        animation(nodeArr, searchMode)
        function animation(nodeArr, searchMode) {
            if (nodeArr.length == 0) {
                searchMode && !hasSearchresult && alert('没有找到搜过结果')
                animating=false
                return
            }
            var current = nodeArr.shift()
            current.element.className = "current node"
            setTimeout(function () {
                if (searchMode && (current.data == $("#search").value)) {
                    hasSearchresult = true
                    current.element.className = "node search"
                } else {
                    current.element.className = "node"
                }
                animation(nodeArr, searchMode)
            }, 500)
        }
    }

    /**
     * 重置所有元素的颜色
     */
    function clearColor() {
        [].slice.call(document.querySelectorAll(".node")).forEach(function (ele) {
            ele.className = "node"
        })
    }

    bindEvent()

})()