import Vue from 'vue'
import VueRouter from 'vue-router'
// import Layout from '@/components/Layout'
// import PageLayout from '@/components/PageLayout'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'base',
  //   components: Layout
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
