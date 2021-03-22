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
export function getUsertTree () {
  return request({
    url: '/system/user/tree',
    method: 'get'
  })
}

/**
 * 新建/修改 数据 一体接口
 * @param {*} params
 * @returns
 */
 export function saveUser (params) {
  return request({
    url: '/system/user/save',
    method: 'post',
    data: params
  })
}

/**
 * 更新数据状态
 * @param {*} id
 * @returns
 */
 export function updateState (id) {
  return request({
    url: '/system/user/state',
    method: 'post',
    data: {
      id: id
    }
  })
}

/**
 * 删除单条数据
 * @param {*} id
 * @returns
 */
 export function deleteUser (id) {
  return request({
    url: '/system/user/delete',
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
export function deleteUsers (ids) {
  return request({
    url: '/system/user/deletes',
    method: 'delete',
    params: {
      ids: ids
    }
  })
}
