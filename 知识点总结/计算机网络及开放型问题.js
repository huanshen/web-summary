                                  
你学过计算机组成原理没,说说你都了解些什么
如何查看一个网站的性能。
网站上线后如何查看网站在客户电脑上的性能。
网站如何实现离线应用：配置IIS


1、ajax 请求的时候 get 和 post 方式的区别?
  1）参数传递方式。get参数一个在 url 后面。post参数一个放在虚拟载体里面
  2）缓存（安全）问题。get请求需注意缓存引发安全问题，防止从浏览器的历史记录中读取到客户的数据；post请求不需担心这个问题
  3）有大小限制。get数据大小一般限制在1KB下；post数据访问量可以很大
  4）应用不同。get是论坛等只需要请求的，post是类似修改密码的
  5）服务端获取方式。get用Request.QueryString获取变量的值；post用Request.Form获取提交的数据；

2、 Ajax 的优缺点都有什么？
  优点:
    ① 页面无刷新，用户体验非常好。
    ② 使用异步方式与服务器通信，具有更加迅速的响应能力。
    ③ 可以把一些服务器负担的工作转到客户端，利用客户端闲置的能力来处理，减轻服务器负担，节约空间和宽带租用成本。ajax的原则是“按需取数据”，可以最大程度的减少冗余请求和响应对服务器造成的负担。
    ④ 基于标准化并被广泛支持的技术，不需要下载插件或者小程序。
  缺点:
    ① Ajax 不支持浏览器 back 按钮。
    ② 安全问题， Ajax暴露了与服务器交互的细节。
    ③ 对搜索引擎的支持比较弱。
    ④ 破坏了程序的异常机制。
    ⑤ 不容易调试。   

3、ajax工作原理、过程以及 readyState几个状态的含义 
  1）工作原理：Ajax 的核心是 JavaScript 对象 XMLHttpRequest，ActiveXObject(
    'Microsoft.XMLHttp')。该对象在IE5 中首次引入，它是一种支持异步请求的技术。
     简而言之，XMLHttpRequest 使您可以使用 JavaScript 向服务器提出请求并处理响应，
     而不阻塞用户。
  2）过程：实例化，open，send,onreadystatechange，然后是readyState（4）和status（200）。
        通过 oAjax.responseText得到data。jquery里是success回调里面的形参。
        responseText和responseXML。后者是XML解析了的。
  3）readyState几个状态（5种）
    0 - (未初始化)还没有调用send()方法。在定义后自动具有的状态值
    1 - (载入)已调用send()方法，正在发送请求
    2 - (载入完成)send()方法执行完成，
    3 - (交互)正在解析响应内容
    4 - (完成)响应内容解析完成，可以在客户端调用了。成功访问的状态

4、如果页面初始载入的时候把ajax请求返回的数据存在localStorage里面，然后每次调用的时候去localStorage里面取数，是否可行。
   不能保证数据的实时性，请求和实时性必然会有一方有所牺牲

5、Post一个file的时候file放在哪的？
    假设接受文件的网页程序位于 http://192.168.29.65/upload_file/UploadFile.假设我们要发送一个图片文件，文件名为“kn.jpg”，　

    POST/logsys/home/uploadIspeedLog!doDefault.html HTTP/1.1 

　　Accept: text/plain
　　Accept-Language: zh-cn 
　　Host: 192.168.24.56
　　Content-Type:multipart/form-data;boundary=-----------------------------7db372eb000e2
　　User-Agent: WinHttpClient 
　　Content-Length: 3693
　　Connection: Keep-Alive

　　-------------------------------7db372eb000e2

　　Content-Disposition: form-data; name="file"; filename="kn.jpg"

　　Content-Type: image/jpeg

　　(此处省略jpeg文件二进制数据...）

　　-------------------------------7db372eb000e2--
    注意：boundary 分隔多个文件、表单项。

6、描述下reset.css 文件的作用和使用它的好处。
  重置浏览器的css默认属性；浏览器的品种不一样，那么对默认样式的解释不一样，通过reset可以达到显示一致的效果。

7、请你谈谈 Cookie 的弊端。
    1）Cookie数量和长度的限制。每个domain最多只能有20条cookie，每个cookie长度不能超过4KB，否则会被截掉。
    2）安全性问题。如果cookie被人拦截了，那人就可以取得所有的session信息。即使加密也与事无补，因为拦截者并不需要知道cookie的意义，他只要原样转发cookie就可以达到目的了。 
    3）有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务器端保存一个计数器。如果我们把这个计数器保存在客户端，那么它起不到任何作用。 

8、sessionStorage 、localStorage 和 cookie 之间的区别
  共同点：都是保存在浏览器端，且同源的。
  区别：
    1）数据传递方式不同，cookie数据在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递；cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。
    2）存储大小限制也不同,cookie数据不能超过4k同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据。而sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。
    3）数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。
    4）作用域不同，sessionStorage在不同的浏览器窗口中不能共享；localStorage和cookie在所有同源窗口中都是共享的；
    5）Web Storage支持事件通知机制，可以将数据更新的通知发送给监听者。
      Web Storage有更多丰富易用的api接口。
      Web Storage每个域（包括子域）有独立的存储空间，各个存储空间是完全独立的，因此不会造成数据混乱。
  注意：
   1）不允许浏览器保存cookie总数超过300个，每个web服务器保存的cookie数不超过20个，每个cookie保存的数据不超过4KB
   2）cookie需要前端开发者自己封装setCookie，getCookie；不会自动覆盖。
      Web Storage如果键名已经存在，则覆盖值

9、cookie和session有什么区别。
  1）cookie数据存放在客户的浏览器上，session数据放在服务器上。
  2）cookie不是很安全，容易发生泄漏引起网站安全问题。
  3）单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。
  4）session 的运行依赖 session id，而 session id 是存在 cookie 中的，也就是说，如果浏览器禁用了 cookie ，同时 session 也会失效
  5）session会在一定时间内保存在服务器上（可以放在文件、数据库、或内存中）。当访问增多，会比较占用服务器的性能。
  6）建议将登陆信息等重要信息存放为session中；其他信息如果需要保留，可以放在cookie中

10、Cookie跨域请求能不能带上
  不能。解决方案：
  1）原生ajax请求方式：
      var xhr = new XMLHttpRequest();  
      xhr.open("POST", "http://xxxx.com/demo/b/index.php", true);  
      xhr.withCredentials = true; //支持跨域发送cookies
      xhr.send();
  2）jquery的ajax的post方法请求：
      $.ajax({
               type: "POST",
               url: "http://xxx.com/api/test",
               dataType: 'jsonp',
               xhrFields: {
                      withCredentials: true
              },
            crossDomain: true,
           success:function(){
           },
           error:function(){
          }
      })
      服务器端设置：
      header("Access-Control-Allow-Credentials: true");
      header("Access-Control-Allow-Origin: http://www.xxx.com");

11、tcp三次握手和四次挥手过程以及他们的缺点
    三次握手：1）建立连接时，客户端A发送SYN包（SYN=j）到服务器B，并进入SYN_SEND状态，等待服务器B确认。
              2）服务器B收到SYN包，必须确认客户A的SYN（ACK=j+1），同时自己也发送一个SYN包（SYN=k），即SYN+ACK包，此时服务器B进入SYN_RECV状态。
              3）客户端A收到服务器B的SYN＋ACK包，向服务器B发送确认包ACK（ACK=k+1），此包发送完毕，客户端A和服务器B进入ESTABLISHED状态，完成三次握手。

    四次挥手：1）客户端A发送一个FIN，用来关闭客户A到服务器B的数据传送。 
              2）服务器B收到这个FIN，它发回一个ACK，确认序号为收到的序号加1。和SYN一样，一个FIN将占用一个序号。 
              3）服务器B关闭与客户端A的连接，发送一个FIN给客户端A。 
              4）客户端A发回ACK报文确认，并将确认序号设置为收到序号加1。 
    缺点：引起SYN Flood攻击
        SYN- Flood攻击是当前网络上最为常见的DDoS攻击，也是最为经典的拒绝服务攻击。
        原理：攻击者首先伪造地址对 服务器发起SYN请求，服务器回应(SYN+ACK)包，而真实的IP会认为，我没有发送请求，不作回应。
              服务器没有收到回应，这样的话，服务器不知道(SYN+ACK)是否发送成功，默认情况下会重试5次（tcp_syn_retries）。
              这样的话，对于服务器的内存，带宽都有很大的消耗。攻击者如果处于公网，可以伪造IP的话，对于服务器就很难根据
              IP来判断攻击者，给防护带来很大的困难。
        防护：1）无效连接监视释放。
              2）延缓TCB分配方法。 Syn Cache技术;Syn Cookie技术  
              3）使用SYN Proxy防火墙 

12、输入URL后发生了什么？(页面加载过程) 
  1）应用层DNS解析域名：客户端线解析本地有没有对应的IP，若找到则返回IP地址，没有则请求上级DNS服务器，直到找到或到根节点
  2）建立TCP连接（三次握手：带有SYN-SYN/ACK-ACK标志数据包在客户端和服务端传递）
  3）应用层客户端发送HTTP请求
  4）服务端响应请求：查找客户端请求资源，返回响应报文（包括状态码）
  5）服务器返回响应文件给浏览器
  6）断开TCP连接（FIN-ACK-FIN-ACK）
  7）解析HTML，渲染DOM树

13、状态码,304与200读取缓存的区别
  1**：信息性状态码
  2**：成功状态码
    200：OK 请求正常处理
    204：No Content请求处理成功，但没有资源可返回
    206：Partial Content对资源的某一部分的请求
  3**：重定向状态码
    301：Moved Permanently 永久重定向
    302：Found 临时性重定向
    304：Not Modified 资源未改变，可使用缓存
  4**：客户端错误状态码
    400：Bad Request 请求报文中存在语法错误
    401：Unauthorized需要有通过Http认证的认证信息
    403：Forbidden访问被拒绝
    404：Not Found无法找到请求资源
  5**：服务器错误状态码
    500：Internal Server Error 服务器端在执行时发生错误
    503：Service Unavailable 服务器处于超负载或者正在进行停机维护

  304是从缓存中读取资源；200是从服务器读取资源

14、强缓存和协商缓存（浏览器缓存的底层实现原理：先判断是否命中强缓存，在判断是否命中协商缓存）
  1）强缓存：浏览器在加载资源时，先根据这个资源的一些http header判断它是否命中强缓存，
     强缓存如果命中，浏览器直接从自己的缓存中读取资源，不会发请求到服务器。
  2）协商缓存：当强缓存没有命中的时候，浏览器一定会发送一个请求到服务器，通过服务器端
     依据资源的另外一些http header验证这个资源是否命中协商缓存，如果协商缓存命中，服务
     器会将这个请求返回（304），但是不会返回这个资源的数据，而是告诉客户端可以直接从
     缓存中加载这个资源，于是浏览器就又会从自己的缓存中去加载这个资源；若未命中请求，
     则将资源返回客户端，并更新本地缓存数据（200）。
  3）HTTP头信息控制缓存是通过Expires（强缓存）、Cache-control（强缓存）、
     Last-Modified/If-Modified-Since（协商缓存）、Etag/If-None-Match（协商缓存）实现

15、网络分层结构。
  （1）TCP/IP五层模型
     1）应用层：决定了向用户提供应用服务时通信的活动。包括HTTP、DNS、FTP(文件传输协议)等
     2）传输层：提供处于网络连接中的两台计算机之间的数据传输。包括TCP、UDP协议
     3）网络层：处理网络上流动的数据包。IP
     4）数据链路层：处理连接的硬件部分。
     5）物理层：物理层
     ssl在哪一层。ssl是socket，是单独的一层。如果要算应该算传输层。
  （2）OSI定义了网络互连的七层框架：
      1）应用层：位应用程序提供服务。包括HTTP，HTTPS，FTP，POP3、SMTP等。
      2）表示层：数据格式转化，数据加密
      3）会话层：建立、管理和维护会话
      4）传输层：建立、维护和管理端到端的连接。包括TCP UDP
      5）网络层：IP地址以及路由选择。IP层
      6）数据链路层：提供介质访问和链路管理
      7）物理层：物理层

16、XSS（跨站脚本攻击）与CSRF（跨站请求伪造）的原理与防范
   XSS原理：攻击者往Web页面里插入恶意html标签或者javascript代码。
   XSS防范：1）Cookie的HttpOnly属性和首部字段X-XSS-Protection  0代表将XSS过滤设置为无效状态  1代表将XSS过滤设置为有效状态
            2）代码里对用户输入的地方和变量都需要仔细检查长度和对”<”,”>”,”;”,”’”等字符做过滤；
               其次任何内容写到页面之前都必须加以encode，避免不小心把html tag 弄出来。这一个层面做好，至少可以堵住超过一半的XSS 攻击。
            3）避免直接在cookie 中泄露用户隐私，例如email、密码等等。
            4）通过使cookie 和系统ip 绑定来降低cookie 泄露后的危险。这样攻击者得到的cookie 没有实际价值，不可能拿来重放。
            5）尽量采用POST 而非GET 提交表单

   CSRF原理：让用户在不知情的情况下攻击自己已登录的一个系统，类似于钓鱼。
   CSRF防范：在客户端页面增加伪随机数。
             1）通过 referer（Http请求头）、token 或者 验证码 来检测用户提交。
             2）避免全站通用的cookie，严格设置cookie的域。
             3）尽量不要在页面的链接中暴露用户隐私信息。

   XSS与CSRF有什么区别：
      1）XSS是获取信息，不需要提前知道其他用户页面的代码和数据包。
      2）CSRF是代替用户完成指定的动作，需要知道其他用户页面的代码和数据包。
        要完成一次CSRF攻击，受害者必须依次完成两个步骤：
           1.登录受信任网站A，并在本地生成Cookie。　　2.在不退出A的情况下，访问危险网站B。

17、实现跨域的方式（域名、协议、端口号）
    1）JSONP：动态插入script标签
       var _script=document.createElement("script");
       _script.type='text/javascript';
       
       _script.onload = function() { 
          if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) { 
            callback(); 
            _script.onload= null; 
          } 
       }; 
       _script.src='';
       var head=document.getElementsByTagName('head')[0];
       head.appendChild(_script);       
    2）document.domain，通过iframe来跨子域
       // 实现
       document.domain='example.com';
       function iframeOnload(){
         console.log(document.getElementById(iframe).contentWindow);
       }
    3）window.postMessge(message，targetOrigin)
       //a.html
       function onLoad(){
          var iframe=getElementById('iframe');
          var win=iframe.contentWindow;
          win.postMessge('我是来自页面a的消息','*');
       }
       //b.html
       window.onmessage=function(e){
          e=e||event;
          alert(e.data);
       }
    4）图片ping：只能监听是否响应而已，可以用来追踪广告点击

18、http请求头有哪些,说说看你了解哪些
    1）通用首部字段：Cache-Control 控制缓存行为  connection控制管理连接
    2）请求首部字段：Accept-Econding 优先内容编码  if-Modified-Since 比较资源更新时间  Range实体字节范围要求  User-Agent 客户端信息
    3）响应首部字段：Etag 资源匹配信息  Location 零客户端重定向url
    4）实体首部字段：Content-Encoding  Content-Length Content-Range Content-Type  Last-Modified资源最后修改日期

19、HTTP协议有哪些内容
    http协议  包含  http协议的请求和http协议的响应
    http协议的请求包含：1）请求方法-URL-协议/版本；2）请求头；3）请求正文
    http响应的请求包含：1）状态行 2）响应头 3）响应正文

20、http请求头，请求体，cookie在哪个里面？url在哪里面？
    cookie和url都在请求头中

21、HTTPS相对于HTTP新增了哪些内容。
  https协议是由ssl(安全套接层)协议+http协议构建的可进行加密传输、身份认证的网络协议，比http协议安全性高的多。
  区别：
    1）https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。
    2）http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。
    3）http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
    4）http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

22、HTTPS是怎么对传输内容进行加密的。
  1）客户端发起https请求；用户在浏览器里输入一个https网址，然后连接到server的443端口。
  2）服务端配置；采用HTTPS协议的服务器必须要有一套数字证书（一对公钥和私钥），可以自己制作，也可以向组织申请，区别就是自己颁发的证书需要客户端验证通过，才可以继续访问，而使用受信任的公司申请的证书则不会弹出提示页面(startssl就是个不错的选择，有1年的免费服务)。
  3）传送证书；这个证书其实就是公钥，只是包含了很多信息，如证书的颁发机构，过期时间等等。
  4）客户端解析证书；这部分工作是有客户端的TLS来完成的，首先会验证公钥是否有效，如果发现异常，则会弹出一个警告框，提示证书存在问题。
     如果证书没有问题，那么就生成一个随机值，然后用证书对该随机值进行加密。
  5）传送加密信息；这部分传送的是用证书加密后的随机值，目的就是让服务端得到这个随机值，以后客户端和服务端的通信就可以通过这个随机值来进行加密解密了。
  6）服务端解密信息；服务端用私钥解密后，得到了客户端传过来的随机值(私钥)，然后把内容通过该值进行对称加密。
  7）传输加密后的信息，客户端解密信息

23、http2.0新特性
  1) HTTP2.0性能增强的核心：二进制分帧。
        在应用层(HTTP2.0)和传输层(TCP or UDP)之间增加一个二进制分帧层。在二进制分帧层上，HTTP 2.0 
    会将所有传输的信息分割为更小的消息和帧,并对它们采用二进制格式的编码 ，其中HTTP1.x的首部信息
    会被封装到Headers帧，而我们的request body则封装到Data帧里面。 
  2）HTTP2.0 首部压缩。首部表在 HTTP 2.0 的连接存续期内始终存在,由客户端和服务器共同渐进地更新 。
  3）所有的HTTP2.0的请求都在一个TCP链接上
  4）并行双向字节流的请求和响应。客户端和服务器可以把HTTP 消息分解为互不依赖的帧，然后乱序发送，最后再在另一端把它们重新组合起来。
  5）HTTP2.0的请求优先级。这个优先值确定着客户端和服务器处理不同的流采取不同的优先级策略
  6）HTTP2.0的服务器推送。服务器可以对一个客户端请求发送多个响应。换句话说，服务器除了对最初请求的响应外，还可以额外向客户端推送资源，而无需客户端明确地请求。

24、tcp/udp区别
  1）TCP面向连接;UDP是无连接的，即发送数据之前不需要建立连接
  2）TCP提供可靠的服务。也就是说，通过TCP连接传送的数据，无差错，不丢失，不重复，且按序到达;UDP尽最大努力交付，即不保证可靠交付
  3）TCP面向字节流，实际上是TCP把数据看成一连串无结构的字节流;UDP是面向报文的，UDP没有拥塞控制，因此网络出现拥塞不会使源主机的发送速率降低（对实时应用很有用，如IP电话，实时视频会议等）
  4）每一条TCP连接只能是点到点的;UDP支持一对一，一对多，多对一和多对多的交互通信
  5）TCP首部开销20字节;UDP的首部开销小，只有8个字节
  6）TCP的逻辑通信信道是全双工的可靠信道，UDP则是不可靠信道

25、OPTIONS请求的作用。
  HTTP请求方法并不是只有GET和POST，只是最常用的。据RFC2616标准（现行的HTTP/1.1）得知，通常有以下8种方法：OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE和CONNECT。
  OPTIONS请求的作用：
    1）获取服务器支持的HTTP请求方法；也是黑客经常使用的方法。
    2）用来检查服务器的性能。例如：AJAX进行跨域请求时的预检，需要向另外一个域名的资源发送一个HTTP OPTIONS请求头，用以判断实际发送的请求是否安全。

26、了解CDN（内容分发网络）吗。
  CDN是分布在多个不同地理位置的Web服务器，用于更加有效地向用户发布内容
  优点：缩短响应时间；提供备份、扩展存储能力和进行缓存的服务；
  缺点：响应时间受其他网站影响；无法直接控制组件服务器；
  用途：用于发布静态内容

27、浏览器如何实现图片缓存
    Cache-Control:max-age=315360000;
    禁用缓存：在img的scr属性后添加 "?tempid="+Math.random(); 这样一段字符串。

28、如何保持登录状态
    1）cookie和session都可以用来保持登录状态。
    2）也可以结合数据库，将cookie_id,username,用户保持的登陆时间,当前时间戳等存入数据库
    3）为了安全通过session保存登录状态，设置会话时间来设置时间

29、请说出三种减少页面加载时间的方法。（加载时间指感知的时间或者实际加载时间）
    1）减少http请求。通过图片地图（map,area标签）、CSS Sprites(background-position)、 内联图片（data:URL）、合并脚本和样式表
    2）使用内容分发网络
    3）使用缓存，添加expires头。 Cache-Control:max-age=315360000;
    4）压缩脚本和样式表，精简js
    5）css放头部，js放底部
    6）避免使用css表达式
    7）使用外部的js和css
    8）使用keep-Alive建立永久连接
    9）避免重定向和重复的脚本

30、网站开发的流程，像是技术选型，人员分工这一类，越详细越好。
    1）进行需求分析
    2）规划静态内容：重新确定其需求分析，并根据用户需求分析，规划出网站的内容板块草图
    3）美工设计阶段
    4）程序开发阶段：技术选型，人员分工
    5）测试和以及上线

31、写出几种 IE 6 BUG 的解决方法
  1）双边距 BUG，float 引起的，使用 display：inline
  2）3 像素问题，使用 float 引起的，使用 dislpay:inline -3px
  3）超链接 hover，点击后失效，使用正确的书写顺序link,visited,hover,active
  4）z-index 问题，给父级添加 position:relative
  5）png 图片透明失效，使用 JS 代码进行修改
  6）min-height 最小高度，使用 !important 解决
  7）select 在 IE 6 下遮盖，使用 iframe 嵌套
  8）为什么没有办法定义 1 px 左右的宽度容器？（IE 6 默认的行高造成的，使用 overflow:hidden | zoom:0.08 | line-height:1px）

32、IE 和标准下有哪些兼容性的写法？
  1） Var ev = ev || window.event
  2）document.documentElement.clientWidth || document.body.clientWidth
  3）Var target = ev.srcElement||ev.target

33、低版本浏览器不支持HTML5标签怎么解决？
  1）传统引入js包
     <!--[if IE]><script src="style/js/html5.js"></script><![endif]-->  
     js代码：
     (function(){if(!/*@cc_on!@*/0)return;var e = “abbr,article,aside,audio,canvas,datalist,details,dialog,eventsource,figure,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video”.split(’,'),i=e.length;while(i–){document.createElement(e[i])}})() 
  2）在hmtl 加入（推荐）
      /*html5 tag*/  
      <!--[if lt IE 9]>  
          <script>(function(tags){for(var i=0; i<tags.length; i++)document.createElement(tags[i]);})(["article","aside","details","figcaption","figure","footer","header","hgroup","nav","section","menu","video"]);</script>  
      <![endif]--> 

34、遇到过哪些浏览器兼容性问题
  1）现在浏览器与IE的事件流兼容问题
  2）IE5及以前浏览器不兼容trim方法
  3）不同浏览器的标签默认的外补丁和内补丁不同  CSS里 *{margin:0;padding:0;}
  4）IE中get默认使用缓存问题；设置async或改用post方法
  5）块属性标签float后，又有横行的margin情况下，在IE6显示margin比设置的大
     解决方案：在float的标签样式控制中加入 display:inline;将其转化为行内属性

35、了解navigator对象吗？
   Navigator 对象包含有关浏览器的信息。
   var appCodeName= window.navigator.appCodeName;//返回与浏览器相关的内部代码名  都为Mozilla  
   var appName=navigator.appName;//返回浏览器正式名称  均为Netscape  
   var appVersion=navigator.appVersion;//返回浏览器版本号  
   var userAgent=navigator.userAgent;//判断浏览器类型  
   var cookieEnabled=navigator.cookieEnabled;//返回浏览器是否启用cookie，true和false  
   var geolocation=navigator.geolocation;//返回地理定位信息(h5)  
   var javaEnabled=navigator.javaEnabled();//检测当前浏览器是否支持 Java，从而知道浏览器是否能显示 Java 小程序(IE,chrome返回true，firefox返回false)  
   var language=navigator.language;//返回浏览器的首选语言  
   var mimeTypes= navigator.mimeTypes;//返回浏览器支持的Mime类型  
   var msManipulationViewsEnabled= navigator.msManipulationViewsEnabled;//仅支持IE，true  
   var msMaxTouchPoints=navigator.msMaxTouchPoints;//字面意思是最大的触摸点，IE为0，其他不支持  
   var msPointerEnabled=navigator.msPointerEnabled;//IE为true，其他不支持  
   var onLine=navigator.onLine;//是否连接互联网，均返回true(未断网)  
   var platform=navigator.platform;//所在平台，返回win32  
   var plugins=navigator.plugins;//返回浏览器插件集合  
   var preference=navigator.preference;//允许一个已标识的脚本获取并设置特定的 Navigator 参数  
   var product= navigator.product;//浏览器产品名，返回gecko  
   var systemLanguage=navigator.systemLanguage;//获取系统语言，IE支持，返回zh-cn  
   var userLanguage=navigator.userLanguage;//返回操作系统的自然语言设置,IE支持，返回zh-cn  
   //方法  
   var msLaunchUri=navigator.msLaunchUri;//回调函数，未研究  
   var taintEnabled=navigator.taintEnabled;//回调函数  
   var hasOwnProperty=navigator.hasOwnProperty;//意思是是否支持属性，用法如下  
   var s=document.hasOwnProperty("ontouchstart");//电脑返回false，手机为true

36、js获取浏览器UA(User Agent 用户代理)方法
   function whatBrowser() {  
      document.Browser.Name.value=navigator.appName;  
      document.Browser.Version.value=navigator.appVersion;  
      document.Browser.Code.value=navigator.appCodeName;  
      document.Browser.Agent.value=navigator.userAgent;  
   }  


移动端：
1、移动端适配问题
  1）首先如果不设置meta viewport标签，那么移动设备上浏览器默认的宽度值为800px，980px，1024px等这些，总之是大于屏幕宽度的。这里的宽度所用的单位px都是指css中的px，它跟代表实际屏幕物理像素的px不是一回事。
  2）使用 <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">   
     来得到一个理想视口。
        width设置布局视口的宽度，为一个正整数
        initial-scale设置页面的初始缩放程度 和布局视口的宽度
        minimum-scale允许用户的最小缩放程度，为一个数字，可以带小数
        maximum-scale允许用户的最大缩放值，为一个数字，可以带小数
        user-scalable 是否允许用户进行缩放
  3）使用rem 处理尺寸，使用font-size处理字体。
      1）html  头部meta标签中的DPR <html data-dpr='3'>
      2）width,height 的 rem 
           rem：font size of the root element，那么rem是个单位，单位大小
         由根元素font-size（px）的大小决定。   
      3）根元素font-size 的 px ;  
      4）在字体的设置上，不推荐使用rem。我的做法是根据DPR(设备像素比)设置字体。
2、移动端性能优化  http://isux.tencent.com/h5-performance.html


开放性题目：
1、要是让你自己写一个js框架你会用到哪些设计模式
   观察者模式、策略模式、单例模式、享元模式
2、对前端前景的展望，以后前端会怎么发展
  单页面应用会继续火，react和vue接下来几年依然会流行，webpack和gulp这些工具也会变得更加简单，
  后端的逻辑会更多放到前端来做
3、对前端渲染和后端渲染的看法？对前后端联合渲染有了解吗？
   服务端的计算和渲染效率比较高，但是服务端渲染返回的页面就需要刷新页面，用户体验不好
4、画出盒子模型，要使谷歌浏览器的盒子模型显示得跟IE浏览器一致（让谷歌跟ie一致，不是ie跟谷歌一致），该怎么做？
  1）和标准 w3c 盒子模型不同的是：ie 盒子模型的 content 部分包含了 border 和 pading。
  2）加<!doctype html public "-//w3c//dtd xhtml 1.0 transitional//en" "http://www.w3.org/tr/xhtml1/dtd/xhtml1-transitional.dtd">
     使得ie中显示标准 w3c 盒子模型
5、博客在不同页面不同客户端的自动保存实现方式
  1）将内容定时保存在本地存储sessionStorage中，用户离开界面时提醒他“是否要保存页面内容”
  2）多个客户端打开，点击保存时提醒用户“有多个客户端同时打开，请先关闭其他客户端在进行保存”
6、前端和后端的区别和分工
    1）前端侧重于Web表现层，通过前端技术实现界面的展现及交互。后端是对业务逻辑及数据的处理
    2）但是现在把一部分逻辑处理代码放在前端，从而减轻服务器的负担。通过 node.js还可以直接与数据库进行交互
7、前后端分离的意义以及对前端工程化的理解
   前后端分离主要概念：后台只需提供API接口，前端调用AJAX实现数据呈现。
   意义：1）彻底解放前端。前端不再需要向后台提供模板或是后台在前端html中嵌入后台代码
         2）提高工作效率。分工更加明确。前后端分离的工作流程可以使前端只关注前端的事，后台只关心后台的活，两者开发可以同时进行。
         3）局部性能提升。通过前端路由的配置，我们可以实现页面的按需加载，无需一开始加载首页便加载网站的所有的资源，服务器也不再需要解析前端页面，在页面交互及用户体验上有所提升。
         4）降低维护成本。可以非常快速的定位及发现问题的所在，客户端的问题不再需要后台人员参与及调试，代码重构及可维护性增强。
8、以后的规划
    希望能通过在项目中不断的学习，了解最新的前端技术。使自己能在前端领域有一个较大的提升，
  通过技术累积，能解决大部分遇到的问题。
9、平时有什么爱好
    看书，骑车，打羽毛球
10、自身有待改进的地方
    自己处于一个前端菜鸟的位置，还有很多东西需要学习，去提升自己
    不爱运动，应该加强运动，锻炼身体，身体是革命的本钱
    内向，不太会表达自己
11、问我做了那么多项目，有没有自己的归纳总结。
        对所接触到新的技术块、项目中遇到的问题以及解决方案、业务需求技术
    案都有按项目按时间进行总结
12、项目中的难点
    1）表单中怎样处理多文件问题，文件上传窗口共用引发的删除、以及限制文件上传类型，添加图标等内容
    2）表单中二维表格怎样处理
    3）怎样实现微信免登陆以及手机端web
    4）存储过程学习
13、你之前自认为做得最好的，最具有挑战的一项需求是什么，为什么？现在回头去看，还有哪些地方可以值得优化？
    表单中采用服务端和客户端联合渲染的方式实现
    可优化地方：在表单定义过程中，可视化程度不高。项目在企业内部使用，
    有权限进行定义的用户很少，所以可以采取这种方式。但大量用户可操作的
    情况下则不适用。会改为拖动的方式进行定义，使用户体验度更好。
14、谈一谈你做过的一个项目，业务逻辑模块如何划分的？
    1）选择产品，添加到购物车
    2）确认订单信息
    3）填写个人信息和收货地址
    4）提交订单
15、平时如何学前端的，看了哪些书，关注了哪些公众号,哪些博客
    (知乎、大漠、阮一峰博客等等，最好说下对公司对应的哪些技术感兴趣)
16、百度前端学院，做了哪些题，怎样实现                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          