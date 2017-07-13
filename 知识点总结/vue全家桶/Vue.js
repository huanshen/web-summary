一、Vue基础
1、常用命令
	{{}}   v-bind:title="message"(缩写：)  v-if='someVar'   v-for="todo in todos" @click="reverseMessage"(缩写@)
	v-model="message" 实现表单输入和应用状态之间的双向绑定
2、组件
	// 定义名为 todo-item 的新组件
	Vue.component('todo-item', {
	  template: '<li>这是个待办项</li>'
	})

	<ol>
	  <!-- 创建一个 todo-item 组件的实例 -->
	  <todo-item></todo-item>
	</ol>
3、	Vue构造器
	var vm = new Vue({
		el:'example'
	  // 选项
	})
	扩展构造器
	var MyComponent = Vue.extend({
	  // 扩展选项
	})
	// 所有的 `MyComponent` 实例都将以预定义的扩展选项被创建
	var myComponentInstance = new MyComponent()
	属性和方法
	vm.a === data.a // -> true
	vm.$data === data // -> true
	vm.$el === document.getElementById('example') // -> true
	// $watch 是一个实例方法
	vm.$watch('a', function (newVal, oldVal) {
	  // 这个回调将在 `vm.a`  改变后调用
	})
4、模板语法
   <span>Message: {{ msg }}</span> //纯文本
   <div v-html="rawHtml"></div>//纯html
   <div v-bind:id="dynamicId"></div>//绑定属性用v-bind
   {{ number + 1 }}//表达式形式
   <form v-on:submit.prevent="onSubmit"></form>//.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()

   filters过滤器设计目的就是用于文本转换。为了在其他指令中实现更复杂的数据变换，你应该使用计算属性。
5、计算属性
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
  计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：
  computed: {
	  fullName: {
	    // getter
	    get: function () {
	      return this.firstName + ' ' + this.lastName
	    },
	    // setter
	    set: function (newValue) {
	      var names = newValue.split(' ')
	      this.firstName = names[0]
	      this.lastName = names[names.length - 1]
	    }
	  }
  }
6、Class与Style绑定
  <div v-bind:class="{active:isActive}"></div>//动态切换Class
  <div v-bind:class="classObject"></div>//直接绑定数据里的一个对象
  <div v-bind:class="[activeClass, errorClass]">//数组语法

  <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>//内联样式
  <div v-bind:style="styleObject"></div>//直接绑定数据里的一个对象
  <div v-bind:style="[baseStyles, overridingStyles]">//数组语法
  注意：1）当 v-bind:style 使用需要特定前缀的 CSS 属性时，如 transform ，Vue.js 会自动侦测并添加相应的前缀。
        2）多重值：<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">
        3）v-bind 参数值被当作 JavaScript 表达式计算：
7、条件渲染
	1）v-if v-else-if v-else
	   例如：
		 <template v-if="loginType === 'username'">
		  <label>Username</label>//label不会被重新渲染
		  <input placeholder="Enter your username" key="username-input">//加key输入框都将被重新渲染
		</template>
		<template v-else>
		  <label>Email</label>
		  <input placeholder="Enter your email address" key="email-input">//加key输入框都将被重新渲染
		</template>
	2）v-show 的元素始终会被渲染并保留在 DOM 中。v-show 是简单地切换元素的 CSS 属性 display
8、列表渲染
	v-for
	1）(item, index) 
		<ul id="example-2">
		  <li v-for="(item, index) in items">
		    {{ parentMessage }} - {{ index }} - {{ item.message }}
		  </li>
		</ul>
	2）(value, key, index)
		<div v-for="(value, key, index) in object">
	    {{ index }}. {{ key }} : {{ value }}
	  </div>
    3）整数迭代
	  <div>
	     <span v-for="n in 10">{{ n }}</span>
	  </div>
	注意：1）当它们处于同一节点， v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。
	      2）建议尽可能使用 v-for 来提供 key ，除非迭代 DOM 内容足够简单，或者你是故意要依赖于默认行为来获得性能提升。
	      3）数组变异的方法：push()pop()shift()unshift()splice()sort()reverse()
9、修饰符
  1）事件修饰符
     .stop      --阻止单击事件冒泡
	 .prevent   --阻止默认事件
	 .capture   --使用事件捕获模式
	 .self      --只当事件在该元素本身（而不是子元素）触发时触发回调 
	 .once      --只执行一次
  2）按键修饰符
	 .enter .tab .delete (捕获 “删除” 和 “退格” 键) .esc .space
	 .up .down .left .right  .ctrl .alt .shift .meta
  3）表单修饰符与表单控件绑定（v-model）
     .lazy    --在 "change" 而不是 "input" 事件中更新
     .number  --自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值）
     .trim    --自动过滤用户输入的首尾空格
10、组件
    1）先注册后使用
		<div id="example">
		  <my-component></my-component>
		</div>
        // 注册全局组件
		Vue.component('my-component', {
		  template: '<div>A custom component!</div>'
		})
		// 创建根实例
		new Vue({
		  el: '#example'
		})
	2）注册局部组件
	    var Child = {
		  template: '<div>A custom component!</div>'
		}
		new Vue({
		  // ...
		  components: {
		    // <my-component> 将只在父模板可用
		    'my-component': Child
		  }
		})
	3）当子元素限制类型时--使用is
		<table>
		  <tr is="my-row"></tr>//使用is
		</table>
	4）组件中的data必须是函数
		Vue.component('simple-counter', {
		  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
		  // 技术上 data 的确是一个函数了，因此 Vue 不会警告，
		  // 但是我们返回给每个组件的实例的却引用了同一个data对象
		  data: function () {
		    return {
			    counter: 0
			  }
		  }
		})
	5）父组件通过 props 向下传递数据给子组件，子组件通过 events 给父组件发送消息
11、使用prop传递数据
	1）camelCase vs kebab-case
	    Vue.component('child', {
			props: ['myMessage'],// camelCase in JavaScript
			template: '<span>{{ myMessage }}</span>'
		})
		<child my-message="hello!"></child>  <!-- kebab-case in HTML -->
	2)动态prop
		<div>
		  <input v-model="parentMsg">
		  <br>
		  <child :my-message="parentMsg"></child>
		</div>
	3)<comp some-prop="1"></comp>//字面量语法 字符串'1'
	  <comp :some-prop="1"></comp>//动态语法 数字1
	4）单向数据流：prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来
	   注意：不应该在子组件内部改变 prop 
	   解决方案：1）定义一个局部变量，并用 prop 的值初始化它：
	                props: ['initialCounter'],
					data: function () {
					  return { counter: this.initialCounter }
					}
				 2）使用计算属性
				    props: ['size'],
					computed: {
					  normalizedSize: function () {
					    return this.size.trim().toLowerCase()
					  }
					}
	5）props 指定验证规格
	  Vue.component('example', {
		  props: {
		    // 基础类型检测 （`null` 意思是任何类型都可以）
		    propA: Number,
		    // 多种类型
		    propB: [String, Number],
		    // 必传且是字符串
		    propC: {
		      type: String,//String,Number,Boolean,Function,Object,Array
		      required: true
		    },
		    // 数字，有默认值
		    propD: {
		      type: Number,
		      default: 100
		    },
		    // 数组／对象的默认值应当由一个工厂函数返回
		    propE: {
		      type: Object,
		      default: function () {
		        return { message: 'hello' }
		      }
		    },
		    // 自定义验证函数
		    propF: {
		      validator: function (value) {
		        return value > 10
		      }
		    }
		  }
		})
12、自定义事件
    1）事件接口
	    用 $on(eventName) 监听事件
		使用 $emit(eventName) 触发事件
	.native绑定原生事件
	.sync 对 prop 双向绑定
13、slot分发
    1）作用域
       父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。
       常见错误：在父组件模板内将一个指令绑定到子组件的属性/方法：
       <!-- 无效 someChildProperty为子组件属性-->
       <child-component v-show="someChildProperty"></child-component>
       //正确
       Vue.component('child-component', {
		  // 有效，因为是在正确的作用域内
		  template: '<div v-show="someChildProperty">Child</div>',
		  data: function () {
		    return {
		      someChildProperty: true
		    }
		  }
		})
	2）slot
	   1)除非子组件模板包含至少一个 <slot> 插口，否则父组件的内容将会被丢弃。当子组件模板只有一个
	   没有属性的 slot 时，父组件整个内容片段将插入到 slot 所在的 DOM 位置，并替换掉 slot 标签本身。
           //子组件
		   <div>
			  <h2>我是子组件的标题</h2>
			  <slot>
			    只有在没有要分发的内容时才会显示。
			  </slot>
			</div>

			//父组件模板：
			<div>
			  <h1>我是父组件的标题</h1>
			  <my-component>
			    <p>这是一些初始内容</p>
			    <p>这是更多的初始内容</p>
			  </my-component>
			</div>

			//渲染结果：
			<div>
			  <h1>我是父组件的标题</h1>
			  <div>
			    <h2>我是子组件的标题</h2>
			    <p>这是一些初始内容</p>
			    <p>这是更多的初始内容</p>
			  </div>
			</div>
	    2)<slot> 元素可以用一个特殊的属性 name 来配置如何分发内容。
	        //子组件 
	        <div class="container">
			  <header>
			    <slot name="header"></slot>
			  </header>
			  <main>
			    <slot></slot>
			  </main>
			  <footer>
			    <slot name="footer"></slot>
			  </footer>
			</div>

			//父组件模版：
			<app-layout>
			  <h1 slot="header">这里可能是一个页面标题</h1>
			  <p>主要内容的一个段落。</p>
			  <p>另一个主要段落。</p>
			  <p slot="footer">这里有一些联系信息</p>
			</app-layout>

			//渲染结果为：
			<div class="container">
			  <header>
			    <h1>这里可能是一个页面标题</h1>
			  </header>
			  <main>
			    <p>主要内容的一个段落。</p>
			    <p>另一个主要段落。</p>
			  </main>
			  <footer>
			    <p>这里有一些联系信息</p>
			  </footer>
			</div>
	3)作用域插槽:能够传递数据到插槽，而父级是作用域插槽的模板。是子到父的传递
	    //子组件将数据传递到插槽
	    <div class="child">
		  <slot text="hello from child"></slot>//子
		</div>

		//在父级中，具有特殊属性 scope 的 <template> 元素，表示它是作用域插槽的模板。scope 的值对应一个临时变量名，此变量接收从子组件中传递的 prop 对象：
		<div class="parent">
		  <child>
		    <template scope="props">
		      <span>hello from parent</span>
		      <span>{{ props.text }}</span>//父获取子的text属性
		    </template>
		  </child>
		</div>

		//如果我们渲染以上结果，得到的输出会是：
		<div class="parent">
		  <div class="child">
		    <span>hello from parent</span>
		    <span>hello from child</span>
		  </div>
		</div>
	4)动态组件：通过使用保留的 <component> 元素，动态地绑定到它的 is 特性
        <component v-bind:is="currentView">
		   <!-- 组件在 vm.currentview 变化时改变！ -->
	    </component>

	    var Home = {
		  template: '<p>Welcome home!</p>'
		}
		var vm = new Vue({
		  el: '#example',
		  data: {
		    currentView: Home
		  }
		})
14、keep-alive：把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染
    <keep-alive>
	  <component :is="currentView">
	    <!-- 非活动组件将被缓存！ -->
	  </component>
	</keep-alive>
15、子组件索引ref
	    <div id="parent">
		  <user-profile ref="profile"></user-profile>
		</div>
		var parent = new Vue({ el: '#parent' })
		// 访问子组件
		var child = parent.$refs.profile
	内联模板 ：如果子组件有 inline-template 属性，组件将把它的内容当作它的模板，而不是把它当作分发内容。
		<my-component inline-template>
		  <div>
		    <p>These are compiled as the component's own template.</p>
		    <p>Not parent's transclusion content.</p>
		  </div>
		</my-component>
	对低开销的静态组件使用-v-once：v-once 将渲染结果缓存起来。

二、Vue进阶
1、响应式原理
    1）通过set方法添加的值是响应的
		var vm = new Vue({
		  data:{
			a:1
		  }
		})
		// `vm.a` 是响应的
		vm.b = 2
		// `vm.b` 是非响应的
		Vue.set(vm.someObject, 'b', 2)//响应的
		this.$set(this.someObject,'b',2)//响应的
	2）Vue 不允许动态添加根级响应式属性，所以你必须在初始化实例前声明根级响应式属性，哪怕只是一个空值。
	3）异步更新队列 Vue.nextTick，Vue 异步执行 DOM 更新。
		var vm = new Vue({
		  el: '#example',
		  data: {
		    message: '123'
		  }
		})
		vm.message = 'new message' // 更改数据
		vm.$el.textContent === 'new message' // '未更新'
		Vue.nextTick(function () {
		  vm.$el.textContent === 'new message' // '更新完成'
		})
		this.$nextTick(function () {
          console.log(this.$el.textContent) // => '更新完成'
        })
2、过渡效果<trasition>
   1）单元素、组件过渡
	    <div id="demo">
		  <button v-on:click="show = !show">
		    Toggle
		  </button>
		  <transition name="fade">
		    <p v-if="show">hello</p>
		  </transition>
		</div>
		//css
		.fade-enter-active, .fade-leave-active {
		  transition: opacity .5s
		}
		.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
		  opacity: 0
		}
	2）过渡css类名
	  v-enter   v-enter-active  v-enter-to
	  v-leave   v-leave-active  v-leave-to
	3）js钩子
	   before-enter  enter  after-enter enter-cancelled 
       before-leave  leave  after-leave leave-cancelled（只用于 v-show）
    4）可以通过 appear 属性设置节点的在初始渲染的过渡
    5）多个元素过渡  多个v-if或
         <transition>
		   <button v-bind:key="docState">
		     {{ buttonMessage }}
		   </button>
		 </transition>
		// ...
		computed: {
		  buttonMessage: function () {
		    switch (docState) {
		      case 'saved': return 'Edit'
		      case 'edited': return 'Save'
		      case 'editing': return 'Cancel'
		    }
		  }
		}
	6）过渡模式mode
	   1）in-out: 新元素先进行过渡，完成之后当前元素过渡离开。
       2）out-in: 当前元素先进行过渡，完成之后新元素过渡进入。
       <transition name="fade" mode="out-in">
		  <!-- ... the buttons ... -->
		</transition>
	7）列表过渡（transition-group   v-move）
	   <div id="list-demo" class="demo">
		  <button v-on:click="add">Add</button>
		  <button v-on:click="remove">Remove</button>
		  <transition-group name="list" tag="p">   //transition-group 标签
		    <span v-for="item in items" v-bind:key="item" class="list-item">
		      {{ item }}
		    </span>
		  </transition-group>
		</div>
		//css
		.list-item {
		  display: inline-block;
		  margin-right: 10px;
		}
		.list-enter, .list-leave-active {
		  opacity: 0;
		  transform: translateY(30px);
		}
		.list-move {//v-move
		  transition: transform 1s;
		}
    8）动态过渡，配合js实现
3、过渡状态 具体实例见官网教程
   数字和运算、颜色的显示、SVG 节点的位置、元素的大小和其他的属性的过渡状态由Tweenjs库和watch配合实现
   提取专用子组件<animated-integer>
4、Render函数
    1）原生创建方式
        Vue.component('anchored-heading', {
		  render: function (createElement) {
		    return createElement(
		      'h' + this.level,   // tag name 标签名称
		      [
		        createElement('a', {
		          attrs: {
		            name: headingId,
		            href: '#' + headingId
		          }
		        }, this.$slots.default)
		      ]
		    )
		  },
		  props: {
		    level: {
		      type: Number,
		      required: true
		    }
		  }
		})
    2）新创建的VNode必须是唯一的，不能重复使用
       render: function (createElement) {
		  var myParagraphVNode = createElement('p', 'hi')
		  return createElement('div', [
		    // 错误-重复的VNodes
		    myParagraphVNode, myParagraphVNode
		  ])
		}
		可以用工厂函数替代
		render: function (createElement) {
		  return createElement('div',
		    Array.apply(null, { length: 20 }).map(function () {//重复创建20个p标签
		      return createElement('p', 'hi')
		    })
		  )
		}
	3）render 函数没有提供专用的 API
	    a）v-if和v-for用js数组的map方法模拟
	    b）v-model用domprops:{value:}和on：{input：}方法绑定
	    c）事件修饰符替代  .capture !    .once	~   .capture.once or .once.capture ~!
        d）this.$slots获取VNodes列表中的静态内容  例：this.$slots.default获取无名slot的内容
    4）JSX安装插件 babel-plugin-transform-vue-jsx
        new Vue({
		  el: '#demo',
		  render (h) {
		    return (
		      <AnchoredHeading level={1}>
		        <span>Hello</span> world!
		      </AnchoredHeading>
		    )
		  }
		})
    5）函数化组件
    6）Vue.compile 来实时编译模板字符串
5、自定义指令
   1）自定义全局/局部指令
        // 注册一个全局自定义指令 v-focus
		Vue.directive('focus', {
		  // 当绑定元素插入到 DOM 中。
		  inserted: function (el) {
		    // 聚焦元素
		    el.focus()
		  }
		})
		//局部指令，用directives属性
		directives: {
		  focus: {
		    // 指令的定义---
		  }
		}
	2）自定义指令的钩子函数
	    bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
		inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
		update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
		componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
		unbind: 只调用一次， 指令与元素解绑时调用。
	3）钩子函数参数
	    el: 指令所绑定的元素，可以用来直接操作 DOM 。
		binding: 一个对象，包含以下属性：
			name: 指令名，不包括 v- 前缀。
			value: 指令的绑定值， 例如： v-my-directive="1 + 1", value 的值是 2。
			oldValue: 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
			expression: 绑定值的字符串形式。 例如 v-my-directive="1 + 1" ， expression 的值是 "1 + 1"。
			arg: 传给指令的参数。例如 v-my-directive:foo， arg 的值是 "foo"。
			modifiers: 一个包含修饰符的对象。 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 { foo: true, bar: true }。
		vnode: Vue 编译生成的虚拟节点。
		oldVnode: 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
6、混合
    1）混合对象的钩子将在组件自身钩子之前调用 
	    var mixin = {
		  created: function () {
		    console.log('混合对象的钩子被调用')
		  }
		}
		new Vue({
		  mixins: [mixin],
		  created: function () {
		    console.log('组件钩子被调用')
		  }
		})
		// -> "混合对象的钩子被调用"
		// -> "组件钩子被调用"
    2）全局混合
        Vue.mixin({
		  created: function () {
		    var myOption = this.$options.myOption
		    if (myOption) {
		      console.log(myOption)
		    }
		  }
		})
    3）自定义混合策略：Vue.config.optionMergeStrategies 添加一个函数

总结：
1、全局配置
	Vue.config.silent = true  //取消 Vue 所有的日志与警告。
	Vue.config.optionMergeStrategies=fn//自定义合并（混合）策略
	Vue.config.devtools = true//开发版本默认为 true，生产版本默认为 false
	Vue.config.errorHandler=fn//指定组件的渲染和观察期间未捕获错误的处理函数。
	Vue.config.ignoredElements = [
	  'my-custom-web-component', 'another-web-component'
	]//须使 Vue 忽略在 Vue 之外的自定义元素 
	Vue.config.keyCodes//给 v-on 自定义键位别名。
	Vue.config.performance=false//设置为 true 以在浏览器开发工具中启用对组件初始化，渲染和打补丁的性能追踪。
	Vue.config.productionTip//设置为 false 以阻止 vue 在启动时生成生产提示。
2、全局API
	Vue.extend()//使用基础 Vue 构造器，创建一个“子类”。
	Vue.nextTick()//在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
	Vue.set( object, key, value )//设置对象的响应式属性
	Vue.delete( object, key )//删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。
	Vue.directive( id, [definition] )//注册或获取全局指令。
	Vue.filter( id, [definition] )//注册或获取全局过滤器
	Vue.component( id, [definition] )//注册或获取全局组件。注册还会自动使用给定的id设置组件的名称
	Vue.use( plugin )//安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法将被作为 Vue 的参数调用。
	Vue.mixin( mixin )//全局注册一个混合，影响注册之后所有创建的每个 Vue 实例。
	Vue.compile( template )//在render函数中编译模板字符串。只在独立构建时有效
3、选项和数据
	data  props  propsData（ 只用于 new 创建的实例中） computed  methods  watch
4、Dom
	vm.$el  template  render
5、生命周期钩子函数
    beforeCreate created beforeMount mounted  beforeUpdate  updated
	activated（keep-alive 组件激活时调用） deactivated（keep-alive 组件停用时调用）
	beforeDestroy destroyed
6、directives  包含 Vue 实例可用指令的哈希表。
   filters     包含 Vue 实例可用过滤器的哈希表。
   components  包含 Vue 实例可用组件的哈希表。
   parent      子实例可以用 this.$parent 访问父实例，子实例被推入父实例的 $children 数组中。
   mixins      混合对象的数组
   name（只有作为组件选项时起作用） 允许组件模板递归地调用自身。另一个好处是便于调试。
   extends     与mixins 类似，区别在于，组件自身的选项会比要扩展的源组件具有更高的优先级。
   delimiters  改变纯文本插入分隔符。 这个选择只有在独立构建时才有用。
   functional  使组件无状态（没有 data ）和无实例（没有 this 上下文）。他们用一个简单的 render 函数返回虚拟节点使他们更容易渲染。
7、实例属性
   vm.$data      Vue 实例观察的数据对象。Vue 实例代理了对其 data 对象属性的访问。
   vm.$el        Vue 实例使用的根 DOM 元素。
   vm.$options   用于当前 Vue 实例的初始化选项。
   vm.$parent    父实例
   vm.$root      当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自已。注意是组件树
   vm.$children  当前实例的直接子组件。需要注意 $children 并不保证顺序，也不是响应式的。
   vm.$slots     用来访问被 slot 分发的内容。vm.$slots.default...
   vm.$scopedSlots  用来访问 scoped slots。对于包括 默认 slot 在内的每一个 slot， 该对象都包含一个返回相应 VNode 的函数。
   vm.$refs      一个对象，其中包含了所有拥有 ref (索引)注册的子组件。
   vm.$isServer  当前 Vue 实例是否运行于服务器。
8、实例方法
   1）vm.$watch( expOrFn, callback, [options] )
   options：{deep：true,immediate: true}
   为了发现对象内部值的变化，可以在选项参数中指定 deep: true 。
   在选项参数中指定 immediate: true 将立即以表达式的当前值触发回调。
   2）vm.$set( object, key, value )
   3）vm.$delete( object, key )
   4）vm.$on( event, callback )
      监听当前实例上的自定义事件。事件可以由 vm.$emit触发。回调函数会接收所有传入事件触发函数的额外参数。
   5）vm.$once( event, callback )  监听一个自定义事件，但是只触发一次，在第一次触发之后移除监听器。
   6）vm.$off( [event, callback] )  移除事件监听器。
        如果没有提供参数，则移除所有的事件监听器；
		如果只提供了事件，则移除该事件所有的监听器；
		如果同时提供了事件与回调，则只移除这个回调的监听器。
   7）vm.$emit( event, […args] ) 触发当前实例上的事件。附加参数都会传给监听器回调。
   8）vm.$mount( [elementOrSelector] ) 手动地挂载一个未挂载的实例。
   9）vm.$forceUpdate() 迫使Vue实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。
   10）vm.$nextTick( [callback] )  将回调延迟到下次 DOM 更新循环之后执行。
   11）vm.$destroy()  完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
9、指令
   v-text  v-html  v-show  v-if  v-else v-else-if  v-for  v-on  v-bind  v-model v-once
   v-pre：跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
        <span v-pre>{{ this will not be compiled }}</span>
   v-cloak  这个指令保持在元素上直到关联实例结束编译。
        [v-cloak] {
		  display: none;
		}
		<div v-cloak>
		  {{ message }}
		</div>
   v-on的修饰符：
	    .stop - 调用 event.stopPropagation()。
		.prevent - 调用 event.preventDefault()。
		.capture - 添加事件侦听器时使用 capture 模式。
		.self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
		.{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
		.native - 监听组件根元素的原生事件。
		.once - 只触发一次回调。
		.left - (2.2.0) 只当点击鼠标左键时触发。
		.right - (2.2.0) 只当点击鼠标右键时触发。
		.middle - (2.2.0) 只当点击鼠标中键时触发。
		.passive - (2.3.0) 以 { passive: true } 模式添加侦听器
   v-bind的修饰符：
	    .prop - 被用于绑定 DOM 属性。(what’s the difference?)
		.camel - (2.1.0+) transform the kebab-case attribute name into camelCase. (supported since 2.1.0)
		.sync (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器。
10、特殊属性
    key  ref(被用来给元素或子组件注册引用信息) slot
11、内置组件
    1）<component>   渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染。
	    <!-- 动态组件由 vm 实例的属性值 `componentId` 控制 -->
		<component :is="componentId"></component>
		<!-- 也能够渲染注册过的组件或 prop 传入的组件 -->
		<component :is="$options.components.child"></component>
    2）<transition>  元素作为单个元素/组件的过渡效果
	    Props：
			name - string, 用于自动生成 CSS 过渡类名。例如：name: 'fade' 将自动拓展为.fade-enter，.fade-enter-active等。默认类名为 "v"
			appear - boolean, 是否在初始渲染时使用过渡。默认为 false。
			css - boolean, 是否使用 CSS 过渡类。默认为 true。如果设置为 false，将只通过组件事件触发注册的 JavaScript 钩子。
			type - string, 指定过渡事件类型，侦听过渡何时结束。有效值为 "transition" 和 "animation"。默认 Vue.js 将自动检测出持续时间长的为过渡事件类型。
			mode - string, 控制离开/进入的过渡时间序列。有效的模式有 "out-in" 和 "in-out"；默认同时生效。
			enter-class - string
			leave-class - string
			enter-active-class - string
			leave-active-class - string
			appear-class - string
			appear-active-class - string
		事件：
			before-enter
			enter
			after-enter
			before-leave
			leave
			after-leave
			before-appear
			appear
	3）<transition-group>  多个元素/组件的过渡效果。 注意，每个 <transition-group> 的子节点必须有 独立的key ，动画才能正常工作
	4）<keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
		当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
		include 和 exclude 属性允许组件有条件地缓存。
			<!-- 逗号分隔字符串 -->
			<keep-alive include="a,b">
			  <component :is="view"></component>
			</keep-alive>
			<!-- 正则表达式 (使用 v-bind) -->
			<keep-alive :include="/a|b/">
			  <component :is="view"></component>
			</keep-alive>
	5）<slot> 元素作为组件模板之中的内容分发插槽。