import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    // name: 'layout', 无意义
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 默认首先为主的子路由
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/sq',
        name: 'sq',
        component: () => import('@/views/sq')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/user/ziliao',
    name: 'user-ziliao',
    component: () => import('@/views/user-ziliao')
  }
]

const router = new VueRouter({
  routes
})

export default router
