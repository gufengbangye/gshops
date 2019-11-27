import Vue from 'vue'
import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USERINFO, RESET_USERINFO, RECEIVE_CODE, RECEIVE_FOODS, RECEIVE_RATING, RECEIVE_INFO, DECRMENTCOUNT, INCRMENTCOUNT, CLEARLIST} from './mutation-types'
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
      if (item.count === 0) {
        state.cartList.splice(state.cartList.indexOf(item), 1)
      }
    }
  },
  [INCRMENTCOUNT] (state, {item}) {
    item.count++
  },
  [CLEARLIST] (state) {
    state.cartList.forEach((food) => {
      food.count = 0
    })
    state.cartList = []
  }
}
