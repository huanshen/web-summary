介绍一下webpack和gulp，以及项目中具体的使用
实现gulp的功能
用过哪些框架,看过哪些框架的源码

1、对前端路由的理解？前后端路由的区别？（单页应用，如何实现其路由功能）
  1）实现方式不同
    前端路由的实现由两种方式：
      一是通过改变hash值，监听onhashchange事件，这种方式的优点是可以兼容低版本浏览器
      二是通过historyAPI,监听popState事件，用pushState和replaceState来实现
    后端路由改变URL
  2）刷新界面方面。后端路由意味着浏览器刷新页面,前端路由就不会有这样的问题了。
  3）性能方面。后端路由每次访问一个新页面的时候都要向服务器发送请求，然后服务器再响应请求，这个过程肯定会有延迟。
  而前端路由在访问一个新页面的时候仅仅是变换了一下路径而已，没有了网络延迟，对于用户体验来说会有相当大的提升

2、说下你所理解的MVC、MVP和MVVM。设计模式：http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html
  1）MVC 模型－视图－控制器（Model-View-Controller）
    1）Model管理应用的数据。当model数据发生改变的时候，会通知它的监听者（可能是view），收到通知后，监听者会做相应的变化。
    2）View是当前状态的model的视觉展现，view会观察模型的变化，当模型改变的时候被通知，同时允许view来更新自己。
    3）Controller用于处理用户交互部分。通常负责从视图中读取数据，控制用户输入，并向model发送数据。
    缺点：1）MVC三大组件的定义比较模糊。
          2）View与Model的紧密耦合。
  2）MVP （Model － View －Presenter ）
    1）View 与 Model 不发生联系，都通过 Presenter 传递。
    2）Presenter和View是没有直接关联的，是通过定义好的接口进行交互，从而使得在变更
       View的时候可以保持Presenter不变。
  3）MVVM （Model － View －ViewModel ）
    1）Model代表特定领域的数据或者应用所需的数据，Model仅仅关注数据信息，不关心任何行为；
    2）ViewModel是一个专门用于数据转换的Controller,它可以把Model中的信息转换为View中的信息，同时从View传递命令给Model;
    3）View层，它的任务就是从ViewModel层获取数据，然后显示。
    4）Model和View永远不能相互通信，只能通过ViewModel传递。
    5）与MVP区别：ViewModel和View采用双向绑定（data-binding）：View的变动，自动反映在 ViewModel

3、vue的特点？
  Vue.js通过简单的API（应用程序编程接口）提供高效的数据绑定和灵活的组件系统。
  Vue.js的特性如下： 1.轻量级的框架；2.双向数据绑定；3.指令；4.插件化

3-1、vue中双向数据绑定是怎样实现的
  1）Object.defineProperty 把这些属性全部转为 getter/setter。
  2）当依赖项的 setter 被调用时，会遍历_subs（watchers组成的集合）中的watcher重新计算
  3）watcher的ctx是drective时，调用cb重新渲染界面；watcher的ctx是vue时，调用回调函数cb
  或者：
  1）把一个普通 JavaScript 对象传给 Vue 实例的 data 选项，Vue 将遍历此对象所有的属性，并使用 
     Object.defineProperty 把这些属性全部转为 getter/setter。
  2）每个组件实例都有相应的 watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当
     依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。
  
4、angularjs中双向数据绑定是怎样实现的
   $scope.$watch( watchExp, listener);
  1）$watch():遇到{{xxx}}这样的插值语法或ng-命令会自动绑定
  2）事件监听函数会触发$digest循环，$digest依次遍历绑定的$$watcher数组
  3）当一个控制器/指令等在AngularJS中运行时，会触发$apply手动的告诉了angular的内部我们对这个
     数据进行了更改
  或者：
  1）每次你绑定一些东西到你的UI上时你就会往$watch队列里插入一条$watch
  2）事件监听函数会触发$digest循环，digest将会遍历我们的digest将会遍历我们的 watch。
     所谓的dirty-checking。既然所有的$watch都检查完了，那就要问了：有没有$watch更新过？
     如果有至少一个更新过，这个循环就会再次触发，直到所有的$watch都没有变化。这样就能够保证
     每个model都已经不会再变化。记住如果循环超过10次的话，它将会抛出一个异常，防止无限循环。
     当$digest循环结束时，DOM相应地变化。

5、Vue计算属性computed与methods区别：
  不同的是计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。
  这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算
  结果，而不必再次执行函数。

6、v-if 和v-show区别
  1）v-if 是“真正的”条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
  2）v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
  3）v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
      一般来说， v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，
  则使用 v-show 较好；如果在运行时条件不太可能改变，则使用 v-if 较好。

7、说下你所了解的vuex
  Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的
       状态，并以相应的规则保证状态以一种可预测的方式发生变化
  如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。
  Vuex的核心是：1）state:作为一个唯一数据源存在。store.state.xx 
                2）getters:处理从 store 中的 state 中派生出一些状态。store.getters.xx 
                3）mutations:更改store中的状态的唯一方法是提交mutation。store.commit('increment',argsObj)
                4）actions:提交的是 mutation，而不是直接变更状态；可以包含任意异步操作。store.dispatch('increment')
                5）modules:将 store 分割成模块（module）。每个模块拥有自己的 state、getter、mutation、action、甚至是嵌套子模块

8、react与vue比较
  相同：1）使用 Virtual DOM
        2）提供了响应式（Reactive）和组件化（Composable）的视图组件。
        3）将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库。
  不同：1）性能方面。React 和 Vue 在大部分常见场景下都能提供近似的性能。通常 Vue 会有少量优势。
           a）在 React 应用中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。
              在 Vue 应用中，组件的依赖是在渲染过程中自动追踪的，所以系统能精确知晓哪个组件确实需要被重渲染。
           b）在开发中，Vue 每秒最高处理 10 帧，而 React 每秒最高处理不到 1 帧。因为React 有大量的检查机制
        2）HTML&CSS方面。在 React 中，一切都是 JavaScript。
           a）React 应用中使用JSX；Vue中不仅可以使用 JSX，还可以使用Templates。
           b）除非你把组件分布在多个文件上(例如 CSS Modules)，要不在 React 中作用域内的 CSS 就会产生警告，
              而 Vue 可以让你在每个单文件组件中完全访问 CSS。
        3）规模。React适合大型应用。Vue适合小型应用。

9、angular1与vue比较
  1）复杂性。在 API 与设计两方面上 Vue.js 都比 Angular 1 简单得多，因此你可以快速地掌握它的全部特性并投入开发。
  2）灵活性和模块化。Vue.js 是一个更加灵活开放的解决方案。
  3）数据绑定。Angular 1 使用双向绑定。Vue 在不同组件间强制使用单向数据流，这使应用中的数据流更加清晰易懂。
  4）指令与组件。在 Vue 中指令和组件分得更清晰。指令只封装 DOM 操作，而组件代表一个自给自足的独立单元 —— 有自己的视图和数据逻辑。在 Angular 中两者有不少相混的地方
  5）性能。Vue 有更好的性能，并且非常非常容易优化，因为它不使用脏检查。

9-1、Angular2与vue比较  
  1）TypeScript。Angular 事实上必须用 TypeScript 来开发，因为它的文档和学习资源几乎全部是面向 TS 的。
  2）Vue 相比于 Angular 更加灵活，且体积相对小些。
  3）Angular 针对大型的复杂应用，本身较复杂度，学习曲线非常陡峭；

10、Less和Sass异同
  相同：1）混合（Mixins）：class中的class;
        2）参数混合（Parametric）：可以像函数一样传递参数的class;
        3）嵌套规则（Nested Rules）：class中嵌套class，从而减少重复的代码；
        4）运算（Operations）：css中的数学计算；
        5）颜色功能（Color function）：可以编辑你的颜色；
        6）命名空间（Namespaces）：样式分组，从而方便被调用；
        7）作用域（Scope）：局部修改样式；
        8）JavaScript表达式(Javascript evaluation)：在CSS样式中使用Javascript表达式赋值。
  区别:
  1）环境不同。LESS是基于JavaScript运行,所以LESS是在客户端处理;Sass是基于Ruby的，是在服务器端处理的。
  2）变量区别。LESS使用@，而Sass使用$。
  3）对混合的处理方式。Less样式规则与普通样式生命相同，直接调用；
                       Sass样式规则前加@minix 声明，通过@include 来调用它。
      less:.border {
              border-top: 1px dotted #333;
            }

            article.post {
              background: #eee;
              .border;
            }
      sass: @mixin border {
              border-top: 1px dotted #333;
            }

            article.post {
              background: #eee;
              @include border;
            }               
  4）Sass在数字上要比LESS更专业,他已经可以直接换算单位了。
    /* Sass */   2in + 3cm + 2pc = 3.514in
    /* LESS */   2in + 3cm + 2pc = Error
  5）Sass有更多的颜色函数选择，但是常用的只有lighten和darken函数功能，两者都支持
  6）控制指令。Sass支持if{}else{}这样的条件语句，以及for{}循环语句，他甚至还支持and、or和not，以及<、>、<=、>=和==等操作符。
  7）LESS并没有输出设置，而Sass提供4中输出选项：nested, expanded, compact和compressed 。
总之，LESS环境较Sass简单；从功能出发，Sass较LESS略强大一些

11、Vue虚拟DOM原理。
       将Html中Dom节点表示成javascript的对象，就称为虚拟DOM。解析HTML中DOM节点存入一个对象中
    或者根据一个节点对象在html中创建新的节点
    优点：
      1）更新虚拟DOM的开销小，可以提高性能。
      2）带来了更多的功能。例如Render函数创建新节点
    缺点：实现需要更多的代码，占用更多的内存来存储节点。不适用于单独的、稀少的更新。

12、vue如何实现父子组件通信，以及非父子组件通信
  1）父子组件通信：父组件通过props向下传递数据给子组件，子组件通过events向父组件发送消息
      子组件向父组件通信例子：
        子组件:
          <template>
              <div @click="up"></div>
          </template>
          methods: {
              up() {
                  this.$emit('upup','hehe'); //主动触发upup方法，'hehe'为向父组件传递的数据
              }
          }
        父组件:
          <div>
              <child @upup="change" :msg="msg"></child> //监听子组件触发的upup事件,然后调用change方法
          </div>
          methods: {
              change(msg) {
                  this.msg = msg;
              }
          }
  2）非父子组件通信：通过eventHub来实现通信。
      所谓eventHub就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件。
      let Hub = new Vue(); //创建事件中心
      组件1触发：
        <div @click="eve"></div>
        methods: {
            eve() {
                Hub.$emit('change','hehe'); //Hub触发事件
            }
        }
      组件2接收:
        <div></div>
        created() {
            Hub.$on('change', () => { //Hub接收事件
                this.msg = 'hehe';
            });
        }
13、单向数据流动原理。
    1）Vue 在不同组件间强制使用单向数据流，这使应用中的数据流更加清晰易懂。
    2）在Vue中，向其他的实例传递数据的话需要使用到props，而props传入的值为布尔类型，
  数值类型或是字符类型等的话，在主数据中显示的依旧是起先传入的值。但是，如果传入的
  是引用类型的话，那么主数据就会随着你这个实例中的值改变而改变。
    3）prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是
  为了防止子组件无意修改了父组件的状态——这会让应用的数据流难以理解。另外，每次父
  组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 
  prop。如果你这么做了，Vue 会在控制台给出警告。

14、你对组件的理解
    组件 (Component) 是 Vue.js 最强大的功能之一。
    1）组件可以扩展 HTML 元素，封装可重用的代码。
    2）组件是自定义元素，Vue.js 的编译器为它添加特殊功能。
    3）组件也可以是原生 HTML 元素的形式，以 is 特性扩展（动态组件）

15、组件的html怎么进行管理
16、组件接口设计（设计一个表单组）-基于vue

17、mysql与 MongoDB的区别
  1）数据库模型：mysql是关系型；MongoDB是非关系型
  2）存储方式：mysql根据引擎的不同有不同的存储方式；MongoDB是虚拟内存+持久化
  3）查询语句：mysql是传统的sql语句；MongoDB有自己独特的查询方式
  4）数据处理方式：mysql不同引擎不同的特点；MongoDB基于内存，将数据存在物理内存中，从而达到高速读写
  5）MongoDB成熟度和广泛度比不上mysql

18、nodejs中的文件怎么读写
  1）fs.readSync(fd,buffer,offset,length,position)
  2）fs.writeSync(fd,buffer,offset,length,position)

19、nodejs的架构、优缺点、回调
  架构：常用express
  优点：1）单线程。node并没有创建一个线程的能力，所有代码都是单线程的，但他的宿主
           对象不是单线程，他会维护一个执行队列，循环检测并调度javascript线程来执行。
        2）事件轮询机制实现并行操作：可以在不增加额外线程的情况下，依然对任务进行并行处理，。
        3）非阻塞I/O，适合I/O密集型应用
        4）基于V8虚拟机
        5）采用事件驱动模型
  缺点：1）不适合CPU密集型应用；CPU密集型应用给Node带来的挑战主要是：由于JavaScript
           单线程的原因，如果有长时间运行的计算（比如大循环），将会导致CPU时间片不
           能释放，使得后续I/O无法发起；
           解决方案：分解大型运算任务为多个小任务，使得运算能够适时释放，不阻塞I/O
                    调用的发起；
        2）只支持单核CPU，不能充分利用CPU
        3）可靠性低，一旦代码某个环节崩溃，整个系统都崩溃
            原因：单进程，单线程
            解决方案：（1）Nnigx反向代理，负载均衡，开多个进程，绑定多个端口；
                      （2）开多个进程监听同一个端口，使用cluster模块；
        4）开源组件库质量参差不齐，更新快，向下不兼容
        5）Debug不方便，错误没有stack trace
  回调：是接受异步调用返回数据的最好方式

20、介绍 node.js，并且介绍你用它做的项目
  1）Node.js是一个基于chrome JavaScript运行时建立的平台，用于方便的搭建响应速度快、
     易于扩展的网络应用。
  2）Node.js框架使用事件驱动、非阻塞I/O模型而得以轻量和高效，非常适合在分布式设备
     上进行数据密集型的实时应用。
  3）Node.js实际上是一个js的运行环境，对Google V8引擎进行了封装，因为V8引擎执行js
     速度快、性能好。
  特点：1）它是一个Javascript运行环境
        2）依赖于Chrome V8引擎进行代码解释
        3）事件驱动
        4）非阻塞I/O模型
        5）轻量、可伸缩，适于实时数据交互应用
        6）单进程，单线程
21、node.js的适用场景和不适用的场景
（1）适用场景：
    1）RESTful API
        这是NodeJS最理想的应用场景，可以处理数万条连接，本身没有太多的逻辑，只
      需要请求API，组织数据进行返回即可。
    2）统一Web应用的UI层
          前后端的依赖分离。将所有的关键业务逻辑都封装成REST调用，前端只需要考
      虑如何用这些REST接口构建具体的应用。那些后端程序员们根本不操心具体数据的
      处理形式。
    3）大量Ajax请求的应用
        例如个性化应用，每个用户看到的页面都不一样，缓存失效，需要在页面加载的
      时候发起Ajax请求，NodeJS能响应大量的并发请求。　　
    总而言之，NodeJS适合运用在高并发、I/O密集、少量业务逻辑的场景。
（2）不适用的场景：
    1）实时性要求很高的场景
    2）计算密集型系统，基本都用c语言
    3）单一进程控制大内存场景。由于V8内存限制。32-bit下1G最大内存，64-bit下1.7G最大内存
22、webpack与gulp的区别
    gulp(前端开发的工作流程)是工具链、构建工具，可以配合各种插件做js压缩，css压缩，less编译替代
  手工实现自动化工作
      1.构建工具  2.自动化  3.提高效率用
    webpack(前端模块化方案)是文件打包工具，可以把项目的各种js文、css文件等打包合并成一个或多个
  文件，主要用于模块化方案，预编译模块的方案
      1.打包工具  2.模块化识别  3.编译模块代码方案用
23、webpack怎样配置
  var webpack = require('webpack');
  moudle.exports = {
      //配置入口文件，入口文件可以以对象的形式配置，也可以以数组的形式配置,后缀名可以省略
      /*
       * 对象形式配置入口
       * */
      //entry:{
      //    index:'./index'       //'./index.js'
      //},
      /*
       * 数组形式配置入口
       * */
      entry: [
          './index'       //'index.js'
      ],
      //输出文件出口
      output: {
          /*
           输出路径，在这我们要手动创建一个文件夹，名字可以自己命名，
           输出的文件路径是相对于本文件的路径
           * */
          path: './dist',  //输出路径
          filename: '[name].bundle.js'     //输出文件名，文件可以自己定义，[name]的意思是与入口文件的文件对应，可以不用[name]，
      },
      /*
       * 标题：加载器（loaders）
       * 作用：需要下载不同别的加载器，如css，js，png等等
       * */
      loaders: [
          {test: /\.js?$/, loaders: ['babel-loader']} //babel加载器可以把jsx的语法转换为js的语法，也可以把es6的语法标准转换es5的语法标准
          /*
           * 你可以在这配置别的加载器，写法是一样的
           * */
   
      ],
      /*
       *
       * */
      resolve: {
          /*
           * 别名配置，配置之后，可以在别的js文件中直接使用require('d3')，将导入的文件作为一个模块导入到你需要的项目中，不用配置别也可会当作模块导入项目中，只是你要重复写路径而已。
           * */
          alias: {
              'd3': 'd3/d3.min.js'
          }
      }　　
  }
