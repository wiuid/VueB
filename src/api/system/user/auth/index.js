import request from '@/utils/request/index'

/**
 * 获取页面数据
 * @param {*} params
 * @returns
 */
export function getData (params) {
  return request({
    url: '/system/user/role',
    method: 'get',
    params
  })
}

/**
 * 根据id 获取详细信息
 * @param {*} id
 * @returns
 */
export function getRole (id) {
  return request({
    url: '/system/user/role/get',
    method: 'get',
    params: {
      id: id
    }
  })
}

/**
 * 获取数据用于其他api调用
 * @returns
 */
export function getRoleTree () {
  return request({
    url: '/system/user/role/tree',
    method: 'get'
  })
}

/**
 * 获取数据用于其他api调用
 * @returns
 */
export function getAuthTree () {
  return request({
    url: '/system/user/auth/tree',
    method: 'get'
  })
}

/**
 * 新建/修改 数据 一体接口
 * @param {*} params
 * @returns
 */
export function saveRole (params) {
  return request({
    url: '/system/user/role/save',
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
    url: '/system/user/role/state',
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
export function deleteRole (id) {
  return request({
    url: '/system/user/role/delete',
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
export function deleteRoles (ids) {
  return request({
    url: '/system/user/role/deletes',
    method: 'delete',
    params: {
      ids: ids
    }
  })
}
