import request from '@/utils/request/index'

/**
 * 获取页面数据
 * @param {*} params
 * @returns
 */
export function getData (params) {
  return request({
    url: '/system/site/log',
    method: 'get',
    params
  })
}
// 删除单条数据
export function deletetLog (id) {
  return request({
    url: '/system/site/log/delete',
    method: 'delete',
    params: {
      id: id
    }
  })
}

// 批量删除数据
export function deletetLogs (ids) {
  return request({
    url: '/system/site/log/deletes',
    method: 'delete',
    params: {
      ids: ids
    }
  })
}

// 导出数据
export function exportLog () {
  return request({
    url: '/system/site/log/export',
    method: 'get',
    responseType: 'blob'
  })
}

// 清空数据
export function emptyLog () {
  return request({
    url: '/system/site/log/empty',
    method: 'delete'
  })
}
