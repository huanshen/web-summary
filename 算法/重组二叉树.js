题目描述:
输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} 
function reConstructBinaryTree(pre, vin)
{
    // write code here
    var root=binaryTree(pre,0,pre.length-1,vin,0,vin.length-1);
    return root;
}
function binaryTree(pre,preStart,preEnd,vin,vinStart,vinEnd){
    if(preStart>preEnd||vinStart>vinEnd){
        return null;
    }
    var root=new TreeNode(pre[preStart]);
    for(var i=vinStart;i<=vinEnd;i++){
        if(pre[preStart]===vin[i]){
            root.left=binaryTree(pre,preStart+1,preStart+i-vinStart,vin,vinStart,i-1);
            root.right=binaryTree(pre,i-vinStart+preStart+1,preEnd,vin,i+1,vinEnd);
        }
    }
    return root;
}
console.log(reConstructBinaryTree([1,2,4,7,3,5,6,8], [4,7,2,1,5,3,8,6]));