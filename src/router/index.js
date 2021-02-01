import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login'
import System from '@/views/System'
import Home from '@/views/system/Home'
import About from '@/views/system/About'
import NotFount from '@/views/system/NotFount'
import Inform from '@/views/system/site/Inform'
import Log from '@/views/system/site/Log'
import Department from '@/views/system/department/Department'
import Post from '@/views/system/department/Post'
import User from '@/views/system/user/User'
import Auth from '@/views/system/user/Auth'
import Info from '@/views/system/Info'
import Monitoring from '@/views/system/monitoring/Monitoring'
import ActiveUser from '@/views/system/monitoring/ActiveUser'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/system',
    name: 'System',
    component: System,
    children: [
      {
        path: '/system',
        name: 'Home',
        component: Home
      },
      {
        path: '/system/site/inform',
        name: 'Inform',
        component: Inform
      },
      {
        path: '/system/site/log',
        name: 'Log',
        component: Log
      },
      {
        path: '/system/department',
        name: 'department',
        component: Department
      },
      {
        path: '/system/department/post',
        name: 'Post',
        component: Post
      },
      {
        path: '/system/user',
        name: 'User',
        component: User
      },
      {
        path: '/system/user/auth',
        name: 'Auth',
        component: Auth
      },
      {
        path: '/system/info',
        name: 'Info',
        component: Info
      },
      {
        path: '/system/monitoring',
        name: 'Monitoring',
        component: Monitoring
      },
      {
        path: '/system/monitoring/user',
        name: 'ActiveUser',
        component: ActiveUser
      },
      {
        path: '/system/about',
        name: 'About',
        component: About
      },
      {
        path: '/system/*',
        name: 'NotFount',
        component: NotFount
      }
    ]
  },
  {
    path: '*',
    redirect: { name: 'Index' }
  }
  // ,
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/system/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
