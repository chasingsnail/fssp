import Vue from 'vue'
import VueRouter from 'vue-router'
// import Layout from '@/components/Layout'
// import PageLayout from '@/components/PageLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'base'
  }
]

const router = new VueRouter({
  routes
})

export default router
