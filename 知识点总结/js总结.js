编程：
1、js怎么实现表单提交按钮的短期重复点击。
  第一种：用flag标志；
  第二种：在onsubmit事件中设置，在第一次提交后使提交按钮失效；
  var mypretime=null;
  function formsubmit() { 
    var Time = new Date(); 
    var NowHour = Time.getHours(); 
    var NowMinute = Time.getMinutes(); 
    var NowSecond = Time.getSeconds(); 
    var mysec = (NowHour*3600)+(NowMinute*60)+NowSecond; 
    if(mypretime===null||(mysec-mypretime)>600) //600只是一个时间值，就是5分钟内禁止重复提交，值随你高兴设 
    { 
       mypretime=mysec; 
    } 
    else 
    { 
      alert(' 按一次就够了，请勿重复提交！请耐心等待！谢谢合作！'); 
      return false; 
    } 
    document.forms.formsubmitf.submit(); 
  } 
2、实现ajax函数
    function ajax(url, options) {
    //1.创建ajax对象
    var oAjax = null;
    if (window.XMLHttpRequest) {
        //IE6以上
        oAjax = new XMLHttpRequest();
    } else {
        oAjax = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //2.组织数据
    var param = ""; //请求参数。
    //只有data存在，且为对象使才执行
    var data = options.data ? options.data : -1; //缓存data
    if (typeof(data) === "object") {
        for (var key in data) { //请求参数拼接
            if (data.hasOwnProperty(key)) {
                param += key + "=" + data[key] + "&";
            }
        }
        param.replace(/&$/, ""); //去掉结尾&字符
    } else {
        param = "timestamp=" + new Date().getTime();
    }

    //3.发送请求，连接服务器
    var type = options.type ? options.type.toUpperCase() : "GET";
    var async = options.async ? options.async : true;
    if (type === "GET") {
        oAjax.open("GET", url + "?" + param, async);
        oAjax.send();
    } else {
        oAjax.open("POST", url, async);
        oAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        oAjax.send(param);
    }

    //4.接收返回
    oAjax.onreadystatechange = function() {
        if (oAjax.readyState === 4) {
            if (oAjax.status === 200) {
                //请求成功。形参为获取到的字符串形式的响应数据
                options.onsuccess(oAjax.responseText, oAjax);
            } else {
                //若存在请求失败回调函数，形参为XMLHttpRequest对象，便于进行错误进行处理
                options.onfail(oAjax);
            }
        }
    };
    return oAjax; //发送请求的XMLHttpRequest对象
}

// 使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest', {
        type: 'post',
        asnyc: false,
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function(responseText, xhr) {
            console.log(responseText);
        },
        onfail: function(xhr) {
            console.log(xhr);
        },
    }
);

3、js的深克隆（写一个深度拷贝函数）
  1）法1
  function copy(obj){
    return JSON.parse(JSON.stringify(obj));//也是一种深拷贝的方法
  }
  2）法2
  function cloneObject(src) {
      var Result;
      switch (Object.prototype.toString.call(src)) {
          case "[object Number]":
          Result = (typeof src === "number" ? new Number(src) : Number(src.toString()));
          break;
          case "[object String]":
          Result = (typeof src === "string" ? new String(src) : src.toString());
          break;
          case "[object Boolean]":
          Result = (typeof src === "boolean" ? new Boolean(src) : src);
          break;
          case "[object Date]":
          Result = new Date(src);
          break;
          case "[object Array]":
            Result=[];
            for (var i = 0, a; a = src[i]; i++) {
                //法一
                Result.push(cloneObject(a));
                //法二
                //temp[i] = cloneObject(a);
            }
            break;
          case "[object Object]":
            // keys 为对象src的键名字数组
            // 它是数组！！！
            for (var key in src) {
                Result[key] = cloneObject(src[key]);
            }
          break;
          default:
          break;
      }
      return Result;
  }

4、实现两个数组的排序合并，我一开始先合并再排序，他不乐意，然后我用了类似插入排序的方法。
  var arr1=[3,3,2];
  var arr2=[1,8,4];
  function concatAndSort(arr1,arr2){
      arr1.sort(function(a,b){
        return a-b;
      })
      for (var i = 0; i < arr2.length; i++) {
        var temp=arr[i];
        for (var j = arr1.length-1; j >=0 ; j--) {
          if (temp<arr1[j]) {
                arr1[j+1]=arr1[j];
          }
          else{
            break;
          }
        }
        arr1[j+1]=temp
      }
      return arr1;
  };
  console.log(concatAndSort(arr1,arr2));

5、若干个数字，怎么选出最大的五个。(先选出5个排序)
  var numbers=[1,3,5,6,3,7,2,7,2,3];
  var arr=[];
  arr.push(numbers[0]);
  var temp;
  for (var i = 1; i < numbers.length; i++) {
    if (arr.length===5) {
          if (arr[4]<numbers[i]) {
             temp=numbers[i];
             arr.pop();//删除数组最后一项
          }
          else{
            continue;
          }
    }
    else{
          temp=numbers[i];
    }
    //将数字插入到相应位置
    for (var j = arr.length-1; j >= 0; j--) {
      if (temp>arr[j]) {
        arr[j+1]=arr[j];
      }
      else{
        break;
      }
    }
    arr[j+1]=temp;
  }
  console.log(arr);

6、数组去重
  var arr=[1,2,3,4,3,43,null,null];
  1）set去重
    var newArr=[...new Set(arr)];
  2）hash去重
    function q(arr){
      var newArr=[];
      var obj={};
      for (i of arr) {
        if(obj[i]===undefined){
              newArr.push(i);
              obj[i]=i;
        }
      }
      return  newArr;
    }
    console.log(q(arr));

7、实现事件代理。
    function addEvent(element, event, listener) {
        if (element.addEventListener) {
            element.addEventListener(event, listener, false);//DOM2.0
        }
        else if (element[i].attachEvent) {
            element.attachEvent('on' + event, listener);//IE5+
        }
        else {
            element['on' + event] = listener;//DOM 0
        }
   }
   function delegateEvent(element, tag, eventName, listener) {
      addEvent(element, eventName, function (event) {
          if (event.target && event.target.nodeName.toLowerCase() == tag) {//tagName也可
              listener.call(event.target);
          }
      });
   }
   //调用
   delegateEvent(ul, 'li', 'click', function(){
        alert(this.innerText);
   }) 

8、手写一个jQuery插件 
  function VQuery(selector, root) {
    //用来保存选择的元素
    var elements = []; //保存结果节点数组
    var allChildren = null; //用来保存获取到的临时节点数组
    root = root || document; //若没有给root，赋值document
    switch (selector.charAt(0)) {
        case "#": //id选择器
          elements.push(root.getElementById(selector.substring(1)));
        break;
        case ".": //class选择器
          elements = root.getElementsByClassName(selector.substring(1));
        break;
        case "[": //属性选择器
            if (selector.indexOf("=") === -1) {
                //只有属性没有值的情况
                allChildren = root.getElementsByTagName("*");
                for (var i = 0, len = allChildren.length; i < len; i++) {
                    if (allChildren[i].getAttribute(selector.slice(1, -1)) !== null) {
                        elements.push(allChildren[i]);
                    }
                }
            } else {
                //既有属性又有值的情况
                var index = selector.indexOf("="); //缓存=出现的索引位置。
                allChildren = root.getElementsByTagName("*");
                for (var i = 0, len = allChildren.length; i < len; i++) {
                    if (allChildren[i].getAttribute(selector.slice(1, index)) === selector.slice(index + 1, -1)) {
                        elements.push(allChildren[i]);
                    }
                }
            }
            break;
        default: 
          elements = root.getElementsByTagName(selector);
    }
    return elements
  }
//解决ie8及以前版本的兼容问题
function trim(selector) {
    return selector.replace(/^\s+|\s+$/g, "");
}

//模仿jQuery的迷你$选择符。
function $(selector) {
  selector = trim(selector);
  //存在空格时，使用后代选择器
  if (selector.indexOf(" ") !== -1) {
      var selectorArr = selector.split(/\s+/); //分割成数组，第一项为parent，第二项为chlid。
      var dom = [];
      var Dom = {};//每一级满足条件的dom集合
      for (var i = 0; i < selectorArr.length; i++) {
        if (i == 0) {
              Dom[i] = [...VQuery(selectorArr[i], null)];
          }
          else {
              dom = [];
              var DomLength = Dom[i - 1].length;
              for (var m = 0; m < DomLength; m++) {
                  if(Dom[i]===undefined){
                      Dom[i]=[...VQuery(selectorArr[i], Dom[i - 1][m])]; 
                    }
                    else{
                      Dom[i]=Dom[i].concat([...VQuery(selectorArr[i], Dom[i - 1][m])]); 
                    }   
              }
          }
      }
      return Dom[selectorArr.length - 1];
  } else { //普通情况,只返回获取到所有对象
      return VQuery(selector, document);
  }
}

9、手写一个正则表达式，验证邮箱,判断url,手机号，去除空格。
  1）去除空格       
      str = str.replace(/\s+/g, "");//去除所有空格:      
      str = str.replace(/^\s+|\s+$/g, "");//去除两头空格:    
      str = str.replace(/^\s*/g, "");//去除左空格：    
      str = str.replace(/(\s*$)/g, "");//去除右空格：
  2）验证邮箱
     var reg=/^[A-Za-z\d]+[A-Za-z\d-_]*@[A-Za-z\d-_]+(.[A-Za-z\d]{2,4})$/
  3）验证手机号
     var reg=/^1[3,4,5,8]\d{9}$/g;
  4）判断url
     var reg=/(https?|ftp|http)://[\w]+/;

10、如何用Native JavaScript来读写Cookie？
    // 设置cookie
    function setCookie(cookieName, cookieValue, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays * 24 * 60 * 60 * 1000);
        document.cookie = cookieName + "=" + escape(cookieValue) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    }
    // 获取cookie值
    function getCookie(cookieName) {
        var arr, reg = new RegExp(cookieName + "=(\\w+);");
        if (arr = document.cookie.match(reg))
            return (arr[1]);
        else
            return null;
    }
    //删除cookies
    function delCookie(cookieName) {
        var cval = getCookie(cookieName);
        if (cval != null) {
            setCookie(cookieName, "", -1);
        }
    }

11、手写一个递归函数（考察arguments.callee，以及arguments的解释） 
  //arguments是传递的参数
  function sum(num){
    if(num===1) return num;
    num+=arguments.callee(num-1);// num+=sum(num-1);
    return num;
  }
  console.log(sum(5));

12、手写实现jquery里面的insertAfter
  function insertAfter(newElement,element){
    if (element.nextElementSibling) {
      element.parentElement.insertBefore(newElement,element.nextElementSibling);//必须是一个dom才能insertBefore
    }
    else{
      element.parentElement.append(newElement);
    }
  }

13、lazyload如何实现
    var addEvent=function(element, event, listener) {
        if (element.addEventListener) {
          addEvent=function(element, event, listener){
            element.addEventListener(event, listener, false);//DOM2.0
          }
        }
        else if (element[i].attachEvent) {
          addEvent=function(element, event, listener){
            element.attachEvent('on' + event, listener);//IE5+
          }
        }
        addEvent(element, event, listener);
    }

14、实现bind函数
      Function.prototype.bind=function(){
        var self=this,
            context=[].shift.call(arguments),
            args=[].slice.call(arguments);
        return function(){
          return self.apply(context,[].concat.call(args,[].slice.call(arguments)));
        }
      }
      var obj={
        name:'sven'
      }
      //实例测试
      var func=function(a,b,c,d){
        alert(this.name);
        alert([a,b,c,d]);
      }.bind(obj,1,2);
      func(3,4);

15、实现柯里化（currying）
    var currying=function(fn){
      var args=[];
      return function(){
        if (arguments.length===0) {
          fn.apply(this,args);//在参数为空时执行函数，其他仅仅将参数存起来
        }
        else{
          [].push.apply(args,arguments);
          return arguments.callee;
        }
      }
    }

16、原生js添加class怎么添加，如果本身已经有class了，会不会覆盖，怎么保留？
    //判断是否已存在该类
    function hasClass(element, className) {//首先判断elment有没有这个样式    
        var classNames = element.className;
        if (!classNames) { return false; }
        classNames = classNames.split(/\s+/);
        for (var i = 0; i < classNames.length; i++) {
            if (classNames[i] === className)
                { return true; }
        }
        return false;
    }
    // 为element增加一个样式名为newClassName的新样式
    function addClass(element, newClassName) {
        if (!hasClass(element, newClassName)) {
            // 法一
            element.className += " " + newClassName;
            // 法二 element.setAttribute("class", newClassName);
        }
    }
    // 移除element中的样式oldClassName
    function removeClass(element, oldClassName) {
        if (hasClass(element, oldClassName)) {
            element.removeAttribute("class", oldClassName);
            //element.className.replace(oldClassName,"11"); 不可用
        }
    }

17、手写实现一个promise
    var promise=new Promise(function(resolve,reject){
      if (/* 异步操作成功*/) {
        resolve(value);
      }
      else{
        reject(error);
      }
    });
18、手写一个promise版的ajax
    var getJSON=function(url){
      var promise=new Promise(function(resolve,reject){
        var client=new XMLHttpRequest();
        client.open('GET',url);
        client.onreadystatechange=function(){
          if (this.readyState===4) {
            if (this.status===200) {
              resolve(this.response);
            }else{
              reject(new Error(this.statusText));
            }
          }
        }
        client.responseType='json';
        client.setRequestHeader('Content-type','application/json');
        client.send();
      });
      return promise;
    }

19、两个div，左边固定右边自适应，且左边使用实现拖动效果
1）css
    .left,.right{
      height: 50px;
      position: relative;
    }
    .left{
      width:100px;
      background-color: yellow;
      margin-top: -50px;
    }
    .right{
      background-color: green;
      width: 100%
    }
    .dragStrip{
      position: absolute;
      width: 2px;
      background-color: #ddd;
      height: 50px;
      right: 0px;
      cursor: e-resize;
    }
2）html：
  <div id='dragMethod'>
    <div class="right"></div>
    <div class="left">
      <div class="dragStrip" draggable=true></div>
    </div>
  </div>
3）js:
    var dragStrip=document.getElementsByClassName('dragStrip')[0];
    dragStrip.cache=[];
    var timer=null;
    dragStrip.ondragstart=function(e){
      e.dataTransfer.setData('text',e.target.className);
    }
    dragStrip.ondrag=function(e){
      var me=this;
      //16ms重绘一次，避免短期重复绘制页面，影响性能
      if (timer===null) {
        me.cache.push((Number(e.clientX)-8)+'px');
        timer=setTimeout(function(){
          while(me.cache.length!==0){
                  me.parentElement.style.width=me.cache.shift();
          }
          timer=null;
        },16)
      }
      //me.parentElement.style.width=(Number(e.clientX)-8)+'px';
    }
    var dragMethod=document.getElementById('dragMethod');
    dragMethod.ondragover=function(e){
      e.preventDefault();
    }
    dragMethod.ondrop=function(e){
      var dragStrip=document.getElementsByClassName(e.dataTransfer.getData('text'))[0];
      dragStrip.parentElement.style.width=(Number(e.clientX)-8)+'px';
    }

20、怎么实现两个大整数的相乘说下思路
21、手写链表倒数第K个查找
22、js轮播实现思路
23、怎么完成一个提交订单页面
24、使用js画一个抛物线,抛物线上有个小球随着抛物线运动,有两个按钮能使小球继续运动停止运动



易错基础知识：
1、"==" 和 "===" 的不同
  1）前者会自动转换类型，后者不会
   例子：{}=={} []==[] null==undefined//false，false，true
         0=='0' //true
         0==='0'//false
  2）如果==两边值类型不同时，会先将两边都转为数字
     'pack'==true;//false，因为转换后为NAN==1
     console.log(NaN == NaN);//false 注意：NaN!=NaN
     console.log(true == 1);//true
     console.log(false == 0);//true
     console.log(Number(null));//0
     console.log(Number(undefined));//NaN
     特殊：console.log(null == 0);//false

2、js 语言的7种数据类型，布尔值（Boolean）、字符串（String）、数值（Number）、undefined、null、对象（Object）；es6的Symbol 
   注意：在js中数组是对象，函数是对象，正则表达式也是对象

3、typeof  返回值有7种："boolean"、"string"、"number"、"undefined"、"function"、"object" ；es6中有"symbol"。
   注意：没有Date和Array

4、0.3==(0.2+0.1)//false
   0.3==(3*0.1)//false
   0.3==(0.3*1)//true
   3==(2+1.0)//true

5、var a[1]=2;  a.length=2; a[0]=undefined;
   var a['name']='a';错误的对象赋值，前面由var   var a.name='a'；错误

6、变量命名原则
    1）变量名区分大小写，允许包含字母、数字、美元符号($)和下划线，但第一个字符不允许是数字，
       不允许包含空格和其他标点符号
    2）禁止使用JavaScript关键词、保留字全名
    3）变量命名长度应该尽可能的短，并抓住要点，尽量在变量名中体现出值的类型
    4）尽量避免使用没有意义的命名

7、判断数据类型的方式
  1）typeof  2）instanceof 3）Object.prototype.toString.call(obj);

8、假值?
   undefined null 
   +0 -0 NAN 
   ''空字符串，注意：'0'为true,==强制转化类型后为false 

9、拖拽实现：
   1）设置元素可拖拽：属性draggable:true;
   2）拖动什么 : 拖拽元素的ondragstart 和 setData()
      element.ondragstart=function(event)
      {
        event.dataTransfer.setData("Text",event.target.id);
      }
   3）放到何处 - 目标的ondragover
      element.ondragover=function(event)
      {
        event.preventDefault();
      }
   4）进行放置 - ondrop
      element.ondrop=function(event)
      {
        var data=event.dataTransfer.getData("Text");
        event.target.appendChild(document.getElementById(data));
      }
11、实现页面的局部刷新--js+ajax

js面试基础问题：
1、this指向：
（1）作为方法调用：指向该对象或该类
（2）作为普通函数调用：非严格模式指向window，严格模式为undefined
 (3) 构造器调用：指向构造函数返回的对象
（4）call、apply、bind：指向第一个参数对象，若为null/undefined指向window 

2、apply、call、bind的区别
    apply和call的区别是传入的参数形式不同，call传入参数数量不固定;apply传入两个参数，第一个是函数内this对象指向，第二个参数是数组或类数组。
    bind函数可以改变函数指向，但需要重新调用函数以执行。 
    注意：若三种函数的第一个参数为null,则指向默认宿主对象。非严格模式下浏览器中为window，严格模式下为null;
  apply和call的用途
    1）改变this指向  2）模拟bind函数   3）借用其他对象方法    

3、js中上下文是什么？js有哪些函数能改变上下文？
  定义：上下文是通过变量this工作。变量this总是引用代码当前所在的那个对象。
        记住全局对象实际上是window对象的属性。这意味着即使是在全局上下文里，
        this 变量仍然引用一个对象。上下文可以成为一个强大的工具，是面向对象
        代码不可或缺的一环。 
  改变上下文：call、apply、bind函数
  上下文和作用域区别：执行上下文在运行时确定，随时可能改变；作用域在定义时确定，永远不会改变。

4、对闭包和作用域的理解。
   1）闭包：函数被包含在另一个函数中，且可以访问父函数中变量
      作用：1）改变变量作用域,创建私有变量  2）改变变量生存周期 
   2）作用域是针对变量的
      当a1在查找变量的时候会先从自身的作用域区查找，找不到再到上一级作用域查找，一直到到全局作用域区查找，这样就形成了一个作用域链。

5、高阶函数作用：
  1）函数作为参数传递  2）函数作为返回值  3）currying(函数柯里化)  4）uncurrying  5）函数节流  6）分时函数 7）惰性加载函数

6、exec和match区别
  相同点：
    1、无子表达式和全局标识符g时表现相同，均返回第一个匹配项
    2、当正则表达式有子表示时，并且定义为非全局匹配，exec和match执行的结果是一样。数组第一项存放整个匹配项，数组第二项存放第一个子表达式匹配项，数组第三项存放第二个子表达式匹配项...依次类推。
        var reg = new RegExp("a(bc)") ; 
        var str = "3a4,5abc6,5abc6";
        alert(reg.exec(str));//abc,bc
        alert(str.match(reg));//abc,bc
  不同点：
    1.match是字符串的方法，exec是RegExp对象的方法
    2.当正则表达式带有全局标志g时，二者表现不一致。
      match会返回所有符合条件的匹配项，并以数组形式返回。数组第一项存放第一个匹配项，数组第二项存放第二个匹配项...依次类推。
      exec则永远返回第一个匹配项。但是当连续调用exec时，则每次的返回值都是下一个匹配项。
    3.当正则表达式包含子表达式时且包含全局标志g时，二者表现不一致。
      match会返回所有符合条件的匹配项，并以数组形式返回。这时，match不会再返回子表达式的匹配项了。数组第一项存放第一个匹配项，数组第二项存放第二个匹配项...依次类推。
      exec会返回子表达式的匹配项。换句话说就是，数组第一项存放整个匹配项，数组第二项存放第一个子表达式匹配项，数组第三项存放第二个子表达式匹配项...依次类推。

7、使用new操作符时具体是干了些什么
    1）创建一个空对象  var obj = new object();
    2）设置原型链   obj._proto_ = fn.prototype;
    3）让fn的this指向obj，并执行fn的函数体    var result = fn.call(obj);
    4）判断fn的返回值类型，如果是值类型，返回obj。如果是引用类型，就返回这个引用类型的对象。
        if (typeof(result) == "object"){  
            fnObj = result;  
        } else {  
            fnObj = obj;
        }  

8、js怎么实现面向对象。
   1）工厂模式
     function createPerson(name){
        var o=new Object();
        o.name=name;
        o.sayName=function(){
          return this.name;
        }
        return o;
     }
   2）构造函数模式
     function Person(name){
        this.name=name;
        this.sayName=function(){
          return this.name;
        }
     }
   3）原型模式
      function Person(name){}
      Person.prototype.name=name;
      Person.prototype.sayName=function(){
       return this.name;
      }
   4）组合使用构造函数和原型模式
      function Person(name){
        this.name=name;
      }
      Person.prototype.sayName=function(){
         return this.name;
      }
   5）动态原型模式
      function Person(name){
        this.name=name;
        if (typeof(this.sayName)!='function') {
          Person.prototype.sayName=function(){
           return this.name;
          }
        }
      }
   6）寄生构造函数模式--除了使用new操作符外，同工厂模式
   7）稳妥构造函数模式--安全，创建私有变量
      function createPerson(name){
        var o=new Object();
        o.sayName=function(){
          return name;//name为私有变量
        }
        return o;
     }

9、js继承：静态属性通过借用构造函数继承，方法通过原型继承
    1）原型链继承
        var SuperType=function(){
          this.property=true;
        };
        SuperType.prototype.getSuperValue=function(){
          return this.property;
        };
        var SubType=function(){
          this.subProperty=false;
        };
        SubType.prototype=new SuperType();
        SuperType.prototype.getSubValue=function(){
          return this.subProperty;
        };
        缺点：1）引用类型值问题  2）超类传参问题
    2）借用构造函数
       function SuperType(name){
           this.name=name;
           this.sayName=function(){
              return this.name;
           }
        }
        function SubType(){
          superType.call(this,'Nike')
          this.age=29;
        }
        优点：可以向超类传参  缺点：方法无法复用
    3）组合继承--最常用
        var SuperType=function(name){
          this.name=name;
        };
        SuperType.prototype.sayName=function(){
          return this.name;
        };
        var SubType=function(){
          SuperType.call(this, name);//向超类传递参数
        };
        SubType.prototype=new SuperType();
        缺点：创建了两次超类的参数
    4）原型式继承 Object.create、Object
        var SuperType=function(){
          this.property=true;
        };
        SuperType.prototype.getSuperValue=function(){
          return this.property;
        };
        var SubType=function(){
          this.subProperty=false;
        };
        SubType.prototype=Object.create(SuperType);
        SuperType.prototype.getSubValue=function(){
          return this.subProperty;
        };
        缺点：1）引用类型，会造成共享 2）不能向超类传参
    5）寄生式继承--返回一个新对象
        function createAnotherobj(superType){
           var SubType=Object(superType);
           SubType.sayHi=function(){
             return "Hi";
           }
           return SubType;
        }
        var SubType=createAnotherobj(superType);
    6）寄生组合式继承
        var SuperType=function(name){
          this.name=name;
        };
        SuperType.prototype.sayName=function(){
          return this.name;
        };
        var SubType=function(){
          SuperType.call(this, name);//向超类传递参数
        };
        SubType.prototype=Object.create(superType.prototype);

10、js原型链以及特点
    1）原型链
      Object.__proto__ === Object.constructor.prototype；
      fn.prototype.constructor=fn;
      JS在创建对象的时候，都有一个叫做__proto__的内置属性。寻找对象的属性和方法时，如果没有该对象或方法，
      则会在它的__proto__继续逐级向下查找，直到Object的__proto__为null停止
    2）特点
      javascript对象是引用传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。
      当我们修改原型时，与之相关的对象也会继承这一改变。

11、组合和继承的关系，哪个好用
   组合和继承是面向对象中两种代码复用的方式。
   1）组合('like a')是指在新类里面创建原有类的对象作为自己的成员变量，重复利用已有类的功能。
      优点：（对应继承的三个缺点）
        ①：当前对象只能通过所包含的那个对象去调用其方法，所以所包含的对象的内部细节对当前对象时不可见的。
　   　 ②：当前对象可以在运行时动态的绑定所包含的对象。可以通过set方法给所包含对象赋值。
　　    ③：当前对象与包含的对象是一个低耦合关系，如果修改包含对象的类中代码不需要修改当前对象类的代码。
      缺点：
        ①：容易产生过多的对象。
        ②：为了能组合多个对象，必须仔细对接口进行定义。
   2）继承('is a')是面向对象的主要特性之一，它允许设计人员根据其它类的实现来定义一个类的实现。
      优点：优点是子类可以重写父类的方法来方便地实现对父类的扩展。
　　  缺点：
        ①：父类的内部细节对子类是可见的。
        ②：子类从父类继承的方法在编译时确定，运行期间无法更改。
        ③：如果对父类的方法做了修改的话（比如增加了一个参数），则子类的方法必须做出相应的修改。所以说子类与父类是一种高耦合，违背了面向对象思想。
   组合比继承更具灵活性和稳定性，所以在设计的时候优先使用组合
   适用继承的场合：
      1）子类是一种特殊的类型，而不只是父类的一个角色
      2）子类的实例不需要变成另一个类的对象
      3）子类扩展，而不是覆盖或者使父类的功能失效

12、js自定义事件
 1）新建事件：var clickA = new Event("clickA");
 2）监听事件：document.addEventListener("clickA",function(e){},false)
 3）出发事件：document.dispatchEvent(clickA);

13、Array对象自带的方法，一一列举。
  1）检测数组：Array.isArray()
  2）转换方法：Array.toString() Array.join() Array.toLocaleString() Array.valueOf()
  3）添加：Array.unshift()  Array.push()  会修改原数组，返回新数组长度
     删除：Array.shift() Array.pop()  会修改原数组，返回删除的元素
  4）重排序：Array.reverse()  Array.sort(function(a,b){})
  5）操作方法：Array.slice()      不会修改原对象，返回第一个参数到不含第二各参数的数组。
               Array.concat()     不会修改原数组，返回连接后的数组。注意参数为数组时默认拼接数组中元素
               Array.splice(pos,count,n1,n2)  会修改原数组为新数组，返回删除元素组成的数组
  6）位置方法：Array.indexOf()  Array.lastIndexOf()
  7）迭代方法：Array.forEach(function(a){})
               Array.map(function(a){})
               Array.filter(function(a){})
               Array.every(function(a){})
               Array.some(function(a){})
  8）归并方法：Array.reduce(function(a,b){},init)
               Array.reduceRight(function(a,b){},init)
  es6:
    Array.from() 将类数组转化为数组
    Array.of()将一组值转化为数组  
    Array.copyWithin(target,start,end)将指定位置成员复制到其他位置  //target从该位置开始替换数据
    Array.find(function(value,index,arr){})    Array.findIndex(function(value,index,arr){}) 返回满足条件的数组的值/位置
    Array.fill() 以某个值填充数组  
    Array.entries()  Array.keys()  Array.values()  获取数组的值对
    Array.includes()  判断数组是否包含某个元素
    for...of遍历数组

14、Array对象自带的排序函数底层是怎么实现的？
   数组长度小于等于 22 的用插入排序 InsertionSort，比22大的数组则使用快速排序 QuickSort。
15、常用的排序算法有哪些？
    1）冒泡排序,从小到大
      原理：对数组进行遍历，相邻元素根据大小进行交换，每次遍历将最小值推至最前方，然后对剩下的值再次进行比较
      时间复杂度O(n^2);空间复杂度O(1)
      实现：
          function pop(arr){
            var len=arr.length;
            var result=arr.slice(0);
            var temp;
            for (var i = 0; i < len; i++) {
              for (var j = len-1; j > i; j--) {
                if (result[j]<result[j-1]) {
                  temp=result[j];
                  result[j]=result[j-1];
                  result[j-1]=temp;
                }
              }
            }
            return result;
          }
          console.log(pop([5,7,4,3]));
    2）选择排序，从小到大
      原理：与冒泡排序类似，只不过选择排序不是通过相邻元素交换而将最小值“冒泡”到顶端，而是从数组第一个元素开始，与后面的的元素进行比较，如果后面的元素都比他大，则不需要交换，如果有比其小的，则两个值相互交换。
      时间复杂度O(n^2);空间复杂度O(1)
      实现：
          function select(arr){
            var len=arr.length;
            var result=arr.slice(0);
            var k;
            for (var i = 0; i < len; i++) {
              k=i;
              for (var j = i; j < len; j++) {
                if (result[k]>result[j]) {
                  k=j;
                }
              }
              if (k!=i) {
                var temp=result[i];
                result[i]=result[k];
                result[k]=temp;
              }
            }
            return result;
          }
        console.log(select([5,7,4,3]));
    3）插入排序,从小到大
      原理：从数组第二个值开始，依次将后续的数值经过比较与前面排序后的序列比较后插入
      时间复杂度O(n^2);空间复杂度O(1)
      实现：
          function insert(arr){
            var result=arr.slice(0);
            var len=arr.length;
            var temp;
            for (var i = 1; i < len; i++) {
              temp=result[i];
              for (var j = i-1; j>=0; j--) {
                if (result[j]>temp) {
                  result[j+1]=result[j];
                }
                else{
                  break;
                }
              }
              result[j+1]=temp;
            }
            return result;
          }
          console.log(insert([5,7,4,3]));
    4）快速排序，从小到大
       原理：从数组中取一个值为基准值，并将剩下的值与之比较，小于基准值的放到左边，大于基准值的放到右边，并再次对左右两边进行快速排序，直至左右两边只剩一个元素。
       时间复杂度O(n*log2n);空间复杂度O(n*log2n)  //2是底
       实现：
            function quick(arr){
              if (arr.length<=1) {return arr;}//[]和一个元素数组直接返回
              var left=[],
              right=[],
              mid=Math.floor(arr.length/2),
              pIndex=arr.splice(mid,1);
              for (var i = 0; i < arr.length; i++) {
                if (arr[i]<pIndex) {
                  left.push(arr[i]);
                }
                else{
                  right.push(arr[i]);
                }
              }
              return quick(left).concat(pIndex,quick(right));//递归调用
            }
            console.log(quick([5,7,4,3]));
    5）希尔排序，从小到大
       原理：由于直接插入排序每一次插入新值都要与之前已经序列化的部分进行比较，越往后所需要比较的次数越多，所以希尔排序通过设置步长，将整个数组依照步长分为一个个分块儿，将分块序列化之后再将整个数组进行插入排序。
       时间复杂度O(n^1.3);空间复杂度O(1)
       实现：
            function shell(arr){
              var len=arr.length,
              gap=Math.floor(len/2),
              temp;
              while(gap>0){
                for (var i = gap; i < len; i++) {
                  if (arr[gap]>arr[i-gap]) {
                    temp=arr[gap];
                    arr[gap]=arr[i-gap];
                    arr[i-gap]>temp;
                  }
                }
                gap=Math.floor(gap/2);
              }
              return arr;
            }
            console.log(quick([2,5,7,9,45,12,6,74]));
    6）归并排序，从小到大
       原理：由于直接插入排序每一次插入新值都要与之前已经序列化的部分进行比较，越往后所需要比较的次数越多，所以希尔排序通过设置步长，将整个数组依照步长分为一个个分块儿，将分块序列化之后再将整个数组进行插入排序。
       时间复杂度O(n*log2n);空间复杂度O(1)  //2是底
       实现：
        var MergeSort=function(arr){
           var length=arr.length;
           if (length==1) {
              return arr;
           }
           var mid=Math.floor(length/2);
           var left=arr.slice(0,mid);
           var right=arr.slice(mid,length);
           return merge(MergeSort(left),MergeSort(right));
        } 
        var merge=function(left,right){
          var result=[],
              il=0,
              ir=0;
          while(il<left.length&&ir<right.length){
                if (left[il]<right[ir]) {
                  result.push(left[il++]);
                }else{
                  result.push(right[ir++]);            
                }
          }
          while(il<left.length){
            result.push(left[il++]);
          }
          while(ir<right.length){
            result.push(right[ir++]);
          }
          return result
        }
        console.log(MergeSort([5,45,9,7,2,12,6,74]));

16、描述下二分查找,第一步将数组排序
    function binarySearch(arr, val){  
      var low = 0, high = arr.length-1,mid=0;  
      while(low<=high){  
          mid = Math.floor( (low + high) / 2);  
          if(arr[mid] == val){  
              return mid;  
          }  
          else if(arr[mid] > val){  
              high = mid - 1;  
          }  
          else{  
              low = mid + 1;  
          }  
      }  
      return -1;  
    }  
    console.log(binarySearch([1,2,5,7,8,9,11],18));  


17、数组和链表区别，分别适合什么数据结构？链表和数组插入的效率？
    1）数组结构在通过索引进行查询数据时效率比较高，而对于数组插入和删除操作，则效率会比较低。
    2）链表：
       a）链表是由一系列节点组成的，每个节点都会有一个链点，这就是next链，而next链则会执行下一个node的引用，所以我们在插入或者删除的时候，需要该表链表next链的指向地址即可。
       b）每个节点不需要内存进行连续存储，这样会减小删除和插入的线性开销。
       c）链表结构主要分为两种链表，单向链表和双向链表 ，即单向链表只有一个next链，而双向链表会有next链和pre链。
          还有一种特殊的循环列表：链表首元素head的父是链表尾元素tail，链表尾元素的子是head

18、数据结构及算法：
  1）顺序数据结构：数组、栈、队列、链表、集合（set）、字典（map）、散列（HashTable或HashMap 通过key的ASCII码之和存储）
     非顺序数据结构：树和图
  2）排序算法：冒泡排序，选择排序，插入排序，快速排序，shell排序，归并排序
     顺序搜索和二分搜索、图的广度优先搜索(while+shift())和深度优先搜索(递归)
     动态规划  贪心算法（通过每个阶段的局部最优从而达到全局最优，但不一定能获得最优解）

19、解释平衡二叉树（AVL），以及在数据结构中的应用（红黑树）
    定义：它或者是一颗空树，或者具有以下性质的二叉树：
          它的左子树和右子树的深度之差的绝对值不超过1，且它的左子树和右子树都是一颗平衡二叉树。

20、 IE 和 DOM 事件流的区别
  1）执行顺序不一样。IE采用冒泡型事件 DOM使用先捕获后冒泡型事件 
  2）参数不一样。attachEvent detachEvent两个参数。addEventListener removeEventListener三个参数，第三个参数true为捕获阶段，false为冒泡阶段。
  3）事件加不加on。
  4） this 指向问题。attachEvent中this指向window
      解决this指向window的方法：1）call、apply 2）使用事件源e代替this关键字 3）重写一个浏览器兼容的函数
  注意：addEventListener先绑定先执行，attachEvent绑定的事件是先绑定后执行

21、哪些操作会造成内存泄漏？
   内存泄漏是指在对象不需要时仍然存在
   1）意外的全局变量
   2）被遗忘的定时器或者回调
      setTimeout第一个参数使用字符串时或setInterval忘记关闭
   3）没有清理的已移除的DOM元素的引用
   4）闭包；循环引用；

22、window.onload和$(document).ready()的区别，浏览器加载转圈结束时哪个时间点？
  window.onload是在dom文档树加载完和所有文件加载完之后执行一个函数。
  也就是说$(document).ready要比window.onload先执行。
   document.ready = function (callback) {
      ///兼容FF,Google
      if (document.addEventListener) {
          document.addEventListener('DOMContentLoaded', function () {
              document.removeEventListener('DOMContentLoaded', arguments.callee, false);
              callback();
          }, false)
      }
       //兼容IE
      else if (document.attachEvent) {
          document.attachEvent('onreadystatechange', function () {
                if (document.readyState == "complete") {
                          document.detachEvent("onreadystatechange", arguments.callee);
                          callback();
                 }
          })
      }
      else if (document.lastChild == document.body) {
          callback();
      }
  }

23、js压缩原理
  1）移除注释和不必要的空格
  2）将局部变量替换成更短的形势
  3）尽量把对象的方框表示法替换成点表示法（foo['bar']替换成 foo.'bar'）
  4）尽可能去掉属性名的引号（{'foo'：'bar'}替换成{foo：'bar'}）
  5）替换字符中的转义符号（'a\'b'替换成'ab'）
  6）合并常量（'foo'+'bar'替换成'foobar'）

24、严格模式的限制和目的
  限制：1）变量必须先声明后使用
        2）函数不能有同名属性
        3）this为null或undefined是不会转化为全局变量
        4）arguments用法失效，不能使用argumnets.callee()
        5）不能扩展extensible为false的变量，不能删除configurable为false的变量
        6）增加了保留字（protected private interface static）
        7）不能使用with
        8）eval不能使用其函数外部不能使用函数内部变量
  目的：1）消除js中一些不合理、不严谨之处，减少一些怪异行为
        2）消除代码运行的一些不安全之处
        3）提高编译效率，增加运行速度
        4）为未来新版本js做好铺垫
   

ES6:
1、ES6新特性（ES7）。
   1）let、const 形成块级作用域。仅在作用域有效、不存在变量提升、暂时性死区、不允许重复声明
   2）变量的解构赋值（Array、Object、String、Number、Boolean、function等）
      用途：1）交换变量的值
            2）函数返回多个值、函数参数的值、函数参数默认值
            3）提取json数据
            4）遍历Map结构
            5）输入模块的指定方法
   3）字符串扩展 includes()/startWith()/endWith()  padStart()/padEnd()补全字符串
                 模板字符串
      正则的扩展  u、y修饰符  strick、source、flag属性  RegExp.escape转义
      数值扩展  Number.isFinite() Number.isNaN() Number.parseInt() Number.parseFloat()
                MAX_SAFE_INTEGER  MIN_SAFE_INTEGER Number.EPSILON
                Math对象上方法的扩展
      数组扩展  Array.from()  Array.of() Array.copyWithin(target,start,end) 
                Array.find(function(value,index,arr){})    Array.findIndex(function(value,index,arr){}) 返回满足条件的数组的值/位置
                Array.fill() 以某个值填充数组  
                Array.entries()  Array.keys()  Array.values()  获取数组的值对
                Array.includes()  判断数组是否包含某个元素
                for...of遍历数组
      函数的扩展  参数默认值、rest参数（...变量名）
                  扩展运算符、箭头函数、函数name
                  ES7 函数绑定::  尾逗号
      对象的扩展  简洁表示法、属性名表达式、name属性、
                  Object.is()比较两个对象是否相等
                  Object.assign(target,source1,source2)
                  Object.setPropertyOf(obj,prototype)
                  ES7 将rest参数和扩展运算符引入对象
    4）原始数据类型Symbol。 Symbol.for() Symbol.keyFor()
    5）代理Proxy对象  var proxy=new Proxy(target,handle);
       Reflect对象:1）将Object明显语言层面的方法放到Reflect对象上
                   2）使某些对象的方法返回更加合理
                   3）让Object操作都变成函数行为
                   4）Reflect与Proxy 方法一一对应
    6）二进制数组  ArrayBuffer、TypedArray、DataView
    7）Set和Map数据结构
    8）Generator(function*(){}) yeild* next方法(next的参数为上一条yeild语句的返回值) Generator.prototype.throw Generator.prototype.return
    9）Promise对象：传递异步消息
    10）ES7的async函数
    11）class:面向对象的语法糖
    12）module：解决模块化问题

2、ES6里头的箭头函数
   1）this对象
     箭头函数的this对象就是定义时所在的对象，而不是使用时所在的对象。
     箭头函数没有自己的this，导致内部的this就是外层代码块的this。
   2）箭头函数注意点
     this对象就是定义时所在的对象，而不是使用时所在的对象。
     不可以当作构造函数
     不能使用arguments对象
     不可以使用yeild命令
   
3、ES6中比较好用的语法。
    1）解构赋值
        用途：1）交换变量的值
          2）函数返回多个值、函数参数的值、函数参数默认值
          3）提取json数据
          4）遍历Map结构
          5）输入模块的指定方法
    2）扩展运算符
      用途：1）合并数组
          2）与解构赋值相结合
          3）函数返回值
          4）字符串转数组
          5）Set、Map 转数组
          6）Generator转数组
    3）箭头函数
    4）Object.assign()
          用途：1）为对象添加属性和方法
                2）克隆对象
                3）合并多个对象
                4）为属性指定默认值 Object.assign({},DEFAULTS,options);
    5）Set和Map数据结构
      Set 属性:constructor size
          方法：add(value) delete(value) has(value) clear()
          遍历：keys() values() entries() forEach(function(value,key){})
          weakSet:1）成员只能是对象  2）对象都是弱引用  3）add delete has方法
      Map 接受非字符串作为键名
          属性:size
          方法：set(key,value) get(key) has(key) delete(key) clear()
          遍历：keys() values() entries() forEach(function(value,key){}[,obj])
          weakMap：set(key,value) get(key) has(key) delete(key)
                  用途：DOM节点作为键名；部署私有属性
    6）for...of 遍历含iterator接口的对象
    7）Generator函数、Promise对象、async函数、class类、module

4、如何避免多重回调—个promise，promise简单描述一下，如何在外部进行 resolve()
   Promise对象用来传递异步消息。包括Pedding、Resolved（Fulfilled）、Rejected三个状态
   缺点：1）无法取消Promise 
         2）如果不设置回调函数，错误不会反映到外部
         3）当处于Pedding状态时，无法得知目前进展
   var promise=new Promise(function(resolve,reject){});
   方法：Promise.prototype.then(successFn,failFn);
         Promise.prototype.catch(failFn); 
         Promise.all()多个Promise实例合成一个新Promise P，都成功P状态为Fulfilled,否则Rejected
         Promise.race()多个Promise实例合成一个新Promise P，最先改变状态的实例决定P状态
         Promise.resolve()将现有对象转为Promise对象
         Promise.reject()返回状态为Rejected的Promise对象
   我们把resolve函数保存在defer中，这样就可以在外部对promise进行状态改变。如下例：
      var defer = {}
      var promise = new Promise(function(resolve){ 
          defer.resolve = resolve
      })
      promise.catch(function(reason){
          console.log(reason)
      })
      defer.resolve(promise)
      // TypeError: Chaining cycle detected for promise #<Promise>(…)

5、js的异步加载，ES7中的async用过么
    异步加载：1）回调函数  2）事件监听  3）发布-订阅  4）Promise对象
              5）Generator函数   6）async函数
    async函数是Generator函数的语法糖。实现就是将Generator函数和自动执行器包裹在一起
        优点：1）内置执行器，可以自动执行
             2）更好的语义。async、await相比于*、yeild语义清楚
             3）更广的适应性。yeild后面只能跟Trunk函数和Promise对象，而await后可以跟原始类型值（字符串、数字等）
             4）返回值是Promise。Generator函数返回的是iterator对象
        实现：Generator+Promise实现自动执行器
        用法： 
            async function getStockPriceByName(name) {
              var symbol = await getStockSymbol(name);
              var stockPrice = await getStockPrice(symbol);
              return stockPrice;
            }
            getStockPriceByName('goog').then(function (result) {
              console.log(result);
            });
        注意点：1）防止await后的Promise对象报错，最好将await命令放在 try...catch 中
                2）await命令只能用于async函数中
                3）与 Promise.all()配合使用处理并发异步操作

6、Class
      需要注意的地方：
        1）必须含有constructor函数
        2）方法不加function关键字
        3）方法之间不需要逗号分隔
        4）内部所有方法都是不可枚举的，且都是定义在原型上的。ES5自定义方法可枚举
        5）类的属性名可以用表达式
        6）实例属性除非显示定义在this上，否则都是定义在原型上
        7）不存在变量提升
        8）默认严格模式
        9）继承中子类constructor方法必须调用super，已继承父类this。由于子类本身没有this对象
        10）child.__proto__=parent;
            child.prototype.__proto__=parent.prototype;
        11）new.target 用于确定类是否通过构造函数调用；子类继承父类 new后指向子类
      优点：
        1）类可以实现原生构造函数的继承
        2）类可以使用Generator函数
        3）类有静态方法（static关键字）
        4）类有静态属性 ES6:类名.属性名=xx; ES7:static 属性名=xx;

7、ES7 修饰器
   修饰器是一个表达式，用于修改类的默认行为
   有@autobind @readonly @override @deprecate废除某种方法 等
   优点：1）会修改属性的描述对象
         2）可以为实例添加方法
         3）可以起到注释的作用
         4）可用于类型检查

8、AMD和CMD，commonJS的区别（模块化加载问题）
   AMD/CMD/CommonJs是JS模块化开发的标准，目前对应的实现是RequireJs/SeaJs/nodeJs.
   1）CommonJs主要针对服务端，AMD/CMD主要针对浏览器端
   2）AMD是预加载，在并行加载js文件同时，还会解析执行该模块（因为还需要执行，所以在加载某个模块前，这个模块的依赖模块需要先加载完成）；
   3）CMD是懒加载，虽然会一开始就并行加载js文件，但是不会执行，而是在需要的时候才执行。
   AMD和CMD优缺点：
    AMD为并行加载，加载速度快、但文件加载顺序不可控；
    CMD为同步执行（串行执行），执行时间会叠加，加载速度慢，但加载顺序可控。

9、ES6和commonJS模块加载
    ES6输出的是值得引用，CommonJS输出的是值的拷贝。
     ES6遇到模块加载命令import时不会去执行模块，只会生成一个动态的 只读(*)引用。
      并且不会缓存值，模块里的变量绑定其所在的模块。
    循环加载：
      1）ES6：只要存在引用，就能循环加载
      2）CommonJS：b.js中a.js没有执行完; main.js执行第二行时不会再次执行b.js;p280页

10、进程和线程区别，什么是线程同步
   CPU总是运行一个进程，其他进程处于非运行状态。一个进程可以包括多个线程。
   线程优点：
      1）易于调度。
      2）提高并发性。通过线程可方便有效地实现并发性。进程可创建多个线程来执行同一程序的不同部分。
      3）开销少。创建线程比创建进程要快，所需开销很少。
      4）利于充分发挥多处理器的功能。通过创建多线程进程，每个线程在一个处理器上运行，从而实现应用程序的并发性，使每个处理器都得到充分运行。
   线程同步：就是在发出一个功能调用时，在没有得到结果之前，该调用就不返回，同时其它线程也不能调用这个方法


10、requirejs如何避免循环依赖
  

11、requirejs实现原理*