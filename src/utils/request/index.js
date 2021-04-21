import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000
})
// const responseTypeList = new Set(['blob', 'arraybuffer', 'stream'])

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 请求拦截配置
instance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers.token = token
    }
    if (config.type === 'formData' || config.method !== 'post') {
      return config
    }
    config.data = qs.stringify(config.data)
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截
instance.interceptors.response.use(
  response => {
    // 第一版，看不懂，暂时注释
    // if (Object.prototype.hasOwnProperty.call(response.data, 'data')) {
    //   if (responseTypeList.has(response.config.responseType)) {
    //     return Promise.resolve(response)
    //   }
    //   return Promise.resolve(response.data)
    // }
    const res = response.data
    if (res.status === 200) {
      return Promise.resolve(res)
    } else if (response.headers['content-type'] === 'application/vnd.ms-excel;charset=utf-8') {
      return Promise.resolve(res)
    } else {
      if (res.status) {
        switch (res.status) {
          /**
           * 还未登录，跳转至登录页
           */
          case 0:
            router.replace('/login')
            // router.replace({
            //   path: '/login',
            //   query: {
            //     redirect: router.currentRoute.fullPath
            //   }
            // })
            break
            /**
             * token过期，清除本地token后跳转至登录页
             */
          case 201:
            // 警告消息
            Message.warning(res.msg)
            break
          case 202:
            // 一般消息
            Message.info(res.msg)
            break
          case 203:
            // 错误消息
            Message.error(res.msg)
            break
          case 403:
            // token 过期
            sessionStorage.removeItem('token')
            localStorage.removeItem('token')
            Message.warning(res.msg)
            router.replace('/login')
            break
          case 444:
            // 账户异常
            sessionStorage.removeItem('token')
            localStorage.removeItem('token')
            Message.error('账户异常')
            router.replace('/')
            break
          case 300:
            Message.error('您权限不足，请联系管理员')
            break
          default:
            Message.error(res.mes)
        }
      }

      return Promise.reject(res)
    }
  },
  err => {
    var e = err.toString()
    if (e.indexOf('403') !== -1) {
      Message.error('权限不足！！')
    }
    return Promise.reject(err)
  }
)

export default instance
