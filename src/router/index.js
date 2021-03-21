import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index'),
    meta: {
      title: 'webraAdmin'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/system',
    name: 'System',
    component: () => import('@/views/System'),
    children: [
      {
        path: '/system',
        name: 'Home',
        component: () => import('@/views/system/Home'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/system/site/inform',
        name: 'Inform',
        component: () => import('@/views/system/site/Inform'),
        meta: {
          title: '通知公告'
        }
      },
      {
        path: '/system/site/log',
        name: 'Log',
        component: () => import('@/views/system/site/Log'),
        meta: {
          title: '日志详情'
        }
      },
      {
        path: '/system/department',
        name: 'department',
        component: () => import('@/views/system/department/Department'),
        meta: {
          title: '部门管理'
        }
      },
      {
        path: '/system/department/post',
        name: 'Post',
        component: () => import('@/views/system/department/Post'),
        meta: {
          title: '岗位管理'
        }
      },
      {
        path: '/system/user',
        name: 'User',
        component: () => import('@/views/system/user/User'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: '/system/user/auth',
        name: 'Auth',
        component: () => import('@/views/system/user/Auth'),
        meta: {
          title: '权限管理'
        }
      },
      {
        path: '/system/info',
        name: 'Info',
        component: () => import('@/views/system/Info'),
        meta: {
          title: '个人信息'
        }
      },
      {
        path: '/system/monitoring',
        name: 'Monitoring',
        component: () => import('@/views/system/monitoring/Monitoring'),
        meta: {
          title: '系统监控'
        }
      },
      {
        path: '/system/monitoring/user',
        name: 'ActiveUser',
        component: () => import('@/views/system/monitoring/ActiveUser'),
        meta: {
          title: '在线用户'
        }
      },
      {
        path: '/system/about',
        name: 'About',
        component: () => import('@/views/system/About'),
        meta: {
          title: '本站相关'
        }
      },
      {
        path: '/system/**',
        name: 'NotFount',
        component: () => import('@/views/system/NotFount'),
        meta: {
          title: '404-您输入的网页有误'
        }
      }
    ]
  },
  {
    path: '/**',
    name: 'NotFount',
    component: () => import('@/views/NotFount'),
    meta: {
      title: '404-您输入的网页有误'
    }
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
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
