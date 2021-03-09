import request from '@/utils/request/index'

export function getMonitoring () {
  return request({
    url: '/system/monitoring',
    method: 'get'
  })
}
