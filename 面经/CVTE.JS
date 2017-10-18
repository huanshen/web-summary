1、作用域、作用域链
2、html5  标签  progress之类的
3、重绘、重排
4、跨域
5、DOM操作


两道编程：
1、获取一个html页面中标签数最多的，并输出这个个数
function getMaxTag() {
    var obj={};
    var arr=[];
    var max=1;
    var body=document.getElementsByTagName('body')[0];
    var node=body;
    while(node){
        var tagName=node.tagName.toLowerCase();
        if (obj[tagName]) {
            obj[tagName]+=1;
        }
        else{
            obj[tagName]=1;
        }
        max=max<obj[tagName]?obj[tagName]:max;
        var child=node.children;//获取node子节点
        for (var i = 0,len=child.length; i < len; i++) {
            arr.push(child[i]);
        }
        node=arr.shift();
    }
    return max;
}
function getMaxTag() {
    var obj={};
    var max=1;
    //var  tag=document.getElementsByTagName('*');引发性能问题
    var tag=document.querySelectorAll('*');
    for (var i = 0,len=tag.length; i < len; i++) {
        var tagName=tag[i].tagName.toLowerCase();
        if (obj[tagName]) {
            obj[tagName]+=1;
        }
        else{
            obj[tagName]=1;
        }
        max=max<obj[tagName]?obj[tagName]:max;
    }
    return max;
}
function getMaxTag() {
    var map=new Map();
    var max=1,count;
    // var tag=document.getElementsByTagName('*');
    var tag=document.querySelectorAll('*');
    for (var i = 0,len=tag.length; i < len; i++) {
        var tagName=tag[i].tagName.toLowerCase();
        count=map.get(tagName);
        map.set(tagName,count?count=count+1:1);
        max=max<count?count:max;
    }
    return max;
}
2、数组分割为几个若干数组块 
function chunk(arr,len){
    var result=[];
    for (var i = 0; i < arr.length; i=i+len) {
        result.push(arr.slice(i,i+len));
    }
    return result;
}  
chunk([1,2,3,4],2)=[[1,2],[3,4]]; 
chunk([1,2,3,4,5],2)=[[1,2],[3,4],[5]];