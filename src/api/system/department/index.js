import request from '@/utils/request/index'

/**
 * 获取页面数据
 * @returns
 */
export function getData () {
  return request({
    url: '/system/department',
    method: 'get'
  })
}

/**
 * 根据id 获取详细信息
 * @param {*} id
 * @returns
 */
export function getDepartment (id) {
  return request({
    url: '/system/department/get',
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
export function getDepartmentTree () {
  return request({
    url: '/system/department/tree',
    method: 'get'
  })
}

/**
 * 新建/修改 数据 一体接口
 * @param {*} params
 * @returns
 */
export function saveDepartment (params) {
  return request({
    url: '/system/department/save',
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
    url: '/system/department/state',
    method: 'post',
    data: {
      id: id
    }
  })
}

/**
 * 删除单条数据（包含下级）
 * @param {*} id
 * @returns
 */
export function delectDepartment (id) {
  return request({
    url: '/system/department/delete',
    method: 'delete',
    params: {
      id: id
    }
  })
}
