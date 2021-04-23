import request from '@/utils/request/index'

export function getData () {
  return request({
    url: '/system/monitoring/user',
    method: 'get'
  })
}

export function delData (Uuid) {
  return request({
    url: '/system/monitoring/user/del',
    method: 'post',
    data: {
      Uuid: Uuid
    }
  })
}
