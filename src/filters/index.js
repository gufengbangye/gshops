import moment from 'moment'
import Vue from 'vue'
Vue.filter('date-String', function (value, formatStr) {
  return moment(value).format(formatStr || 'YYYY-MM-DD HH:mm:ss')
})
