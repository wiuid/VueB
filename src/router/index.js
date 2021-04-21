import Vue from 'vue'
import VueRouter from 'vue-router'
const _import = require('./_import_production.js')

Vue.use(VueRouter)
console.log('-------------------------vue-router-index.js')
// 默认路由
const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/login',
    // component: () => import('@/views/Index'),
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
]

// 动态路由

// 判断当前时候存在动态路由，如果存在 合并默认路由，并对动态路由部分进行格式化
var dynamicRouter = JSON.parse(localStorage.getItem('dynamicRouter'))
if (dynamicRouter) {
  // 定义一个列表用于存储动态路由
  var defaultLoginRoutes = [
    {
      path: '/system/site/inform/edit',
      name: 'Edit',
      component: 'system/site/Edit',
      title: '公告发布'
    },
    {
      path: '/system/site/inform/edit/*',
      name: 'Edit',
      component: 'system/site/Edit',
      title: '公告编辑'
    },
    {
      path: '/system/info',
      name: 'Info',
      component: 'system/Info',
      title: '个人信息'
    },
    {
      path: '/system/**',
      name: 'NotFount',
      component: 'system/NotFount',
      title: '404-您输入的网页有误'
    }
  ]
  dynamicRouter.filter(route => {
    if (route.children) {
      route.children.filter(route1 => {
        routes[2].children.push(route1)
      })
    } else {
      routes[2].children.push(route)
    }
  })
  // 添加个人信息和404页
  for (let index = 0; index < defaultLoginRoutes.length; index++) {
    routes[2].children.push(defaultLoginRoutes[index])
  }
  filterAsyncRouter(routes[2].children)
}

routes[2].children.unshift(
  {
    path: '/system',
    name: 'Home',
    component: () => import('@/views/system/Home'),
    // component: 'system/Home',
    // title: '首页'
    meta: {
      title: '首页'
    }
  }
)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.addRoutes(dynamicRouter)

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router

function filterAsyncRouter (asyncRouterMap) { // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      // 赋予属性以json数据
      // eval("route.meta={title: '" + route.title + "'}")
      route.meta = JSON.parse('{"title": "' + route.title + '"}')
      // 原数据清空
      route.title = undefined
      // 字符串路径化
      route.component = _import(route.component)
    }
    // 套娃
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}
