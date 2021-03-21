import request from '@/utils/request/index'

/**
 * 获取用户列表
 * @param {*} params 各种参数
 * @returns informList
 */
export function getRoleList (params) {
  return request({
    url: '/system/user/role',
    method: 'get',
    params
  })
}

export function getRole (id) {
  return request({
    url: '/system/user/role/get',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function getRoleTree () {
  return request({
    url: '/system/user/role/tree',
    method: 'get'
  })
}

export function getAuthTree () {
  return request({
    url: '/system/user/auth/tree',
    method: 'get'
  })
}

export function saveRole (params) {
  return request({
    url: '/system/user/role/save',
    method: 'post',
    data: params
  })
}

export function updateSwitch (id) {
  return request({
    url: '/system/user/role/state',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function deleteRole (id) {
  return request({
    url: '/system/user/role/delete',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function deleteRoles (ids) {
  return request({
    url: '/system/user/role/deletes',
    method: 'delete',
    params: {
      ids: ids
    }
  })
}
