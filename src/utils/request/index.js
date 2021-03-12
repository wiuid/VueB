import axios from 'axios'
import { Message } from 'element-ui'
import router from '../../router'

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000
})
// const responseTypeList = new Set(['blob', 'arraybuffer', 'stream'])

// post请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

instance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers.token = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

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
    } else {
      if (res.status) {
        switch (res.status) {
          /**
           * 还未登录，跳转至登录页
           */
          case 0:
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
            break
            /**
             * token过期，清除本地token后跳转至登录页
             */
          case 403:
            sessionStorage.removeItem('token')
            localStorage.removeItem('token')
            Message.info('登录过期，请重新登录')
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
            break
            /**
             * 权限不足，进行提示即可
             */
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
    Message.error(err)
    return Promise.reject(err)
  }
)

export default instance
