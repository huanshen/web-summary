易错知识点：
1）width height指的是content框的宽高，ie6之前指border-box的宽高
2）background会延伸到边框所在下层（border-box），通过background-clip更改background区域（border-box,padding-box,content-box）
3）background-position默认相对于padding-box定位，通过background-origin可更改其定位方式
4）CSS中有四个基于视口单位，分别为vh、vw、vmin和vmax。
5）浏览器前缀：-wekit(Goole和safari);-o(opera);-moz(firefox);-ms(IE);
6）除了height以外垂直方向上的margin-top（bottom）或者padding-top（bottom）的百分比取值都是相对于父元素的宽度
7）行内元素的左右外（内）边距是有效的，应用于元素的开始和最后，而不会应用于各行的左右两边
8）表的行合并属性rowspan='2'，列合并属性colspan='2'
9）counter-reset，counter-increment，content，伪元素生成论文一二级标题格式
10）div添加contenteditable属性即可实现多行文本效果

1、BFC 定义
　　1）BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。
  　2）BFC布局规则：
      ① 内部的Box会在垂直方向，一个接一个地放置。
      ② Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
      ③ 每个元素的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
      ④ BFC的区域不会与float box重叠。
      ⑤ BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
      ⑥ 计算BFC的高度时，浮动元素也参与计算
    3）哪些元素会生成BFC?
      ① 根元素
      ② float属性不为none
      ③ position为absolute或fixed
      ④ display为inline-block, table-cell, table-caption, flex, inline-flex
      ⑤ overflow不为visible
    4）作用 
      两栏式布局、清除浮动、防止margin重叠等
  注意：在IFC中，盒子水平放置，一个接着一个，从包含块的顶部开始。相当于行内元素布局

2、margin的重叠问题，啥原因？怎么解决？
 1）水平边距永远不会重合。
 2）垂直边距可能在特定的框之间重合：
   * 常规流中两个或多个块框相邻的垂直边距会重合。结果的边距宽度是相邻边距宽度中较大的值。如果出现负边距，则在最大的正边距中减去绝对值最大的负边距。如果没有正边距，则从零中减去绝对值最大的负边距。
       ①两个块框之间：当两个块框上下毗邻时，两者之间的margin会塌陷并尺寸值取较大的那个外边距。   
                      当两个块级框是父子关系时，也会在垂直方向发生margin塌陷，取值依然是较大的那个。
       ②还有一种情况是，块级框自身发生collapse现象：即当垂直padding和height为零时，上下外边距会发生塌陷
   * 在一个浮动框和其它框之间的垂直边距不重合。//这句话是不够严谨，在IE浏览器下确实如此，但是Firefox等浏览器下依旧重合。
   * “绝对定位的框”与“相对定位的框”边距不重合。//这句话有待斟酌，我在Firefox等浏览器下测试，效果貌似很糟糕的。
 解决方法： 
  情况1：父子div垂直margin重叠（同向重叠）
    1）为父元素添加overflow：hidden；样式即可（完美 overflow不为visible） 
    2）为父元素或者子元素声明浮动（float：left；可用） 
    3）为父元素或者子元素声明绝对定位（absolute、fixed）
    4）设置父元素display:inline-block的元素，垂直margin不会被折叠
    5）修改父元素的高度，增加padding-top样式模拟（padding-top：1px；常用） 
    6）为父元素添加border（border:1px solid transparent可用） 
  情况2：子元素margin-bottom和margin-top重叠（同向重叠）
    1）子元素设置为float
    2）使两个元素不属于同一个BFC(在其中一个子元素下包裹一层div)

3、浮动的原理以及清除浮动的方式
 1）解决方法一：在父容器底部添加一个非浮动元素  <div style="clear:both;"></div> 
    缺点：在页面中增加冗余标签，违背了语义网的原则。
 2）解决方法二：浮动的父容器  .parent{display:float;}
    缺点：父容器变成浮动以后，会影响到后面元素的定位，而且有时候，父容器是定位死的，无法变成浮动。
 3) 解决方法三：浮动元素的自动clearing  .parent{overflow:hidden;}
    缺点：一个是IE 6不支持，另一个是一旦子元素的大小超过父容器的大小，就会出显示问题。
 4）解决方法四：通过:after伪选择符在父容器的尾部自动创建一个子元素 
    //所有现代浏览器
	.parent:before,
	.parent:after {
	　　content:"";
	　　display:block;
	}
	.parent:after {
	　　clear:both;
	}
	//兼容IE6/7(trigger hasLayout) 
	.parent {
	　　zoom:1;
	}

4、flexBox
   1）容器属性(6)：flex-direction--排列方式 flex-wrap--是否换行 flex-flow--前两个综合  justify-content--水平对齐方式（居中等） align-items--垂直对齐方式（居中等） align-content--多轴对齐方式
   2）项目属性(6)：order--排列顺序 flex-grow--放大 flex-shrink--缩小 flex-basis--length  flex--放大、缩小、length  align-self--自己的排列方式

5、css3渐变
   1）线性渐变：background: linear-gradient(direction, color-stop1, color-stop2, ...);direction:（to） top/left/right/bottom/left top/left bottom...
                background: linear-gradient(angle, color-stop1, color-stop2); 默认180deg
        例子： //颜色后面跟百分比时，background-size指定长度
                background:linear-gradient(45deg,#fb3 25%,#58a 0,#58a 50%,#fb3 0,#fb3 75%,#58a 0);
                background-size: 30px 30px;
   2）重复线性渐变 ：background:repeating-linear-gradient() 函数用于重复线性渐变;
        例子：background:repeating-linear-gradient(45deg,#fb3, #fb3 15px ,#58a 0,#58a 30px);//颜色后面跟长度(色标位置)
   3）径向渐变：background: radial-gradient(center, shape size, start-color, ..., last-color);
       center：百分比和长度指定
       shape：circle 、ellipse（默认椭圆）
       size：参数定义了渐变的大小，closest-side、farthest-side、closest-corner、farthest-corner
   4）重复的径向渐变：background:repeating-radial-gradient() 函数用于重复径向渐变：

6、css背景
  background  在一个声明中设置所有的背景属性。
  background-attachment 设置背景图像是否固定或者随着页面的其余部分滚动。
  background-color  设置元素的背景颜色。
  background-image  设置元素的背景图像。
  background-position 设置背景图像的开始位置。
  background-repeat 设置是否及如何重复背景图像。
  background-clip 规定背景的绘制区域。 
  background-origin 规定背景图片的定位区域。 
  background-size 规定背景图片的尺寸。

7、动画实现方式
  1）animation()参数：
		@keyframes	规定动画。
		animation	所有动画属性的简写属性，除了 animation-play-state 属性
		animation-name	规定 @keyframes 动画的名称。
		animation-duration	规定动画完成一个周期所花费的秒或毫秒。默认是 0。
		animation-timing-function	规定动画的速度曲线。默认是 "ease"。
		    函数有linear、ease、ease-in、ease-out、ease-in-out、cubic-bezier(n,n,n,n)
		    steps(n,start/end) 函数指定了一个阶跃函数,第二各参数默认为 end；step-start等同于steps(1,start)；step-end等同于steps(1,end)；
		animation-delay	规定动画何时开始。默认是 0。
		animation-iteration-count	规定动画被播放的次数。默认是 1。
		animation-direction	规定动画是否在下一周期逆向地播放。默认是 "normal"。	
		animation-play-state	规定动画是否正在运行或暂停。默认是 "running"。
		animation-fill-mode 规定对象动画时间之外的状态
  2）trasition
  3）window.requestAnimationFrame(callback)
  4）setTimeout和setInterval
  5）gif flash canvas webgl 

8、三栏式布局（见ife小薇task3） 
  1)flexBox布局(flex+calc)
  2)圣杯布局(float+margin 先布好中间部分，再调整两边的margin，窗口过小时效果最差)
  3)双飞翼布局-淘宝UED(float+margin 先通过子元素定位好中间部分，再调整两边的margin)
8-1、两栏式布局
  1)flexBox布局(flex+calc)
  2)float+margin
  3)float+calc

9、div水平垂直居中方式（见ife小薇task4）
   1）已知子div宽高下的绝对定位（position: absolute;margin left top）;
   2）position:absolute+transform 平移;
   3) flex布局（设置父元素的display:flex; justify-content:center;align-items:center）
   4) flex布局（设置父元素的display:flex; 子元素：margin：auto;）
   5) 基于视口单位（margin:50vh auto 0;transform:translateY(-50%);），只适用于是视口中居中场景

10、position有哪些值,说下各自的作用
     1）inherit 从父元素继承 position 属性的值。
     2）static 没有运用定位,不脱离文档流
     3）relative 相对定位，相对于其正常位置进行定位。 不脱离文档流 
     4）absolute 绝对定位，相对于父级第一个非static的元素定位。脱离文档流
     5）fixed固定定位 相对于浏览器窗口定位。脱离文档流

11、display有哪些值？说明他们的作用
     1）none 此元素不会被显示
     2）inline 内联元素
     3）block 块级元素
     4）inline-block 行内块元素
     5）flex  inline-fex flexBox布局 
     6）table 块级表格  inline-table 内联表格 
        table-row-group 类似 <tbody>。
        table-header-group 类似 <thead>。
        table-footer-group  类似 <tfoot>。
        table-row 类似 <tr>。
        table-column-group  类似 <colgroup>。
        table-column  类似 <col>
        table-cell  类似 <td> 和 <th>
        table-caption  类似 <caption>
     7）list-item 列表显示
     8）inherit 从父元素继承 display 属性的值。

12、css定义的权重及优先级算法
    1） 来源。用户定义特殊样式(!important)>开发人员定义特殊样式>开发人员定义普通样式>用户定义普通样式>浏览器默认样式
    2） 特殊性。是否有!important 
    3） 显示权重。内联样式 > id > class > tag﻿（ 内联 1000；id 0100；类 0010；各种元素和伪元素 0001）
    4） 优先级就近原则。同权重情况下样式定义最近者为准;﻿

13、垂直居中，多行文本垂直居中   
    1)table布局
      div{
        display: table-cell;
        vertical-align: middle;
      } 
    2）span标签（display:inline-block）+div居中方式

14、伪类和伪元素区别
  （1）伪类：:active :focus :hover :link :visit :first-child :lang 
    css3新增伪类：p:first-of-type 选择属于其父元素的首个 <p> 元素的<p> 元素。﻿
                  p:last-of-type 选择属于其父元素的最后 <p> 元素的<p> 元素。﻿
                  p:only-of-type 选择属于其父元素唯一的 <p> 元素的<p> 元素。﻿
                  p:nth-of-type(n) 选择属于其父元素第n个 <p> 元素的每个 <p> 元素。
                  p:nth-last-of-type(n) 同上，但是从最后一个子元素开始计数。
                  p:first-child 选择属于其父元素的第一子元素的<p> 元素。﻿
                  p:last-child 选择属于其父元素的第一子元素的<p> 元素
                  p:only-child 选择属于其父元素的唯一子元素的<p> 元素。﻿
                  p:nth-child(n) 选择属于其父元素的第n个子元素的<p> 元素。﻿
                  p:nth-last-child(n)  同上，从最后一个子元素开始计数。
                  :enabled :disabled 控制表单控件的禁用状态。﻿
                  :checked 单选框或复选框被选中。﻿
                  :root 选择文档的根元素。
                  :not(selector) 非选择器。
                  ::selection 选择被用户选取的元素部分。
                  :target  #news:target  选择当前活动的 #news 元素。
  （2）伪元素：::before ::after ::first-letter ::first-line
  （3）区别：
      1）伪类本质上是为了弥补常规CSS选择器的不足，以便获取到更多信息；
      2）伪元素本质上是创建了一个有内容的虚拟容器；
      3）CSS3中伪类和伪元素的语法不同；伪元素前面两个冒号
      4）可以同时使用多个伪类，而只能同时使用一个伪元素；

15、CSS 引入的方式有哪些?
  1）使用 link 元素链接到外部的样式文件
  2）在 head 元素中使用 style 元素来指定
  3）元素内部中使用 style 属性来定义样式
  4）使用 CSS @import 标记来导入样式表单 
  注意：@import缺点：
     a、必须放在其他规则之前，否则可能导致无法加载（白屏现象）
     b、会导致组件下载的无序性
     c、不支持Javascript控制DOM去改变样式
     d、@import不支持IE5及其以下版本  ie6-8部分功能不支持

16、link 和 @import 的区别是?
  1）老祖宗的差别。link 属于 XHTML 标签，而 @import 完全是 CSS 提供的一种方式。link 标签除了可以加载 CSS 外，还可以做很多其它的事情，比如定义 RSS，定义 REL 连接属性等，@import 就只能加载 CSS 了
  2）加载顺序的差别且@import不能保证加载顺序。当一个页面被加载的时候，link 引用的 CSS 会同时被加载，而 @import 引用的 CSS
     会等到页面全部被下载完再被加载
  3） 兼容性的差别。由于 @import 是 CSS2.1 提出的，所以老的浏览器不支持，@import 只有在 IE 5 以上的才能识别，而 link 标签无此问题
  4）使用 DOM 控制样式时的差别。当使用 JavaScript 控制 DOM 去改变样式的时候，只能使用 link 标签，因为 @import 不是 DOM 可以控制的

17、行内元素和块级元素？盒模型
  块级元素：div,p,h1,h2,h3,h4,form,ul,ol
  行内元素: a,b,br,i,span,input,select
  CSS 盒模型: content，padding，border ,margin

18、CSS + DIV 开发 Web 页面的优势有哪些？
  1）内容和样式的分离，有利于页面的维护升级。这个网页设计模式中，DIV 承担了网页的内容，CSS 承担了网页的样式。
  2）有助于提高搜索引擎亲和力（快速找到需要的数据，而不是像在 TABLE 中一层层的查找）
  3）有助于页面的重构（换皮肤如 blog，直接套用另外一套样式就可以实现，而不用改动网页脚本）

19、position 的 absolute 与 fixed 共同点与不同点﻿
  共同点：﻿
    ① 改变行内元素的呈现方式，display 被置为block；﻿
    ② 让元素脱离普通流，不占据空间；﻿
    ③ 默认会覆盖到非定位元素上﻿﻿
  不同点：﻿
    ① absolute 的“根元素”是可以设置的，而 fixed 的“根元素”固定为浏览器窗口。﻿
    ② 当你滚动网页，fixed 元素与浏览器窗口之间的距离是不变的。﻿﻿

20、CSS 选择符有哪些？哪些属性可以继承？
  CSS 选择符：﻿
    ① ID 选择器 (#myid)﻿
    ② 类选择器 (.myclassname)﻿
    ③ 标签选择器 (div, h1, p)﻿
    ④ 相邻兄弟选择器 (h1 + p)﻿
    ⑤ 兄弟选择器(p~ul)  选择前面有 <p> 元素的每个 <ul> 元素。
    ⑥ 子选择器 (ul > li)﻿
    ⑦ 后代选择器 (li a)﻿
    ⑧ 通配符选择器 ( * )﻿
    ⑨ 属性选择器 (a[rel = "external"])﻿
    ⑨ 伪类选择器 (a: hover, li:nth-child)﻿﻿
  css3新增选择器：
    :first-of-type  :last-of-type  :only-of-type  :nth-of-type(n)  :nth-last-of-type(n)  
    :first-child  :last-child  :only-child  :nth-child(n)  nth-last-child(n)  
    :not(selector) :root ::selection :target  
  可继承的样式：﻿
    ① font-size﻿  ② font-family﻿  ③ color﻿  ④ text-indent﻿﻿
  不可继承的样式：﻿
    ① border﻿  ② padding﻿  ③ margin﻿  ④ width﻿  ⑤ height﻿﻿  
    vertical-align text-decoration background-color

21、行内元素性质 
    1）和其他元素都在一行上；
    2）非替换元素不可设置width、height、margin-top和margin-bottom
    3）元素的宽度就是它包含的文字或图片的宽度，不可改变。 

22、你知道多少种 Doctype 文档类型？﻿
  ① 该标签可声明三种 DTD 类型，分别表示严格版本、过渡版本以及基于框架的 HTML 文档。﻿
  ② HTML 4.01 规定了三种文档类型：Strict、Transitional 以及 Frameset。﻿
  ③ XHTML 1.0 规定了三种 XML 文档类型：严格的Strict、过渡的Transitional 以及 框架的Frameset。﻿
  ④ Standards （标准）模式（也就是严格呈现模式）用于呈现遵循最新标准的网页，
    而 Quirks（包容）模式（也就是松散呈现模式或者兼容模式）用于呈现为传统浏览器而设计的网页。﻿﻿

23、Doctype作用? 严格模式与混杂模式-如何触发这两种模式，区分它们有何意义?
   用于声明文档使用哪种规范 (HTML/XHTML)。
   严格模式(Standards)：又称标准模式，是指浏览器按照 W3C 标准解析代码。
   混杂模式(Quirks)：又称过渡模式、怪异模式或兼容模式，是指浏览器用自己的方式解析代码。
   如何区分：浏览器解析时到底使用严格模式还是混杂模式，与网页中的 DTD 直接相关。
      1）如果文档包含严格的 DOCTYPE ，那么它一般以严格模式呈现。（严格 DTD ——严格模式） 
      2）包含过渡 DTD 和 URI 的 DOCTYPE ，也以严格模式呈现，但有过渡 DTD 而没有 URI （统一资源标识符，就是声明最后的地址）会导致页面以混杂模式呈现。（有 URI 的过渡 DTD ——严格模式；没有 URI 的过渡 DTD ——混杂模式） 
      3）DOCTYPE 不存在或形式不正确会导致文档以混杂模式呈现。（DTD不存在或者格式不正确——混杂模式）
      4）HTML5 没有 DTD ，因此也就没有严格模式与混杂模式的区别，HTML5 有相对宽松的语法，实现时，已经尽可能大的实现了向后兼容。（ HTML5 没有严格和混杂之分）
   意义：严格模式与混杂模式存在的意义与其来源密切相关，
         如果说只存在严格模式，那么许多旧网站必然受到影响，
         如果只存在混杂模式，那么会回到当时浏览器大战时的混乱，每个浏览器都有自己的解析模式。

24、XHTML 和 HTML 有什么区别?
 HTML 是一种基本的 WEB 网页设计语言，XHTML 是一个基于 XML 的置标语言
  最主要的不同：
  1）XHTML 元素必须被正确地嵌套
  2）XHTML 元素必须被关闭
  3）XHTML 标签名必须用小写字母
  5）XHTML 文档必须拥有根元素

25、css3 html5新特性
  (1)css3新特性：
    1）选择器
      :first-of-type  :last-of-type  :only-of-type  :nth-of-type(n)  :nth-last-of-type(n)  
      :first-child  :last-child  :only-child  :nth-child(n)  nth-last-child(n)  
      :not(selector) :root ::selection :target  
    2）背景、边框、文字特效、渐变
      background-size、background-origin、background-clip、multiple background
      border-radius、box-shadow、border-image
      text-shadow、word-wrap
      linear-gradient、radial-gradient、repeating-linear-gradient、repeating-radial-gradient
    3）2D/3D转换
      transform：translate rotate skew scale pespective
      transform-origin
    4）过渡和动画
      transition
      @keyframes animation 
        name、duration、timing-function、delay、iteration-count、direction、play-state、fill-mode
    5）多列布局
      column-count、column-gap(列间隔)、column-rule(列之间的宽度、样式和颜色规则)
    6）用户界面
      resize、box-sizing:content-box|border-box|inherit、outline-offset
  (2)h5新特性：
    1）用于绘画 canvas 元素。
    2）用于媒介回放的 video 和 audio 元素。
    3）本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；
       sessionStorage 的数据在浏览器关闭后自动删除。
    4）语义化标签，比如 article、footer、header、nav、section
    5）表单控件，calendar、date、time、email、url、search、range。pattern属性中直接写正则表达式
    6）新的技术webworker、websocket、Geolocation(地理定位);

26、filter的十种特效
    1）grayscale灰度       2）sepia褐色        3）saturate饱和度
    4）hue-rotate色相旋转  5）invert反色       6）opacity透明度
    7）brightness亮度      8）contrast对比度   9）blur模糊
    10）drop-shadow阴影

27、table布局
	标签：table tr thead tbody tfoot  td/th caption col colgroup
	表层：单元格、行、行组、列、列组、table
	属性：caption-side:top|bottom
	      border-collapse:collapse|separate|inherit
	      border-spacing:<length><length>?|inherit
	      empty-cells:show|hide|inherit
	      table-layout:auto|fixed|inherit
	对齐：text-align、vertical-align

28、列表
	列表标志类型：list-style-type
	列表项图像：list-style-image
	列表标志位置：list-style-postion：inside|outside|inherit
	列表样式：<list-style-type>||<list-style-image>||<list-style-postion>

29、css3一些特性总结
	transform: translate(px)平移  rotate(deg)旋转  skew(deg)拉伸 sacle(px)放缩 perspective(n)透视视图，景深
	transition:过渡
	animation @keyframes:动画（另一种动画形式：window.requestAnimationFrame(callback)）
	clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%); /*polygon多边形函数*/按多边形进行裁剪，可与动画配合使用
	box-shadow:上下偏移量 模糊值 扩张半径 颜色 内/外阴影（inset/outset）
	outline:宽度  样式 颜色 （同border参数）outline-offset
	background的线性渐变
	border-image：border-image-source——路径（可为线性渐变函数）；
	             border-image-slice 图片边框向内偏移。 
	             border-image-width 图片边框的宽度。  
	             border-image-outset 边框图像区域超出边框的量。  
	             border-image-repeat 平铺(repeated)、铺满(rounded)或拉伸(stretched)
30、input和textarea的区别
  相同:都可以使用 maxlength, minlength等限制输入
  不同:
      input:
        1)可以指定 type 为 url, email, 可以方便地检测用户输入。还是指定为 file, submit, button, checkbox, radio, datetime, color等，改变input的样式和行为。
        2)输入初始化需要用value指定属性值
        3)宽高只能通过css指定
      textarea
        1)可以输入多行文字
        2)输入值初始化需要用标签对包裹，并可以夹杂 HTML 代码，而不会被浏览器解析
        3)宽高能用 CSS 或 rows, cols 指定

31、对栅格的理解
    以规则的网格阵列来指导和规范网页中的版面布局以及信息分布，更利于代码层的开发和维护工作。

32、1像素边框问题
  由于移动端一般都会设置屏幕宽度为设备宽度，width=device-width,initial-scale=1, 而有些屏幕是2倍屏，导致在移动端上设置1px就是看上去的2px。
  解决方法：
    1）通过transform将宽度缩小一半，transform:scaleY(0.5)
    2）通过@media媒体查询，查询当前设置的屏幕倍率，统一设置transform。
    3）设置屏幕宽度为设计师的设计尺寸(一般为750)。
      <meta name="viewport" content="width=750, user-scalable=no">

33、3、元素隐藏方式
    1）display:none   2）visibility:hidden  3）background-color=color 
    4）移出视口   position:absolute left  float+margin-left  5）z-index:-1;
    
扩展知识：
 1、svg标签中 <svg width="100%" height="100%" xmlns="http:/www.w3.org/2000/svg"></svg> 兼容性IE8以上部分支持，主流现代浏览器都支持
   1) 矩形。 rect标签，其中rx ry指指定圆角；stroke：边框颜色；stroke-width：边框宽度；fill是填充颜色；stroke-dasharray是虚线描边
		例子：<rect x="20" y="20" rx="20" ry="20" width="250" height="100" style="fill:red;stroke:black;
			  stroke-width:5;opacity:0.5"/>
   2）圆形。circle标签，其中cx cy只圆心所在位置，r是半径。其他同矩形
        例子：<circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red"/>
   3）椭圆形。ellipse标签，其中cx cy只椭圆心所在位置，rx ry是水平和垂直半径。其他同矩形    
        例子：<ellipse cx="300" cy="150" rx="200" ry="80" style=
        "fill:rgb(200,100,50);stroke:rgb(0,0,100);stroke-width:2"/>
   4）线条。line标签，其中x1 y1只起点位置，x2 y2是终点位置。其他同矩形  
        例子：<line x1="0" y1="0" x2="300" y2="300" style="stroke:rgb(99,99,99);stroke-width:2"/>
   5）多边形。polygon标签，其中points多边形顶点集合。其他同矩形  
        例子：<polygon points="220,100 300,210 170,250" style="fill:#cccccc; stroke:#000000;stroke-width:1"/>
   6）折线。polyline标签，其中points多边形顶点集合。其他同矩形  
        例子：<polyline points="0,0 0,20 20,20 20,40 40,40 40,60" style="fill:white;stroke:red;stroke-width:2"/>
   7）路径。 path标签。其中d中命令参数+坐标。
        命令参数含义：
      		M = moveto;L = lineto;H = horizontal lineto;V = vertical linetoC = curveto;
      		S = smooth curveto;Q = quadratic Belzier curve;T = smooth quadratic Belzier curveto;
      		A = elliptical Arc;Z = closepath
        例子：<path d="M250 150 L150 350 L350 350 Z" />
  8）高斯滤镜效果,相当于css中shadow效果
       例子:<defs>
  			   <filter id="Gaussian_Blur">
  			      <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
  			   </filter>
  			</defs>
  			<ellipse cx="200" cy="150" rx="70" ry="40" style="fill:#ff0000;stroke:#000000;stroke-width:2;filter:url(#Gaussian_Blur)"/>
    	 代码解释：
    		<filter> 标签的 id 属性可为滤镜定义一个唯一的名称（同一滤镜可被文档中的多个元素使用）
    		filter:url 属性用来把元素链接到滤镜。当链接滤镜 id 时，必须使用 # 字符
    		滤镜效果是通过 <feGaussianBlur> 标签进行定义的。fe 后缀可用于所有的滤镜
    		<feGaussianBlur> 标签的 stdDeviation 属性可定义模糊的程度
    		in="SourceGraphic" 这个部分定义了由整个图像创建效果
  9）线性渐变效果，相当于css中linear-gradient效果
       例子:<defs>
  				<linearGradient id="orange_red" x1="0%" y1="0%" x2="100%" y2="0%">
  					<stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1"/>
  					<stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1"/>
  				</linearGradient>
  			</defs>
  			<ellipse cx="200" cy="150" rx="70" ry="40" style="fill:#ff0000;stroke:#000000;stroke-width:2;filter:url(#orange_red)"/>
    	 代码解释：
    		<linearGradient> 标签的 id 属性可为渐变定义一个唯一的名称
    		fill:url(#orange_red) 属性把 ellipse 元素链接到此渐变
    		<linearGradient> 标签的 x1、x2、y1、y2 属性可定义渐变的开始和结束位置
    		渐变的颜色范围可由两种或多种颜色组成。每种颜色通过一个 <stop> 标签来规定。offset 属性用来定义渐变的开始和结束位置。
  10）放射渐变效果，相当于css中radial-gradient效果
       例子： <defs>
  				<radialGradient id="grey_blue" cx="50%" cy="50%" r="50%"
  				fx="50%" fy="50%">
  					<stop offset="0%" style="stop-color:rgb(200,200,200);stop-opacity:0"/>
  					<stop offset="100%" style="stop-color:rgb(0,0,255);	stop-opacity:1"/>
  				</radialGradient>
  			</defs>
  			<ellipse cx="200" cy="150" rx="70" ry="40" style="fill:#ff0000;stroke:#000000;stroke-width:2;filter:url(#grey_blue)"/>
    	 代码解释：
    		<radialGradient> 标签的 id 属性可为渐变定义一个唯一的名称，
    		fill:url(#grey_blue) 属性把 ellipse 元素链接到此渐变，cx、cy 和 r 属性定义外圈，而 fx 和 fy 定义内圈 
    		渐变的颜色范围可由两种或多种颜色组成。每种颜色通过一个 <stop> 标签来规定。offset 属性用来定义渐变的开始和结束位置。
2、说说你对 SVG 理解?
      意为可缩放矢量图形，使用 XML 格式定义图像。svg的出现让很多图形的定义变得简单，
  它包括基本图形样式，例如rect、circle、ellipse、line、polygon、polyline、path。
  以及滤镜和渐变效果

