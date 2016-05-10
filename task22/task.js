(function () {
    function Element(data) {
        var e = document.createElement('div')
        e.id = "node" + data
        e.className = "node"
        return e
    }

    function Node(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
        this.element = Element(data)
    }

    function BST() {
        this.root = null
    }

    BST.prototype.insert = function (data) {
        var newNode = new Node(data)
        if (this.root == null) {
            this.root = newNode
            document.querySelector('.container').appendChild(newNode.element)
        } else {
            insertNode(this.root, newNode)
        }
        function insertNode(node, newNode) {
            if (node.data > newNode.data) {//新节点小于当前节点值，放左边
                if (node.left == null) { //如果
                    node.left = newNode
                    if (node.element.childNodes.length == 0) {
                        node.element.appendChild(newNode.element)
                    } else {
                        node.element.insertBefore(newNode.element, node.element.childNodes[0])
                    }
                } else {
                    insertNode(node.left, newNode)
                }
            } else {
                if (node.right == null) {
                    node.right = newNode
                    node.element.appendChild(newNode.element)
                } else {
                    insertNode(node.right, newNode)
                }
            }
        }
    }
    BST.prototype.inOrder = function (cb) {//中序遍历
        var arr = []
        inOrder(this.root)
        cb(arr)
        function inOrder(node) {
            if (!(node == null)) {
                inOrder(node.left)
                arr.push(node)
                inOrder(node.right)
            }
        }
    }
    BST.prototype.preOrder = function (cb) {//先序遍历
        var arr = []
        preOrder(this.root)
        cb(arr)
        function preOrder(node) {
            if (!(node == null)) {
                arr.push(node)
                preOrder(node.left)
                preOrder(node.right)
            }
        }
    }
    BST.prototype.postOrder = function (cb) {//后序遍历
        var arr = []
        postOrder(this.root)
        cb(arr)
        function postOrder(node) {
            if (!(node == null)) {
                postOrder(node.left)
                postOrder(node.right)
                arr.push(node)
            }
        }
    }
    var b = new BST()
    "57,42,70,35,48,62,72,23,40,45,51,61,68,71,78".split(",").forEach(function (item) {
        b.insert(parseInt(item))
    })
    function bindOrder() {
        [].slice.call(document.querySelectorAll("button")).forEach(function (item) {
            item.addEventListener('click', function () {
                b[item.id](animate)
                console.log(item.innerText)
            })
        })
    }

    function animate(nodeArr) {
        if(nodeArr.length==0) return
        var current = nodeArr.shift()
        current.element.className = "current node"
        setTimeout(function () {
            current.element.className = "node"
            animate(nodeArr)
        }, 1000)
    }


    bindOrder()

})()