import request from '@/utils/request/index'

export function getPostList (params) {
  return request({
    url: '/system/department/post',
    method: 'get',
    params
  })
}

export function getPostById (id) {
  return request({
    url: '/system/department/post/get',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function savePost (params) {
  return request({
    url: '/system/department/post/save',
    method: 'post',
    data: params
  })
}

export function updatePostState (id) {
  return request({
    url: '/system/department/post/state',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function deletePost (id) {
  return request({
    url: '/system/department/post/delete',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function deletePosts (ids) {
  return request({
    url: '/system/department/post/deletes',
    method: 'delete',
    params: {
      ids: ids
    }
  })
}
