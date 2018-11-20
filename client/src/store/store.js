import Vue from 'vue'
import Vuex from 'vuex'

// Tell Vue to user Vuex
Vue.use(Vuex)

// Create Vuex.Store using a strict mode
export default new Vuex.Store({
  strict: true,
  // Create state variables that we're going to use entire our application
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  // Create mutations to change state variables
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser (state, user) {
      state.user = user
    }
  },
  // Create actions to change state variables
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  }
})
