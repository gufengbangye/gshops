import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS} from './mutation-types'
import {reqShops, reqAddress, reqCategory} from '../api/index'
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
  }
}
