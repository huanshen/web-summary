Vuex核心：
const store = new Vuex.Store({
  state: {
  	count:1,
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
1、state:Vuex 使用单一状态树，用一个对象就包含了全部的应用层级状态。state作为一个唯一数据源存在。
      当一个组件需要获取多个状态时候，使用mapState 辅助函数

      获取：store.state.xx

      // 在单独构建的版本中辅助函数为 Vuex.mapState
		import { mapState } from 'vuex'

		export default {
		  // ...
		  computed: mapState({
		    // 箭头函数可使代码更简练
		    count: state => state.count,

		    // 传字符串参数 'count' 等同于 `state => state.count`
		    countAlias: 'count',

		    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
		    countPlusLocalState (state) {
		      return state.count + this.localCount
		    }
		  })
		}
2、Getters：从 store 中的 state 中派生出一些状态

    获取：store.getters.xx  注意：Getters 也可以接受其他 getters 作为第二个参数：

    mapGetters 辅助函数仅仅是将 store 中的 getters 映射到局部计算属性
	    import { mapGetters } from 'vuex'
		export default {
		  // ...
		  computed: {
		    // 使用对象展开运算符将 getters 混入 computed 对象中
		    ...mapGetters([
		      'doneTodosCount',
		      'anotherGetter',
		      // ...
		    ])
		  }
		}
3、Mutations:更改store中的状态的唯一方法是提交mutation。Vuex 中的 mutations 非常类似于事件：
   每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。

    触发：1）store.commit('increment',argsObj)//载荷方式进行分发
          2）store.commit({//对象方式进行分发
			  type: 'increment',//type
			  amount: 10//args
			 })

    注意：
    1）使用常量替代 Mutation 事件类型 Mutation_type
    2）mutation 必须是同步函数。
    3）可以在组件中使用 this.$store.commit('xxx') 提交 mutation，
       或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用
        import { mapMutations } from 'vuex'
		export default {
		  // ...
		  methods: {
		    ...mapMutations([
		      'increment' // 映射 this.increment() 为 this.$store.commit('increment')
		    ]),
		    ...mapMutations({
		      add: 'increment' // 映射 this.add() 为 this.$store.commit('increment')
		    })
		  }
		}
4、Actions: Action函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 
   context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 
   和 getters。注意context!=store，是store某个module

   触发：store.dispatch('increment')//Actions 支持同样的载荷方式和对象方式进行分发

   注意：
   	1）Action 类似于 mutation，不同在于：
		Action 提交的是 mutation，而不是直接变更状态。
		Action 可以包含任意异步操作。
	2）在组件中分发 Action：
	    import { mapActions } from 'vuex'
		export default {
		  // ...
		  methods: {
		    ...mapActions([
		      'increment' // 映射 this.increment() 为 this.$store.dispatch('increment')
		    ]),
		    ...mapActions({
		      add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
		    })
		  }
		}
5、Modules:将 store 分割成模块（module）。每个模块拥有自己的 state、getter、mutation、action、甚至是嵌套子模块——从上至下进行同样方式的分割
	const moduleA = {
	  state: { ... },
	  mutations: { ... },
	  actions: { ... },
	  getters: { ... }
	}

	const moduleB = {
	  state: { ... },
	  mutations: { ... },
	  actions: { ... }
	}

	const store = new Vuex.Store({
	  modules: {
	    a: moduleA,
	    b: moduleB
	  }
	})
	注意：1）对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。
	         对于模块内部的 action，局部状态通过 context.state 暴露出来， 根节点状态则为 context.rootState
	      2）通过添加 namespaced: true 的方式使其成为命名空间模块。
            computed: {
			  ...mapState({
			    a: state => state.some.nested.module.a,
			    b: state => state.some.nested.module.b
			  })
			}
			//将模块的空间名称字符串作为第一个参数传递给上述函数
			computed: {
			  ...mapState('some/nested/module', {
			    a: state => state.a,
			    b: state => state.b
			  })
			},
		  3）store 创建之后，你可以使用 store.registerModule 方法注册模块
		    // 注册模块 `myModule`
			store.registerModule('myModule', {
			  // ...
			})
			// 注册嵌套模块 `nested/myModule`
			store.registerModule(['nested', 'myModule'], {
			  // ...
			})
		  4）模块重用：使用一个函数来声明模块状态

API:

Vuex.Store
import Vuex from 'vuex'
const store = new Vuex.Store({ ...options })
1、Vuex.Store 构造器选项
	state、mutations、actions、getters、modules
	plugins（Array<Function>） strict（Boolean）

2、Vuex.Store 实例属性
	state、getters

3、Vuex.Store 实例方法
	commit(type: string, payload?: any) | commit(mutation: Object) 提交 mutation。
	dispatch(type: string, payload?: any) | dispatch(action: Object) 分发 action。
	replaceState(state: Object) 替换 store 的根状态，仅用状态合并或 time-travel 调试。
	watch(getter: Function, cb: Function, options?: Object) 响应式地监测一个 getter 方法的返回值，当值改变时调用回调函数。
	subscribe(handler: Function) 注册监听 store 的 mutation。
	registerModule(path: string | Array<string>, module: Module) 注册一个动态模块。
	unregisterModule(path: string | Array<string>) 卸载一个动态模块。 
	hotUpdate(newOptions: Object) 热替换新的 action 和 mutation。

4、组件绑定的辅助函数
	mapState(map: Array<string> | Object): Object 创建组件的计算属性返回 Vuex store 中的状态。 
	mapGetters(map: Array<string> | Object): Object 创建组件的计算属性返回 getter 的返回值。 
	mapActions(map: Array<string> | Object): Object 创建组件方法分发 action。 
	mapMutations(map: Array<string> | Object): Object 创建组件方法提交 mutation

