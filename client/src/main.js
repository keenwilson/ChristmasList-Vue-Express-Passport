// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'
import Panel from '@/components/globals/Panel'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    'primary': '#004d40',
    'secondary': '#00897b',
    'accent': '#4e342e',
    'error': '#b71c1c',
    'info': '#0d47a1',
    'success': '#1b5e20',
    'warning': '#ffab00'
  }
})

Vue.component('panel', Panel)

// Tell vuex-router-sync to sync store to router
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
