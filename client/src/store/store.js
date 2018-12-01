import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// Tell Vue to user Vuex
Vue.use(Vuex)

function initialState () {
  return {
    token: null,
    user: null,
    isUserLoggedIn: false,
    savedItems: []
  }
}

// Create Vuex.Store using a strict mode
export default new Vuex.Store({
  strict: true,
  plugins: [
    // whenever the page refreshes, it will refresh whatever stage you have in a vuex (User login)
    createPersistedState()
  ],
  // Create state variables that we're going to use entire our application
  state: initialState,
  // Create mutations to change state variables
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser (state, user) {
      state.user = user
    },
    setSavedItems (state, savedItems) {
      state.savedItems = savedItems
    },
    addSavedItem (state, savedItem) {
      state.savedItems.push(savedItem)
    },
    removeSavedItem (state, itemToRemove) {
      state.savedItems.splice(state.savedItems.indexOf(itemToRemove), 1)
    },
    reset (state) {
      // acquire initial state
      const s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    }
  },
  // Create actions to change state variables
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setSavedItems ({commit}, savedItems) {
      commit('setSavedItems', savedItems)
    },
    addSavedItem ({commit}, savedItem) {
      commit('addSavedItem', savedItem)
    },
    removeSavedItem ({commit}, itemToRemove) {
      commit('removeSavedItem', itemToRemove)
    },
    clearAll ({commit}) {
      commit('reset')
    }
  }
})
