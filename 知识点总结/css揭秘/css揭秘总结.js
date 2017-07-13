1、半透明边框
  border+background-clip:paddinbg-box;
2、多重边框
  1）box-shadow 缺点：只能模拟实线边框、不影响布局、不相应鼠标事件
  2）outline+outline-offset  缺点：只能模拟双层边框
3、灵活的背景定位
  1）background-position
  2）background-position+background-origin
  3）calc
4、边框内圆角
  box-shadow+outline
5、条纹背景 background
   垂直条纹：linear-gradient+background-size
   斜向条纹：repeat-linear-gradient+background-size
   同色系条纹：repeat-linear-gradient+background-size+半透明条纹
6、复杂背景
   网格：background+background-size+background-image:linear-gradient()
   波点：background+background-size+background-image:radial-gradient()
   棋盘：1）css渐变  2）SVG
7、伪随机背景：
   css渐变+蝉原则
8、连续的图像边框
   1）css渐变 linear-gradient+repeat-linear-gradient 
   2）border-image：repeat-linear-gradient()
9、自适应椭圆
   border-radius:50% /100% 100% 0 0;
10、平行四边形 transform:skew()
   1）嵌套元素
   2）伪元素,将变形应用在伪元素上
11、菱形图片
   1）transform：rotate() scale();
   2）clip-path:polygon();
12、切角效果
   1）css渐变 background-size background-repeat
   2）border-image+内联SVG
   3）clip-path
13、梯形标签页
   transform:perspective() ratateX() scaleY();
14、简单的饼图
   1）css渐变+animation（此处用到了step函数）
   2）SVG的circle stroke-dashArray
15、单侧阴影
   box-shadow
16、不规则阴影
   filter：drop-shadow()
17、图片染色效果
  1）滤镜：filter:sepia() saturate() hue-rotate()
  2）混合模式：mix-blend-mode:luminosity;
               background-blend-mode:luminosity;
18、毛玻璃效果
  伪元素+filter：blur()
19、折角效果
  css渐变+transform(不同角需要计算)
20、连字符断行
   hyphen:auto;//有manual(默认) none auto
21、插入换行
   伪元素{content:'\A';white-space:pre;}
22、文本行的斑马条纹
   渐变的背景实现
23、调整Tab的宽度
   tab-size:4
24、连字
   font-variant-ligatures
25、华丽的&符号
   @font-face引入
26、自定义下划线
    1）text-decoration:underline;
    2）border-bottom
    3）css渐变
27、现实中的文字效果
    text-shadow
28、环形文字
    SVG实现
29、选择合适的鼠标
    cursor：not-allowed   cursor：none
30、扩大可点击区域
    1）透明border+background-clip   2）伪元素扩张热区
31、自定义复选框
    伪元素：content:'\2713' :checked 伪类
32、通过阴影来弱化背景
    1）新增父div  //较优
    2）伪元素方案：弹出层无法独立绑定js事件
    3）box-shadow方案
    4）::backdrop伪元素
33、通过模糊来弱化背景
    filter：blur() contrast() brightness()
34、滚动提示
    linear-gradient  radial-gradient  background-attachment:local scroll;
35、图片对比控件
    1）css resize方案  resize：horizontal;
    2）范围输入控件  <input>+js  //较优
36、自适应内部元素
    width：min-content;
37、精确控制表格列宽
    table-layout:fixed;
38、根据兄弟数量来设置样式
    伪元素  :first-child:nth-last-child(4) //四个子元素时的样式
39、满幅的背景，定宽的内容 
     1）父+子margin：auto
     2）父 padding+calc 无子
40、垂直居中
     1）已知宽高：display:absolute;margin  
     2）display:absolute;transform
     3）display:flex;justify-content:center;align-items:content;
     4）display:flex;  margin:auto;
     5）基于视口：margin：50vh auto 0;transform:transitionY(-50%);
41、紧贴底部的页脚
    基于视口单位 min-height: calc(100vh - 7em);
42、缓动效果
    1）弹跳小球 animation-time-function:cubic-bezier();
    2）弹性过渡 transition-time-function:cubic-bezier();
43、逐帧动画
    image-sprite + step()
44、闪烁效果（文字）
    animation：step()
45、打字效果
    ch单位  animation 闪烁效果
46、状态平稳的动画
    animation-play-state
47、沿环形路径平移的动画(transform-origin)
    1)添加一个父div+两层动画
    2）transform-origin只是一个语法糖，可以用translate和rotate代替
