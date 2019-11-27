import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USERINFO, RESET_USERINFO, RECEIVE_CODE, RECEIVE_FOODS, RECEIVE_INFO, RECEIVE_RATING, INCRMENTCOUNT, DECRMENTCOUNT, CLEARLIST} from './mutation-types'
import {reqShops, reqAddress, reqCategory, reqUserinfo, reqLogout, reqSendCode, reqFoods, reqRating, reqInfo} from '../api/index'
export default{
  async getAddress ({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const reslut = await reqAddress(geohash)
    if (reslut.code === 0) {
      const address = reslut.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  async getShops ({commit, state}) {
    const {latitude, longitude} = state
    const reslut = await reqShops(latitude, longitude)
    if (reslut.code === 0) {
      const shops = reslut.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  async getCategorys ({commit}) {
    const reslut = await reqCategory()
    if (reslut.code === 0) {
      const categorys = reslut.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },
  recordUserInfo ({commit}, userInfo) {
    commit(RECEIVE_USERINFO, {userInfo})
  },
  async reqUserinfo ({commit}) {
    const reslut = await reqUserinfo()
    if (reslut.code === 0) {
      const userInfo = reslut.data
      commit(RECEIVE_USERINFO, {userInfo})
    }
  },
  async reqLogout ({commit}) {
    const reslut = await reqLogout()
    if (reslut.code === 0) {
      commit(RESET_USERINFO)
    }
  },
  async reqSendCode ({commit}, phone) {
    const reslut = await reqSendCode(phone)
    if (reslut.code === 0) {
      const code = reslut.code
      commit(RECEIVE_CODE, {code})
    } else {
      const code = reslut.code
      commit(RECEIVE_CODE, {code})
    }
  },
  async reqInfo ({commit}, cb) {
    const reslut = await reqInfo()
    if (reslut.code === 0) {
      const info = reslut.data
      commit(RECEIVE_INFO, {info})
      cb && cb()
    }
  },
  async reqRating ({commit}, cb) {
    const reslut = await reqRating()
    if (reslut.code === 0) {
      const rating = reslut.data
      commit(RECEIVE_RATING, {rating})
      cb && cb()
    }
  },
  async reqFoods ({commit}, cb) {
    const reslut = await reqFoods()
    if (reslut.code === 0) {
      const foods = reslut.data
      commit(RECEIVE_FOODS, {foods})
      cb && cb()
    }
  },
  upDataCount ({commit}, {isAdd, item}) {
    if (isAdd) {
      commit(INCRMENTCOUNT, {item})
    } else {
      commit(DECRMENTCOUNT, {item})
    }
  },
  clearList ({commit}) {
    commit(CLEARLIST)
  }
}
