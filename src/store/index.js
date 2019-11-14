import Vue from 'vue'
import Vuex from 'vuex'
import { mockRoutes } from '@/mockData'
import { splitRoute } from '@/utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hasRoute: false,
    orderedRoutes: [],
    routerLinks: []
  },
  mutations: {
    setRoute(state, routes) {
      const { routeArr, routeLink } = splitRoute(routes)
      console.log(111, routeArr, routeLink)
      state.orderedRoutes = routeArr
      state.routerLinks = routeLink
      state.hasRoute = true
    },
    switchStatus(state, bool) {
      state.hasRoute = bool
    }
  },
  actions: {
    getRoutes({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          const routes = mockRoutes
          commit('setRoute', routes)
          resolve()
        }, 500)
      })
    }
  }
})

export default store
