import request from '@/utils/request/index'

export function getData () {
  return request({
    url: '/system/info',
    method: 'get'
  })
}

export function updateInfo (params) {
  return request({
    url: '/system/info/save',
    method: 'post',
    data: params
  })
}

export function updatePassword (params) {
  return request({
    url: '/system/info/password',
    method: 'post',
    data: params
  })
}
