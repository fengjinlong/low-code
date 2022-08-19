import request from './index'

// 查询列表
export function getList(data) {
  return request({
    url:'/materialinfo/list',
    method:'POST',
    data
  })
}
// 删除
export function deleteList(data) {
  return request({
    url:'/materialinfo/deleteBy',
    method:'POST',
    data
  })
}

// 查询单个数据
export function selectBy(data) {
  return request({
    url:'/materialinfo/selectBy',
    method:'POST',
    data
  })
}
// 多文件上传
export function uploadmulti(data) {
  return request({
    url:'/materialinfo/uploadmulti',
    method:'POST',
    headers: {
      authorization: 'authorization-text',
      // 'Content-Type': 'multipart/form-data;'


      // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary9LLlteGWzscL6RhG'
    },
    data
  })
}
