import Vue from 'Vue'
import Vuex from 'Vuex'
import actions from './actions'
import getters from './getters'
import state from './state'
import mutations from './mutations'
Vue.use(Vuex)
export default new Vuex.Store({
  actions,
  state,
  mutations,
  getters
})
