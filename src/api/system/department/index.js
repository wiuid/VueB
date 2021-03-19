import request from '@/utils/request/index'

export function getDepartmentList () {
  return request({
    url: '/system/department',
    method: 'get'
  })
}

export function getDepartmentById (id) {
  return request({
    url: '/system/department/select/id',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function getDepartmentSelect () {
  return request({
    url: '/system/department/select/tree',
    method: 'get'
  })
}

export function saveDepartment (params) {
  return request({
    url: '/system/department/save',
    method: 'post',
    data: params
  })
}

export function updateState (id) {
  return request({
    url: '/system/department/update/state',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function delectDepartment (id) {
  return request({
    url: '/system/department/delete',
    method: 'delete',
    params: {
      id: id
    }
  })
}
