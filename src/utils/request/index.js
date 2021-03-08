import axios from 'axios'
// import QS from 'qs'
import { Message } from 'element-ui'
import router from '../../router'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 10000
})
// const responseTypeList = new Set(['blob', 'arraybuffer', 'stream'])

// post请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

instance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    token && (config.headers.Authorization = token)
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
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  err => {
    if (err.response.status) {
      switch (err.response.status){
        case 0:
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        case 403:
          sessionStorage.removeItem('token')
          Message.info('登录过期，请重新登录')
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        case 300:
          Message.error('您权限不足，请联系管理员')
          break
        default:
          Message.error(err.response.mes)
      }
    }
    return Promise.reject(err)
  }
)

export default instance
