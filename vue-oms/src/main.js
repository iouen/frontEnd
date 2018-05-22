import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n g

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

// 引入完整的 Element
Vue.use(ElementUI, { locale })

// 设置 Vue.config.productionTip = false 来关闭生产模式下给出的提示
Vue.config.productionTip = false

// 创建一个 Vue 实例
// vm.$data 用$来区分是VUE中的还是自定义的
new Vue({
  el: '#app',
  // 将路由对象作为参数传进来
  router,
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  // view
  template: '<App/>',
  components: { App }
})
