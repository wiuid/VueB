import request from '@/utils/request/index'

/**
 * 获取公告列表
 * @param {*} params 各种参数
 * @returns informList
 */
export function getInformList (params) {
  return request({
    url: '/system/site/inform/get/list',
    method: 'get',
    params
  })
}

/**
 * 获取单条数据的详细信息
 * @param {*} params  id
 * @returns inform
 */
export function getInform (id) {
  return request({
    url: '/system/site/inform/get',
    method: 'get',
    params: {
      id: id
    }
  })
}

/**
 * 新建/修改 单条 数据
 * @param {*} params  params
 * @returns inform
 */
export function saveInform (params) {
  return request({
    url: '/system/site/inform/save',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params
  })
}