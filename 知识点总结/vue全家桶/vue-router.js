1、路由实现：
	1）HTML: <router-link to="/foo">Go to Foo</router-link>
	         <router-link to="/bar">Go to Bar</router-link>
	2）js：const router =  new Router({
			    routes:[
				  { path: '/foo', component: Foo },
				  { path: '/bar', component: Bar }
				]
		   })
2、动态路由匹配
   1）/user/:username/post/:post_id，则 $route.params={ username: 'evan', post_id: 123 }
   2）响应路由参数的变化：例如从 /user/foo 导航到 user/bar，原来的组件实例会被复用。
      用 watch监测（路由参数的变化） $route 对象：
	    const User = {
		  template: '...',
		  watch: {
		    '$route' (to, from) {
		      // 对路由变化作出响应...
		    }
		  }
		}
   3）匹配优先级：同一个路径可以匹配多个路由，此时谁先定义的，谁的优先级就最高。
3、嵌套路由
	const User = {
	  template: `
	    <div class="user">
	      <h2>User {{ $route.params.id }}</h2>
	      <router-view></router-view>
	    </div>
	  `
	}
	const router = new VueRouter({
	  routes: [
	    { path: '/user/:id', component: User,
	      children: [
	        {
	          // 当 /user/:id匹配成功，默认将UserProfil渲染在 User 的 <router-view> 中
	          path: '',
	          component: UserProfile
	        },
	        {
	          // 当 /user/:id/posts 匹配成功UserPosts 会被渲染在 User 的 <router-view> 中
	          path: 'posts',
	          component: UserPosts
	        }
	      ]
	    }
	  ]
	})
4、编程式导航push replace go
	1）router.push(location)
		// 字符串/home
		router.push('home')
		// 对象/home
		router.push({ path: 'home' })
		// 命名的路由 /user/:123
		router.push({ name: 'user', params: { userId: 123 }})
		// 带查询参数，变成 /register?plan=private
		router.push({ path: 'register', query: { plan: 'private' }} 
	2）router.replace(location)跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。
    3）router.go(n)在 history 记录中向前或者后退多少步
5、命名路由
    const router = new VueRouter({
	  routes: [
	    {
	      path: '/user/:userId',
	      name: 'user',//命名
	      component: User
	    }
	  ]
	})
    <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>//直接调用name，而不用path
6、命名视图：想同时（同级）展示多个视图，而不是嵌套展示
	<router-view class="view one"></router-view>
	<router-view class="view two" name="a"></router-view>
	<router-view class="view three" name="b"></router-view>

	const router = new VueRouter({
	  routes: [
	    {
	      path: '/',
	      components: {
	        default: Foo,
	        a: Bar,
	        b: Baz
	      }
	    }
	  ]
	})
7、重定向redirect
	const router = new VueRouter({
	  routes: [
	    { path: '/a', redirect: '/b' }，//从 /a 重定向到 /b
	    { path: '/c', redirect: { name: 'foo' }}//重定向到一个命名的路由
	    { path: '/a', component: A, alias: '/b' }///a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。
	  ]
	})
8、导航钩子
	1）全局钩子：
	    a）router.beforeEach((to, from, next) => {
		  // ...
		})
		    to: Route: 即将要进入的目标 路由对象
			from: Route: 当前导航正要离开的路由
			next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
				next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
				next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
				next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
	    b）router.afterEach(route => {
		  // ...
		})    注意：afterEach 钩子没有 next 方法，不能改变导航
	2）某个路由独享的钩子
	    const router = new VueRouter({
		  routes: [
		    {
		      path: '/foo',
		      component: Foo,
		      beforeEnter: (to, from, next) => {
		        // ...
		      }
		    }
		  ]
		})
	3）组件内钩子 beforeRouteEnter、beforeRouteUpdate (2.2 新增)、beforeRouteLeave
	    const Foo = {
		  template: `...`,
		  beforeRouteEnter (to, from, next) {
		    // 在渲染该组件的对应路由被 confirm 前调用
		    // 不！能！获取组件实例 `this`，因为当钩子执行前，组件实例还没被创建
		  },
		  beforeRouteUpdate (to, from, next) {
		    // 在当前路由改变，但是该组件被复用时调用。举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候。
		    // 可以访问组件实例 `this`
		  },
		  beforeRouteLeave (to, from, next) {
		    // 导航离开该组件的对应路由时调用，可以访问组件实例 `this`
		  }
		}
9、路由元信息
	const router = new VueRouter({
	  routes: [
	    {
	      path: '/foo',
	      component: Foo,
	      // a meta field
	      meta: { requiresAuth: true }
	    }
	  ]
	})
	可以在钩子函数中访问，例如 to.meta.requiresAuth
10、过渡动效
	<transition :name="transitionName">
	  <router-view></router-view>
	</transition>
	// 接着在父组件内，watch $route 决定使用哪种过渡
	watch: {
	  '$route' (to, from) {
	    const toDepth = to.path.split('/').length
	    const fromDepth = from.path.split('/').length
	    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
	  }
	}
11、获取数据
	1）导航完成后获取数据：在组件的 created 钩子中获取数据
	2）在导航完成前获取数据：组件的 beforeRouteEnter 钩子中获取数据
12、滚动行为scrollBehavior（这个功能只在 HTML5 history 模式下可用）
    使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样
	    const router = new VueRouter({
		  routes: [...],
		  scrollBehavior (to, from, savedPosition) {
		    // return 期望滚动到哪个的位置
		  }
		})
	HTML5 history模式（需要后台配置支持）：
		const router = new VueRouter({
		  mode: 'history',
		  routes: [...]
		})
13、路由懒加载：把路由对应的组件定义成异步组件
	const Foo = r => require.ensure([], () => r(require('./Foo.vue')), 'group-foo')
	const Bar = r => require.ensure([], () => r(require('./Bar.vue')), 'group-foo')
	const Baz = r => require.ensure([], () => r(require('./Baz.vue')), 'group-foo')

API：
1、<router-link> 属性： 
    :to属性  
    replace属性（为true会调用 router.replace() 而不是 router.push()）
    append属性（在当前（相对）路径前添加基路径。例如，我们从 /a 导航到一个相对路径 b，如果没有配置 append，则路径为 /b，如果配了，则为 /a/b）
    tag属性（<router-link> 渲染成某种标签，例如 <li>， tag="li"；默认为<a>）
    active-class属性（设置 链接激活时使用的 CSS 类名，默认值: "router-link-active"）
    exact属性（"是否激活" 默认类名的依据是 inclusive match （全包含匹配）。使用exact,则<router-link to="/" exact>，这个链接只会在地址为 / 的时候被激活）
    events属性（声明可以用来触发导航的事件。默认值: 'click'）
2、<router-view>  name属性
3、路由信息对象
	一个 route object（路由信息对象） 表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，
	还有 URL 匹配到的 route records（路由记录）。
	属性：1）$route.path      字符串，对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"。
	      2）$route.params    obj,表示路由参数。没有路由参数，就是一个空对象。
	      3）$route.query     obj,表示 URL 查询参数。
	      4）$route.hash      当前路由的 hash 值 (带 #) ，如果没有 hash 值，则为空字符串。
	      5）$route.fullPath  完成解析后的 URL，包含查询参数和 hash 的完整路径。
	      6）$route.matched   一个数组，包含当前路由的所有嵌套路径片段的 路由记录 。
	      7）$route.name      当前路由的名称
4、Router 构造配置
	1）routes
		declare type RouteConfig = {
		  path: string;
		  component?: Component;
		  name?: string; // for named routes (命名路由)
		  components?: { [name: string]: Component }; // for named views (命名视图组件)
		  redirect?: string | Location | Function;
		  alias?: string | Array<string>;
		  children?: Array<RouteConfig>; // for nested routes
		  beforeEnter?: (to: Route, from: Route, next: Function) => void;
		  meta?: any;
		}
	2）mode     可选值: "hash"(浏览器环境) | "history"(H5 history模式) | "abstract"(Node.js 环境)
	3）base     应用的基路径。默认值: "/"
	4）linkActiveClass   全局配置 <router-link> 的默认『激活 class 类名』。默认值: "router-link-active"
	5）scrollBehavior函数    滚动行为。返回值为默认位置{ x: number, y: number }
5、Router 实例
	1）属性：router.app           配置了 router 的 Vue 根实例。
	         router.mode          路由使用的 模式。
	         router.currentRoute  当前路由对应的路由信息对象。
	2）方法:router.beforeEach(guard)
			router.afterEach(hook)
			router.push(location)
			router.replace(location)
			router.go(n)
			router.back()
			router.forward()//动态的导航到一个新 url。
			router.getMatchedComponents(location?)// 返回目标位置或是当前路由匹配的组件数组（是数组的定义/构造类，不是实例）。
			router.resolve(location, current?, append?)//解析目标位置,返回{location: Location;route: Route;href: string;}
			router.addRoutes(routes)//动态添加更多的路由规则。
			router.onReady(callback)//添加一个会在第一次路由跳转完成时被调用的回调函数。
6、组件注入的属性和配置
    属性：$router  router 实例
          $route   当前激活的 路由信息对象。
    钩子：beforeRouteEnter
          beforeRouteUpdate
		  beforeRouteLeave
