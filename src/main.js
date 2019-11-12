import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import { Button } from 'element-ui'
import '@/assets/styles/base.scss'

Vue.use(Button)
Vue.config.productionTip = false

router.beforeEach(async (to, from, next) => {
  console.log(to, from)
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
