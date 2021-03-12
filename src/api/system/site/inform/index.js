import request from '@/utils/request/index'

export function getInform (params) {
  return request({
    url: '/system/site/inform',
    method: 'get',
    params
  })
}
