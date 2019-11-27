import Vue from 'Vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login/login'
import info from '../pages/Shops/info'
import shop from '../pages/Shops/shop'
import rating from '../pages/Shops/rating'
import foods from '../pages/Shops/foods'
// import Msite from '../pages/Msite/Msite'
// import Order from '../pages/Order/Order'
// import Search from '../pages/Search/Search'
// import profile from '../pages/profile/profile'
const Msite = () => import('../pages/Msite/Msite')
const Order = () => import('../pages/Order/Order')
const Search = () => import('../pages/Search/Search')
const profile = () => import('../pages/profile/profile')

Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/Msite',
    name: 'Msite',
    meta: {
      showFtooer: true
    },
    component: Msite
  },
  {
    path: '/Order',
    meta: {
      showFtooer: true
    },
    component: Order
  },
  {
    path: '/Search',
    name: 'Search',
    meta: {
      showFtooer: true
    },
    component: Search
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      showFtooer: true
    },
    component: profile
  },
  {
    path: '/login',
    meta: {
      showFtooer: false
    },
    component: Login
  },
  {
    path: '/shop:id',
    component: shop,
    children: [{
      path: '/shop:id/info',
      component: info
    },
    {
      path: '/shop:id/rating',
      component: rating
    },
    {
      path: '/shop:id/foods',
      component: foods
    },
    {
      path: '',
      redirect: '/shop:id/foods'
    }]
  },
  {
    path: '/',
    redirect: '/Msite'
  }
  ]
})
