import request from '@/utils/request/index'

/**
 * 获取页面数据
 * @param {*} params
 * @returns
 */
export function getData (params) {
  return request({
    url: '/system/user',
    method: 'get',
    params
  })
}

/**
 * 根据id 获取详细信息
 * @param {*} id
 * @returns
 */
export function getUser (id) {
  return request({
    url: '/system/user/get',
    method: 'get',
    params: {
      id: id
    }
  })
}
