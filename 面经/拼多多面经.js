1.两栏布局，左边固定，要求先加载内容区域，说出多种方法
2.正则对象test方法和exec方法的不同，分别返回什么
3.事件绑定的多种方式，事件监听addEventListener的第三个参数是什么，取值各有什么意思
4.事件代理  阻止事件冒泡(stopPropagation cancelBubble)  阻止事件默认方式
5.js基本数据类型有哪些，写一个函数判断变量的类型
6.详细说说box-sizing属性取值的区别
  box-sizing: content-box|border-box|inherit;
  宽度和高度分别应用到元素的什么位置。
7.有一段文字，里面有电话号码，电话号码是连续数字，需要把电话号码都替换成*，说出多种做法
  var reg=/1[3 4 5 8]\d{9}/g;
  1）str.replace(reg,'***********')
  2）str.split(reg).join('***********')
  3） var str1='';
      var lastIndex=0;
      while(arr=reg.exec(str)){//arr.index内容所在位置
          str1+=str.slice(lastIndex,arr.index)+'***********';
          lastIndex=reg.lastIndex;//正则表达式当前所在位置（在选中内容之后）
      }
      str1+=str.slice(lastIndex);
      console.log(str1)
8.Header 头 Set-cookie: http-only 是干什么用的？

二面（2017.08.24，25min）  
1.自我介绍 
2.讲讲你做过的项目 
3.项目中提到了 React，问：React 组件的生命周期？父子组件之间如何通信？子组件之间如何通信？ 
4.前端性能优化？ 
5.http 缓存原理？(Expires Cache-Control  if-Modified-Since/last-Modified if-None-Match/ETag) 
6.JavaScript 的垃圾回收机制？ 
7.CSS BFC 原理？ 
8.box-sizing 属性（两种盒子模型）？ 
9.稳定的排序和不稳定的排序？ 
  快速排序的思路？ 
  堆排序的思路？ 
10.还有什么想问我的？


1、自我介绍
2、js继承原理
3、闭包，经典闭包问题for循环i，实现指定输出
4、状态码  499 client has closed connection
5、http有哪几种请求的方法，options作用
6、CROS方法实现跨域
  1）Access-Control-Allow-Origin
    该字段是必须的。它的值要么是请求时Origin字段的值，
  要么是一个*，表示接受任意域名的请求。
  2）Access-Control-Request-Method
    该字段是必须的，用来列出浏览器的CORS请求会用到哪些
  HTTP方法，上例是PUT,GET,POST。
  3）Access-Control-Expose-Headers
     该字段可选。CORS请求时，XMLHttpRequest对象的
  getResponseHeader()方法只能拿到6个基本字段：
  Cache-Control、Content-Language、Content-Type、
  Expires、Last-Modified、Pragma。如果想拿到其他字段，
  就必须在Access-Control-Expose-Headers里面指定。
  上面的例子指定，getResponseHeader('FooBar')可以返回
  FooBar字段的值。
7、项目介绍，微信免登陆怎么实现
8、angular和vue区别
9、手写多路归并排序
10、前端性能优化？具体怎么实现的，用过哪些 
11、sessionStorage和localStorage的不同

1、自我介绍
2、项目介绍，vue优点
3、盒子模型，怎样在标准盒子模型中实现IE盒子模型
4、知道哪些排序算法，手写快排，时间复杂度
5、怎样知道一个元素在当前屏幕 getBoundingClientRect
6、实现空心圆，里面白色，外面红色(伪元素、border、radial-gradient)
7、有三个函数，内部实现都是异步的，怎么让这三个函数变成一个同步的，以节省时间
    --promise.all

1、自我介绍
2、对拼多多有了解吗，使用过吗，了解工作机制吗
3、为什么想从事电商，为什么选前端开发
4、有没有面过其他公司，有没有拿到其他公司的 Offer？
4、对工资有什么要求吗
5、家庭成员，父母同意去上海吗
6、保研的还是考研的，研究生成绩怎么样
7、有男朋友吗
8、以后生活规划。。。