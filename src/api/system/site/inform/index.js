import request from '@/utils/request/index'

/**
 * 获取页面数据
 * @param {*} params
 * @returns
 */
export function getData (params) {
  return request({
    url: '/system/site/inform',
    method: 'get',
    params
  })
}

/**
 * 根据id 获取详细信息
 * @param {*} id
 * @returns
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
 * 根据id 获取详细信息， 首页接口
 * @param {*} id
 * @returns
 */
export function getInformByHome (id) {
  return request({
    url: '/system/site/inform/hget',
    method: 'get',
    params: {
      id: id
    }
  })
}

/**
 * 新建/修改 数据 一体接口
 * @param {*} params
 * @returns
 */
export function saveInform (params) {
  return request({
    url: '/system/site/inform/save',
    method: 'post',
    data: params
  })
}

/**
 * 删除单条数据
 * @param {*} id
 * @returns
 */
export function deleteInform (id) {
  return request({
    url: '/system/site/inform/delete',
    method: 'delete',
    params: {
      id: id
    }
  })
}

/**
 * 批量删除数据
 * @param {*} ids
 * @returns
 */
export function deleteInforms (ids) {
  return request({
    url: '/system/site/inform/deletes',
    method: 'delete',
    params: {
      ids: ids
    }
  })
}
