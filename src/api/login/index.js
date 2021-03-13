import request from '@/utils/request/index'
import qs from 'qs'

export function login (params) {
  return request({
    url: '/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: qs.parse(params)
  })
}

export function logout () {
  return request({
    url: '/logout',
    method: 'get'
  })
}
