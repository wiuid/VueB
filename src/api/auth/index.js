import request from '@/utils/request/index'

export function getListAPI (params) {
  return request({
    url: '/hello',
    method: 'get',
    params
  })
}

// post请求
export function postFormAPI (params) {
  return request({
    url: '/postForm.json',
    method: 'post',
    params
  })
}
// put 请求
export function putSomeAPI (params) {
  return request({
    url: '/putSome.json',
    method: 'put',
    params
  })
}
// delete 请求
export function deleteListAPI (params) {
  return request({
    url: '/deleteList.json',
    method: 'delete',
    params
  })
}
