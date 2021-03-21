import request from '@/utils/request/index'

export function getData () {
  return request({
    url: '/system/monitoring',
    method: 'get'
  })
}
