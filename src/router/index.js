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
    component: Index,
    meta: {
      title: 'webraAdmin'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/system',
    name: 'System',
    component: System,
    children: [
      {
        path: '/system',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页'
        }
      },
      {
        path: '/system/site/inform',
        name: 'Inform',
        component: Inform,
        meta: {
          title: '通知公告'
        }
      },
      {
        path: '/system/site/log',
        name: 'Log',
        component: Log,
        meta: {
          title: '日志详情'
        }
      },
      {
        path: '/system/department',
        name: 'department',
        component: Department,
        meta: {
          title: '部门管理'
        }
      },
      {
        path: '/system/department/post',
        name: 'Post',
        component: Post,
        meta: {
          title: '岗位管理'
        }
      },
      {
        path: '/system/user',
        name: 'User',
        component: User,
        meta: {
          title: '用户管理'
        }
      },
      {
        path: '/system/user/auth',
        name: 'Auth',
        component: Auth,
        meta: {
          title: '权限管理'
        }
      },
      {
        path: '/system/info',
        name: 'Info',
        component: Info,
        meta: {
          title: '个人信息'
        }
      },
      {
        path: '/system/monitoring',
        name: 'Monitoring',
        component: Monitoring,
        meta: {
          title: '系统监控'
        }
      },
      {
        path: '/system/monitoring/user',
        name: 'ActiveUser',
        component: ActiveUser,
        meta: {
          title: '在线用户'
        }
      },
      {
        path: '/system/about',
        name: 'About',
        component: About,
        meta: {
          title: '本站相关'
        }
      },
      {
        path: '/system/*',
        name: 'NotFount',
        component: NotFount,
        meta: {
          title: '404-您输入的网页有误'
        }
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
