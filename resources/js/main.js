import Vue from 'vue'
import App from './App.vue'
import store from './store/store.js'

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app')
