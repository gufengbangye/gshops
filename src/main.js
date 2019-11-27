// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'Vue'
import App from './App'
import router from './router/index'
import store from './store'
import { Button, Cell } from 'mint-ui'
import './mock/mockSever'
// import './filters'
import VueLazyload from 'vue-lazyload'
import loading from './common/images/lodaing.gif'
// import moment from 'moment'
// Vue.filter('dateString', function (value, format) {
//   return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
// })
import format from 'date-fns/format'
Vue.filter('date-format', function (value, formatStr = 'yyyy-MM-dd hh:mm:ss') {
  return format(value, formatStr)
})
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading,
  attempt: 1
})
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
