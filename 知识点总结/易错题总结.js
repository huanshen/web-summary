(1)
  var string="string";
  var num=0;
  var bool=true;
  console.log(num||string);//string
  console.log(num&&string);//0
  console.log(bool||num);//true
  console.log(bool&&num);//0

(2)
  console.log(new String('a')==='a');//false ==为true
  console.log(new String('a')==new String('a'));//false
  console.log('a,a'==['a','a']);//true
  [1,,2].map(x=>x^2);//[1,,4]
  [1,2,].length===2;//undefined,在数组的最后不会导致数组长度的增加

(3)
  function a1(){
    this.name='1';
    return function a2(){
      this.name='2';
      return function a3(){
        var name='3';//若没有var关键字，则定义为全局变量，输出为3
        console.log(this.name);
      }
    }
  }
  a1()()();//2

(4)
  var a='1';
  console.log(a);
  console.log(b);//undefined
  // console.log(c);//error
  var b='2';
  c='3';

(5) var a=b=8;等价于 var a;b=8;a=b;

(6) 函数声明和变量声明都会提前，函数名优先级高于变量
  console.log(text)//f text(){}
  var text = 0;
  function text() {}
  console.log(text); //0
  // 等价于
  console.log(text)//f text(){}
  function text() {}
  var text = 0;
  console.log(text); //0

(7) 作用域问题
  //es5闭包解决
  var a=[];
  for (var i = 0; i < 10; i++) {
      a[i] = function(i){//此时i为函数作用域内私有变量
          return function () {//注意这个函数没有参数
                  return i;
          }
      }(i)     
  }
  console.log(a[8]());//8
  2）es6 解决
  var a = [];
  for (let i = 0; i < 10; i++) {
  a[i] = function () {
  return i;
      }
  }
  console.log(a[8]());//8

  //类似的一个Dom题
  for (var i = 0; i < 5; i++) {
   var btn = document.createElement('button');
   btn.appendChild(document.createTextNode('Button ' + i));
   btn.addEventListener('click',outPut(i));
   document.body.appendChild(btn);
  }
  function outPut(i){ 
      return ()=>{console.log(i)}
  }

(8) es6函数作用域
  let x=1;
  (function(y=x){
    let x=2;
    console.log(y);//1,若全局作用域中没有声明x，则报错
  })();

  let foo="outer";
  (function bar(func=x=>foo){
    let foo='inner';
    console.log(func());//outer func函数的作用域为声明所在作用域，即全局作用域
  });

(9)在 JavaScript，常见的 false 值：
  0, '0', +0, -0, false, '',null,undefined,null,NaN
  要注意空数组([])和空对象({}):
    console.log([] == false) //true
    console.log([] == true) //false
    console.log({} == false) //false
    console.log({} == true) //false
    console.log(Boolean([])) //true
    console.log(Boolean({})) //true
  console.log(undefined === undefined); //true
  console.log(null === null); //true

(10)
  var f = function g() {
          return 23;
  };
  typeof g()    //  error
  typeof g      //  undefined
  typeof f()    //  number
  typeof f      //  function
  (11)
  var a = [1,2,3];
  let b=a.slice();
  let c=a.concat();
  console.log(a===b);//false
  console.log(a===c);//false
(12)
  将数组 var a=[1,2,3] 变成数组 [4,3,2,1] ?
  a.reverse().unshift(4)//true
  a.push(4).reverse()//false pushhe unshift返回的是新数组长度
  a.push(4); a.reverse()//true
  a.splice(3,1,4).reverse()//3不存在，且splice返回的是删除元素组成的数组
(13)
  var script = document.createElement(“script”);
  var head = document.getElementsByTagName(“head”)[0];
  script.type = “text/javascript”;
  script.src = “//i.alicdn.com/resource.js”;
  // 绑定资源加载成功事件
  script. 1onload = function( ){
  // 判断资源加载状态是否为加载成功或加载完成
  if( 2 /^(loaded|complete)$/. test (script. 3 readystate )  ) {
    script.onreadystatechange = null;
    . . . .
    }
  };
  // 绑定资源加载失败事件
  script. 4onerror = function( ) {
  . . . .
  };
  head.insertBefore (script , head.firstChild)
(14)函数引用类型的值传递的是值的引用
  var arr=[1,2];
  (function fn(a) {
      a.push(3);
      console.log(a);//[1,2,3]
      console.log(arr);//[1,2,3]
  })(arr)

(15)数字字符串之前存在数字中的正负号(+ -)时，会被转换成数字
  console.log(1 + "2" + "2");//122
  console.log(1 + +"2" + "2");//32
  console.log(1 + -"1" + "2");//02
  console.log(+"1" + "1" + "2");//122
  console.log( "A" - "B" + "2");//NaN2
  console.log( "A" - "B" + 2);//NaN
(16)
  var a={},
      b={key:'b'},
      c={key:'c'};
  a[b]=123;//[object Object]:123
  a[c]=456;
  console.log(a[b]);
(17)
['1','2','3'].map(parseInt);//[1,NaN,NaN]
注意:
parseInt(str,radix);//radix按几进制转化
map(str,index,arr);

(18)
var a=1;
function test(){
  console.log(a);//1
  a=2;
  console.log(a);//2
  console.log(this.a);//浏览器环境2 node环境undefined。
  //node环境this指向global，而var或不加var生命的变量不在global上
} 

(19)函数及它里面变量的作用域在编译时确定，而不是在运行时确定
var a=1;
function f(x,g=()=>{a=2}) {
    var a=3;
    g();
    console.log(a);//3
}
f();
console.log(a);//2

var a=1;
var g=function(){a=2;}
function f(g) {
    // body...
    var a=3;
    g();
    console.log(a);//3
}
f(g);
console.log(a);//2

var a=1;
function f() {
    // body...
    var a=3;
    var g=function(){a=2;}
    g();
    console.log(a);//2
}
f();
console.log(a);//1
(20)负数取模,符号由被除数决定
-7%3//-1
7%(-3)//1
-7%(-3)//-1
(21)注意 abc开始都指向同一个数组[1,2],若修改数组a,b,c三个值都改变，但如果以直面量赋值，则只改变当前元素
var a=b=c=[1,2]; a=[3,4];  c.length=1; b//a=[3,4] b=[1] c=[1]
  (function(){var a=b=c=[1,2];})() 
  console.log(a);//error
  console.log(b);//[1,2]
  console.log(c);//[1,2]
(22)
  var a=0;var b=0;
   function A(a){
     A=function(b) {
       console.log(a+b++)//4
     }
     console.log(a++);//1
   }
   console.log(a);//0
   A(1);
   console.log(a);//0
   A(2);