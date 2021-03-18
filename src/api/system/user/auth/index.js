import request from '@/utils/request/index'

/**
 * 获取用户列表
 * @param {*} params 各种参数
 * @returns informList
 */
export function getRoleList (params) {
  return request({
    url: '/system/user/auth',
    method: 'get',
    params
  })
}

export function getRoleAllIdTitle () {
  return request({
    url: '/system/user/auth/id/title',
    method: 'get'
  })
}
