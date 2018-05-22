import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Vuex)

const store = new Vuex.Store({
  // Vuex 允许我们将 store 分割成模块（module）每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割
  modules: {
    app,
    user,
    permission
  },
  getters
})
// 可以通过 store.state 来获取状态对象，以及通过 store.commit 方法触发状态变更
export default store
