import request from '@/utils/request/index'

/**
 * 获取用户列表
 * @param {*} params 各种参数
 * @returns informList
 */
export function getUserList (params) {
  return request({
    url: '/system/user',
    method: 'get',
    params
  })
}

export function getUser (id) {
  return request({
    url: '/system/user/get',
    method: 'get',
    params: {
      id: id
    }
  })
}
