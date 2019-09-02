import Vue from 'vue'
import Vuex from 'vuex'
import actions from './components/actions'
import getters from './components/getters'
import state from './components/state'
import mutations from './components/mutations'
Vue.use(Vuex)
export default new Vuex.Store({
  actions,
  state,
  mutations,
  getters
})
