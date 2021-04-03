import request from '@/utils/request/index'

/**
 * 获取页面数据
 * @param {*} params
 * @returns
 */
export function getData (params) {
  return request({
    url: '/system/department/post',
    method: 'get',
    params
  })
}

export function getPostTree () {
  return request({
    url: '/system/department/post/tree',
    method: 'get'
  })
}

/**
 * 根据id 获取详细信息
 * @param {*} id
 * @returns
 */
export function getPost (id) {
  return request({
    url: '/system/department/post/get',
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
export function savePost (params) {
  return request({
    url: '/system/department/post/save',
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
    url: '/system/department/post/state',
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
export function deletePost (id) {
  return request({
    url: '/system/department/post/delete',
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
export function deletePosts (ids) {
  return request({
    url: '/system/department/post/deletes',
    method: 'delete',
    params: {
      ids: ids
    }
  })
}

/**
 * 导出岗位数据
 */
export function exportPost () {
  return request({
    url: '/system/department/post/export',
    method: 'get',
    responseType: 'blob'
  })
}
