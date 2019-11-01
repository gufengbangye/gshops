// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'Vue'
import App from './App'
import router from './router/index'
import store from './store'
import { Button, Cell } from 'mint-ui'
import './mock/mockSever'
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
