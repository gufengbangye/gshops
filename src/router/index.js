import Vue from 'Vue'
import VueRouter from 'vue-router'
import Msite from '../pages/Msite/Msite'
import Order from '../pages/Order/Order'
import Search from '../pages/Search/Search'
import profile from '../pages/profile/profile'
import Login from '../pages/Login/login'
import mima from '../pages/Login/mima'
import duanxin from '../pages/Login/duanxin'
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
    component: Login,
    children: [{
      path: '/login/mima',
      component: mima
    },
    {
      path: '/login/duanxin',
      component: duanxin
    },
    {
      path: '',
      redirect: '/login/duanxin'
    }
    ]
  },
  {
    path: '/',
    redirect: '/Msite'
  }
  ]
})
