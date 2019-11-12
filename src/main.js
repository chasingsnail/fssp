import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import * as Util from '@/utils'
import './assets/styles/element-variables.scss'
import {
  Button,
  Dialog,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Input
} from 'element-ui'
import '@/assets/styles/base.scss'

Vue.use(Button)
Vue.use(Dialog)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Input)

Vue.config.productionTip = false

Vue.prototype.$Utils = Util

router.beforeEach(async (to, from, next) => {
  if (!store.state.hasRoute) {
    await store.dispatch('getRoutes') // 异步获取路由
    router.addRoutes(store.state.orderedRoutes)
    if (to.path === '/') {
      // 默认进入路由第一项
      return next({
        path: store.state.orderedRoutes[0].path,
        replace: true
      })
    } else {
      return next({ path: to.path, query: to.query, replace: true })
    }
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
