import Vue from 'vue'
import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USERINFO, RESET_USERINFO, RECEIVE_CODE, RECEIVE_FOODS, RECEIVE_RATING, RECEIVE_INFO, DECRMENTCOUNT, INCRMENTCOUNT} from './mutation-types'
export default{
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USERINFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USERINFO] (state) {
    state.userInfo = {}
  },
  [RECEIVE_CODE] (state, {code}) {
    state.code = code
  },
  [RECEIVE_FOODS] (state, {foods}) {
    state.foods = foods
  },
  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },
  [RECEIVE_RATING] (state, {rating}) {
    state.rating = rating
  },
  [DECRMENTCOUNT]  (state, {item}) {
    if (item.count) {
      item.count--
    }
  },
  [INCRMENTCOUNT] (state, {item}) {
    if (!item.count) {
      Vue.set(item, 'count', 1) // 让新增的属性也有数据绑定
    } else {
      item.count++
    }
  }
}
