1、var a=0;var b=0;
   function A(a){
     var A=function(b) {
       console.log(a+b++)
     }
     console.log(a++);
   }
   A(1);
   A(2);
2、<div id='a' class='a'>
      <div id='b' class='b'>
        <div id='c' class='c'></div>
      </div>
   </div>
   #a{
      background:#eee;
   }
   .c{
      background:#eee;
   }
   .a .b .c{
      background:#eee;
   }
   #b{
     background:red;
   }
3、微信免登陆怎么实现的
4、node服务器怎么防止崩掉
5、实现一个图片，地下有一个浮层，浮层上面有文字
6、三栏式布局，怎么实现flex时中间等距，可换行，一行可以有多个这样的效果
7、做一个提交操作后要执行三个更改界面dom的方法，怎么实现不更改函数的情况下去除一个函数
8、css动画  setTimeout、setInterval性能  requestAimationFrame
9、es6新特性，箭头函数是做什么用的
