输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function HasSubtree(pRoot1, pRoot2)
{
    // write code here
    if(pRoot1===null||pRoot2===null){
        return false;
    }
    return isSubTree(pRoot1, pRoot2) || HasSubtree(pRoot1.left, pRoot2) || HasSubtree(pRoot1.right, pRoot2);
    
}
function isSubTree(pRoot1, pRoot2){
    if(pRoot2===null){//注意先判断pRoot2后判断pRoot1，否则出错
        return true;
    }
    if(pRoot1===null){
        return false;
    }  
    if(pRoot1.val===pRoot2.val){
        return isSubTree(pRoot1.left, pRoot2.left)&&isSubTree(pRoot1.right, pRoot2.right);
    }
    return false;
}