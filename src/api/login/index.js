import request from '@/utils/request/index'

export function login (params) {
  return request({
    url: '/login',
    method: 'post',
    params
  })
}

export function logout () {
  return request({
    url: '/logout',
    method: 'get'
  })
}
