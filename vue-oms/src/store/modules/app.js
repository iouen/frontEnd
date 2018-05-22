import Cookies from 'js-cookie'

const app = {
  // 局部状态对象
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop'
  },

  /* 对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象
      更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
      每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)
      你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 increment 的 mutation 时，调用此函数。
      ”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法.

      当需要在对象上添加新属性时，你应该
      使用 Vue.set(obj, 'newProp', 123), 或者
      以新对象替换老对象。例如，利用 stage-3 的对象展开运算符我们可以这样写：
      state.obj = { ...state.obj, newProp: 123 }

      一条重要的原则就是要记住 mutation 必须是同步函数
  */
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  /*
    Action 类似于 mutation，不同在于：
    Action 提交的是 mutation，而不是直接变更状态。
    Action 可以包含任意异步操作。
    Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
    实践中，我们会经常用到 ES2015 的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候）
  */
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default app
