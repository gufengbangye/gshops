import ajax from './ajax'
const BASE_URL = '/api'

export const reqAddress = (geohash) => ajax(BASE_URL + `/position/${geohash}`)
// 根据经纬度获取位置详情

export const reqCategory = () => ajax(BASE_URL + '/index_category')
// 获取食品分类列表

export const reqShops = ({latitude, longitude}) => ajax(BASE_URL + '/shops', {latitude, longitude})
// 根据经纬度获取商铺列表

export const reqSearchShops = ({geohash, keyword}) => ajax(BASE_URL + '/search_shops', {geohash, keyword})
// 根据经纬度和关键字搜索商铺列表

export const reqCaptcha = () => ajax(BASE_URL + '/captcha')
// 、获取一次性验证码

export const reqPwd = ({name, pwd, captcha}) => ajax(BASE_URL + '/login_pwd', {name, pwd, captcha}, 'post')
// 用户名密码登陆

export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcode', phone)
// 发送短信验证码

export const reqloginSms = ({phone, code}) => ajax(BASE_URL + '/login_sms', {phone, code}, 'post')
// 手机号验证码登陆

export const reqUserinfo = () => ajax(BASE_URL + '/userinfo')
// 根据会话获取用户信息

export const reqLogout = () => ajax(BASE_URL + '/logout')
// 用户登出
