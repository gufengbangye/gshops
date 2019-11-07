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
  [DECRMENTCOUNT]  (state, {food}) {
    food.count--
  },
  [INCRMENTCOUNT] (state, {food}) {
    if (!food.count) {
      food.count = 1
    } else {
      food.count++
    }
  }
}
