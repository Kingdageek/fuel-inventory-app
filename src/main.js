import Vue from 'vue'
import App from './App.vue'
import Dashboard from './components/Dashboard'
import router from './router'
import axios from 'axios'
import { API_BASE_URL } from './config.js'

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$baseUri = API_BASE_URL

new Vue({
  router,
  render: h => h(Dashboard)
}).$mount('#app')
