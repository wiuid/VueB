import request from '@/utils/request/index'

export function getDepartmentList () {
  return request({
    url: '/system/department',
    method: 'get'
  })
}
