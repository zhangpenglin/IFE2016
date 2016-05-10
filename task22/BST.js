(function () {
    function Node(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    function BST() {
        this.root = null
    }

    BST.prototype.insert = function (data) {
        var newNode=new Node(data)
        if(this.root==null){
            this.root=newNode
        }else{
            insertNode(this.root,newNode)
        }
        function insertNode(node, newNode) {
            if (node.data > newNode.data) {//新节点小于当前节点值，放左边
                if (node.left == null) { //如果
                    node.left = newNode
                } else {
                    insertNode(node.left, newNode)
                }
            } else {
                if (node.right == null) {
                    node.right = newNode
                } else {
                    insertNode(node.right, newNode)
                }
            }
        }
    }
    BST.prototype.inOrder=function(cb){//中序遍历
        inOrder(this.root)
        function inOrder(node){
            if(!(node==null)){
                inOrder(node.left)
                cb(node.data)
                inOrder(node.right)
            }
        }
    }
    BST.prototype.preOrder=function(cb){//先序遍历
        preOrder(this.root)
        function preOrder(node){
            if(!(node==null)){
                cb(node.data)
                preOrder(node.left)
                preOrder(node.right)
            }
        }
    }
    BST.prototype.postOrder=function(cb){//后序遍历
        postOrder(this.root)
        function postOrder(node){
            if(!(node==null)){
                cb(node.data)
                postOrder(node.left)
                postOrder(node.right)
            }
        }
    }
    var b = new BST()
    // "23,45,16,3,22,99,37".split(",").forEach(function(item){
    //
    //     b.insert(parseInt(item))
    // })
    // b.inOrder(function(data){
    //     console.log(data)
    // })



})()