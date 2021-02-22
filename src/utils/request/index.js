import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 180000
})
const responseTypeList = new Set(['blob', 'arraybuffer', 'stream'])

instance.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  response => {
    if (Object.prototype.hasOwnProperty.call(response.data, 'data')) {
      if (responseTypeList.has(response.config.responseType)) {
        return Promise.resolve(response)
      }
      return Promise.resolve(response.data)
    }
    return Promise.reject(response)
  },
  err => {
    return Promise.reject(err)
  }
)

export default instance
