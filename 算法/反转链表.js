输入一个链表，反转链表后，输出链表的所有元素。
function ListNode(x){
    this.val = x;
    this.next = null;
}
function ReverseList(pHead)
{
    // write code here
    if(pHead===null||pHead==={}){
        return pHead
    }
    var node=pHead;
    var next=null;
    while(node){
        var tmp=JSON.parse(JSON.stringify(node));
        node.next=next;
        next=node;
        node=tmp.next;
    }
    return next;
}