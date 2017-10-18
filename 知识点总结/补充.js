1. 浏览器内核有哪些；
  -ms-      Trident内核 IE
  -webkit-  WebKit内核  Safari Chrome
  -o-       Presto内核  Opera
  -moz-     Gecko内核   firefox
2. 浏览器的渲染方式；
   兼容模式[Quirks mode] 和 标准模式 [Standars mode]还有几乎标准模式 （Almost standards mode ）。
3. 一个对象的实例，如何统计被几次调用过，分别具体被哪些函数调用过，可以有哪些方法
  （1）Object.defineProperty(obj,prop,des description)
    var obj={
        count:[],
        value:'123'
    }
    Object.defineProperty(obj,"value",{
        enumerable: true,
        configurable: true,
        get:function(){
            this.count++;
            return '123';
        },
        set: function(newVal) {
            if (newVal === obj) return;
            obj = newVal;
        }
    });
    console.log(obj.value);
  （2）创建私有变量
    var obj=(function(){
        var routes=[];//创建私有变量
        return function(fnName){
          routes.push(fnName);
        }
    })();
    function f1(){
        obj('f1');
    };
    f1();

4. css清除浮动的原理，clear:both和clear:left的区别；
  clear的值有四个
    none：允许两边都可以有浮动对象；
    both：不允许有浮动对象；
    left：不允许左边有浮动对象；(float:left;的元素清除浮动)
    right：不允许右边有浮动对象。(float:right;的元素清除浮动)
  总结：加clear的容器，只能清除自身之前的容器浮动，并且清除浮动方向对应。
5、行内元素和块级元素的区别；
  在标准文档流里面，块级元素具有以下特点：
    ①总是在新行上开始，占据一整行；
    ②高度，行高以及外边距和内边距都可控制；
    ③宽度始终是与浏览器宽度一样，与内容无关；
    ④它可以容纳内联元素和其他块元素。
  行内元素的特点：
    ①和其他元素都在一行上；
    ②高，行高及外边距和内边距部分可改变；
    ③宽度只与内容有关；
    ④行内元素只能容纳文本或者其他行内元素。
    不可以设置宽高，其宽度随着内容增加，高度随字体大小而改变，
  内联元素可以设置外边界，但是外边界不对上下起作用，只能对左右起作用，
  也可以设置内边界，但是内边界在ie6中不对上下起作用，只能对左右起作用
6、websocket相关；
  var ws = new WebSocket(url, [protocol] );
  WS协议有两部分组成：握手和数据传输。
  与HTTP比较
   (1)相同点
      1）都是基于TCP的应用层协议。
      2）都使用Request/Response模型进行连接的建立。
      3）在连接的建立过程中对错误的处理方式相同，在这个阶段WS可能返回和HTTP相同的返回码。
      4）都可以在网络中传输数据。
   (2)不同点
      1）WS使用HTTP来建立连接，但是定义了一系列新的header域，这些域在HTTP中并不会使用。Upgrade: websocket。Connection: Upgrade.
      2）WS的连接不能通过中间人来转发，它必须是一个直接连接。
      3）WS连接建立之后，通信双方都可以在任何时刻向另一方发送数据。
      4）WS连接建立之后，数据的传输使用帧来传递，不再需要Request消息。
      5）WS的数据帧有序。
  适用场景：
  1）海量并发及客户端与服务器交互负载流量大的情况
  2）客户端发送和接受消息是在同一个持久连接上发起，实时性优势明显。

  轮询polling:http采用这种反是保证实时性。客户端通过一定的时间间隔以频繁请求的方式向服务器发送请求，来保持客户端和服务器端的数据同步
7、ws和wss的区别；
   wss的实现和https的实现没有本质的区别，都是只需在websocket(ws)或者http的基础上添加证书.
8、上来就写个Animal类，有个Cat类继承它，要求新建一个Cat的实例，可以调用sayName方法输出自己的名字“大白的猫”；
  function Animation(name){
    this.name=name;
  }
  Animation.prototype.sayName=function(){
    return this.name;
  }
  function Cat(name){
    Animation.call(this,name)
  }
  Cat.prototype=Object.create(Animation.prototype);
  var cat=new Cat('大白的猫');
  console.log(cat.sayName());

9、渐进增强和优雅降级
  1）渐进增强 progressive enhancement：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。
  2）优雅降级 graceful degradation：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。
10、CSS中的长度单位
  绝对长度：cm mm pt(点，标准印刷单位)
  相对长度：px,,rem,em,ex(所用字体中小写x的单位),vw,vh,vh,vmin,vmax
  角度值：度deg 梯度grad 弧度rad
11、canvas切图的原理
  Canvas是基于像素的图像API，使用JavaScript程序绘图(动态生成)，SVG是使用XML文档 描述来绘图。
  SVG是基于矢量的，所有它能够很好的处理图形大小的改变。Canvas是基于位图的图像，它不能够改变大小，只能缩放显示；所以说Canvas更适合用来实现类似于Flash能做的事情(当然现在Canvas与Flash相比还有一些不够完善的地方)。
Canvas提供的功能更原始，适合像素处理，动态渲染和大数据量绘制；
SVG功能更完善，适合静态图片展示，高保真文档查看和打印的应用场景
12、HTML语义化的理解和作用
作用：1）为了在没有CSS的情况下，页面也能呈现出很好地内容结构、代码结构
      2）有利于SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息
      3）方便其他设备解析
      4）用户体验度好
      5）便于团队开发和维护，语义化更具可读性
h5新增语义化标签：1）header 2）footer 3）hgroup(譬如文章的主标题和副标题的组合) 
  4）nav 5）article 6）section(文档中的“节”或“段”,通常还带标题)
  7）aside使用总结：
    a）aside在article内表示主要内容的附属信息，
    b）在article之外则可做侧边栏，没有article与之对应，最好不用。
    c）如果是广告，其他日志链接或者其他分类导航也可以用
13、项目用REM布局吧？REM如何做自适应的？
  rem 是指相对于根元素的字体大小的单位。
  只要调整根元素的大小就可以自动更改相应子元素的大小
14、移动端怎么做优化？动画如何做加速？
  1）合并css和js，减少http请求
  2）使用缓存
  3）压缩和精简js和css
  4）js放头部，css方底部
  5）使用首屏加载、按需加载和滚屏加载
  6）增加loading进度条
  7）避免使用重定向
  8）使用touchstart、touchend代替click
  9）HTML使用viewPort
  10）合理使用requestAnimationFrame代替setTimeout
15、如何做首屏加速的？
  1）首屏数据拉取逻辑置于顶部，是为了数据能够第一时间返回，相比起将数据拉取逻辑放在外部资源会少了一个JS资源加载的往返时间。
  2）首屏渲染css及js逻辑优先内联HTML，这是为了当HTML文档返回时CSS和JS能够立即执行。
  3）次屏逻辑延后处理和执行，各种数据上报最好是延时上报，这样可以减少阻塞。
16、移动端适配的3种方案
  1）meida queries 的方式可以说是我早期采用的布局方式，它主要是通过查询设备的宽度来执行不同的 css 代码，最终达到界面的配置
  2）Flex 弹性布局（天猫的实现方式）
    它的viewport是固定的：<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  3）rem+viewport （淘宝使用）
    根据rem将页面放大dpr倍, 然后viewport设置为1/dpr.
17、知道哪5种设计模式吗？
  单例、策略、代理、迭代器、观察者、
  命令、组合、享元、模板方法、职责链、
  中介者、装饰者、状态、适配器、外观
18、AMD是什么？解决什么问题？了解AMD,CMD,UMD吗？AMD与CMD的区别？啥叫依赖前置？
  AMD推崇依赖前置：在解析和执行当前模块之前，模块作者必须指明当前模块所依赖的模块。
  CMD推崇依赖就近，可以把依赖写进你的代码中的任意一行
  UMD是AMD和CommonJS的融合。AMD异步加载模块，CommonJS同步加载
19、BootStrap的栅格系统实现原理？（说了bs3和bs4的）
  @media 阈值 float width:calc()
  例如：@media (max-width: 768px) {
    .col-sm-1{
        width: calc(8.33% - 26px);
    }
  }
20、说说Vue的MVVM如何交互的？
    MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，
  通过Observer来监听自己的model数据变化，通过Compile来解析
  编译模板指令，最终利用Watcher搭起Observer和Compile之间的
  通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) 
  -> 数据model变更的双向绑定效果。
21、知道Vue监测变量如何实现的吗？
    Object.defineProperty()这个方法来劫持了vm实例对象的属性的读写权
22、VueRouter用哪些API实现的？ 改变hash参数会引起视图的更新吗？
    popstate事件和hashchange事件
23、平时如何学习Vue底层原理的
   跟着梁少峰的博客上的讲解学习
24、说说你项目中实现的Dialog组件？提供了哪些API？如何设计这些API的？
  属性：title、visible、size
  事件：close、open、before-close
25、说说你了解的垃圾回收机制
  1）标记清除：当变量进入执行环境的时候，比如函数中声明一个变量，垃圾回收器将其标记为“进入环境”，当变量离开环境的时候（函数执行结束）将其标记为“离开环境”。
  2）引用计数：跟踪记录每个值被使用的次数，在运行的时候清理掉引用次数为0的值占用的空间。
26、setTimeout执行机制（eventLoop）
  主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。
27、知道Promise是用来干嘛的吗？Promise底层如何实现的？为什么要用setTimeout去模拟。
  1）Promise用来传递异步消息。
  2）底层实现相当于一个状态机，面对不同的状态执行不同的函数。
  3）用setTimeout去模拟实现异步操作
28、图片懒加载怎么做的（getBoundingClientRect）
  1）真正的路径存在元素的“data-url”属性里，要用的时候就取出来 （getAttribute,setAttribute）
  2）绑定 window.onscroll事件
    获取元素当前距顶部位置el.getBoundingClientRect().top,
     获取 document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop)
    比较两个值，判断元素是否在可视区内。如果元素在可视区，创建图片。
        var img = document.createElement('img');
        img.src = src;
        obj.appendChild(img);
  3）window.onload调用window.onscroll事件
29、懒加载的滚动如何做优化（函数节流） 
  function throttle(fn,interval){
    var _self=fn,
        timer=null,
        firstTime=true;
    return function () {
      var me=this,
          args=arguments;
      if (firstTime) {
        _self.apply(me,args);
        return firstTime=false;
      }
      if(timer){
        return false;
      }
      setTimeout(function () {//延迟一段时间执行
        clearTimeout(timer);
        timer=null;
        _self.apply(me,args);
      },interval||500);
    }
  }
  window.onscroll=throttle(fn,500);
30、cookie除了key与value还有哪些参数 
  1）name  必需。规定 cookie 的名称。
  2）value 必需。规定 cookie 的值。
  3）expire  可选。规定 cookie 的有效期。
  4）path  可选。规定 cookie 的服务器路径。
  5）domain  可选。规定 cookie 的域名。
  6）secure  可选。规定是否通过安全的 HTTPS 连接来传输 cookie。
31、请问何为混合应用(Hybrid APP)，与原生Native应用相比它的优劣势。
    Hybrid APP是Native APP上结合使用了Web View（Native APP的模块
或称组件，用来加载Web资源），采用了Web 技术的 APP，本质上
属于原生应用（APP外壳）。    
优势：1）兼容性良好      
      2）代码移植性高，成本低             
      3）开发者社区活跃，能够及时应用最新适合的Web技术来解决问题，
         提高用户体验度          
      4）APP更加轻便，内容更新方便
劣势：1）性能：相对不如原生APP性能好、体验流畅   
      2）Web技术在APP中操作权限有限，需要APP同步支持
32、重绘和重排（重排一定会引起重绘）
重排发生：
  1、添加或者删除可见的DOM元素
  2、元素位置改变
  3、元素尺寸改变
  4、元素内容改变
  5、页面渲染初始化（这个无法避免）
  6、浏览器窗口尺寸改变
避免：
  1）将多次改变样式属性的操作合并成一次改变类名操作
  3）在内存中组织HTML，完成后再一次性添加到文档中去。
  3）将需要多次重排的元素position(absolute、fixed)属性，使它脱离文档流
　4）要对一个元素进行复杂的操作时，将它的display设为none;这样只会引起两次重排
　5）在需要经常获取那些引起浏览器重排的属性值时，要缓存到变量。
33、端口
  端口号是标识主机内唯一的一个进程，IP+端口号就可以标识网络中的唯一进程。
 作用:我们知道一台主机(对应一个IP地址)可以提供很多服务，比如web服务，ftp服务等等。如果只有一个IP，无法却分不同的网络服务，所以我们采用”IP+端口号”来区分不同的服务。
34、大量图片的轮播图怎么实现和优化，说了lazy-load的具体实现，然后动画切换的实现，使用三个元素就可以实现了。两个用于动画效果，一个用于预加载图片，在进行一次移动之后，将移出视口的元素卸载然后挂载到三个元素的最后。
轮播图默认只给前三张设src，后面的不要加载src，也就是先不要有src属性。每一张在当前时，都给后面的两张动态设src。滚动过去2张之后，比如现在是第10张，那么前七张的src动态去掉。
35、首字节时间
TFB-首字节时间，是指从客户端开始和服务端交互到服务端开始向客户端浏览器传输数据的时间（包括DNS、socket连接和请求响应时间），是能够反映服务端响应速度的重要指标，获取在接收到响应的首字节前花费的毫秒数。
36、冒泡和非冒泡事件
不冒泡：1）abort blur error focus load mouseenter mouseleave resize unload 
        2）media相关事件，都不冒泡    
冒泡：        
  drag相关事件 dragstart、drag、dragenter、dragexit、dragleave、dragover、drop、dragend均冒泡           
  History相关事件：popstate，hashchange冒泡（从window开始……所以意义在哪里），pagetransition不冒泡           
  触摸事件会冒泡 touchstart、touchmove和touchend
37、script标签的defer和async,这两种方式下载顺序随机，并不能确定先后
defer：用于开启新的线程下载脚本文件，并使脚本在文档解析完成后执行。 
async：HTML5新增属性，用于异步下载脚本文件，下载完毕立即解释执行代码。 
defer：
  1. defer只适用于外联脚本，如果script标签没有指定src属性，只是内联脚本，不要使用defer 
  2. 如果有多个声明了defer的脚本，则会按顺序下载和执行 
  3. defer脚本会在DOMContentLoaded和load事件之前执行 
async：
  1. 只适用于外联脚本，这一点和defer一致 
  2. 如果有多个声明了async的脚本，其下载和执行也是异步的，不能确保彼此的先后顺序 
  3. async会在load事件之前执行，但并不能确保与DOMContentLoaded的执行先后顺序           

如果让你做IE7兼容，你怎么做？（从html,css,js方面说）
做过后端吧？如何判断区分一个用户的身份？--session
session的生成规则？sessionid的生成规则？
数据库有哪些引擎
数据库如何实现回滚

编程：
1、一个字符串web(dev(ni(cat(new)))),找出第n个括号中的内容
  var str="web(dev(ni(cat(new))))";
  function fn(str,n){
      while(n){
          var start=str.indexOf('(');
          var last=str.lastIndexOf(')');
          str=str.slice(start+1,last);
          n--;
      }
      return str;
  }
  console.log(fn(str,2));
2、母牛生仔问题：一只母牛，第二年底生一只母牛和一只公牛，第三年底生一只母牛 ，第五年开始母牛会死。公牛也只能活四年。请问一个农场开始只有一只刚出生的母牛，N年后一共有多少只牛。
  function cowrecursion($i)  
  {  
      if ($i == 1) //如果是第一年，则1头牛。   
      {  
          return 1;  
      }  
      else if ($i == 2)  
      {  
          return 2 + cowrecursion(1); //第一母牛和儿子们+第二母牛第一年        
      }  
      else if ($i == 3)  
      {  
          return 2 + cowrecursion(2) +  cowrecursion(1); //第一母牛和儿子们+第二母牛第二年 +第三母牛第一年  
      }  
      else if ($i ==4)  
      {  
          return 2 + cowrecursion(3) +  cowrecursion(2);  //第一母牛和儿子们+第二母牛第三年 +第三母牛第二年  
      }  
      // elseif ($i == 5)  
      // {          
          // return cowrecursion(4) +  cowrecursion(3);    //第一母牛死了。公牛也死了。第二母牛第四年 +第三母牛第三年          
      // }  
      else if ($i >= 5)  
      {  
          return cowrecursion($i-1) +  cowrecursion($i-2);    
      }  
  }
3、resize和scroll事件的性能优化（函数节流）
  var throttle=function(fn,interval){
    var _self=fn,
    timer,
    firstTime=true;
    return function(){
      var args=argumrnts,
          me=this;
        if (firstTime) {
           _self.apply(me,args);
           return firstTime=false;
        }
        if(timer){
          return false;
        }
        timer=setTimeout(function(){
          clearTimeout();
          timer=null;
          _self.apply(me,args);
        },interval);
    };
  };
  window.onresize=throttle(function(){
    console.log(1);
  },500);

4、堆排序
    时间复杂度o(nlog2n), 空间复杂度o(1)
    function heapSort(array) {
      console.time('堆排序耗时');
      //建堆
      var heapSize = array.length, temp;
      for(var i=Math.floor(heapSize/2)-1; i >= 0; i--){
          heapify(array,i,heapSize);
      }
      //堆排序
      for(var j = heapSize - 1; j >= 1; j--){
          temp= array[0];
          array[0] = array[j];
          array[j] = temp;
          heapify(array, 0, --heapSize);
      }
      console.timeEnd('堆排序耗时');
      return array;
    }
    /*方法说明：维护堆的性质
    @param  arr 数组 x 数组下标 len 堆大小*/
    function heapify(arr, x, len) {
      var l=2*x+1, r=2*x+2, largest=x,temp;
      if (l < len && arr[l] > arr[largest]) {
          largest = l;
      }
      if (r < len && arr[r] > arr[largest]) {
          largest = r;
      }
      if (largest != x) {
          temp= arr[x];
          arr[x] = arr[largest];
          arr[largest] = temp;
          heapify(arr, largest, len);
      }
    }
    var arr=[91,60,96,13,35,65,46,65,10,30,20,31,77,81,22];
    console.log(heapSort(arr));

  给千万量级的珠子，共上百种颜色，围成一个圈，求连续的包含所有颜色的最短子串的长度，并分析时间复杂度；
  如果要你设计一个组件，你会如何设计
  实现一个calendar组件
  算法题是背包问题