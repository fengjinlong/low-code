import request from './index'

// 查询列表
export function getList(data) {
  return request({
    url:'/visualPage/list',
    method:'POST',
    data
  })
}
// 删除
export function deleteList(data) {
  return request({
    url:'/visualPage/deleteBy',
    method:'POST',
    data
  })
}
// 新增项目
// export function addList(data) {
//   return request({
//     url:'/visualPage/save',
//     method:'POST',
//     data
//   })
// }
// 标题修改
export function updateList(data) {
  return request({
    url:'/visualPage/update',
    method:'POST',
    data
  })
}
// 查询单个项目数据
export function selectBy(data) {
  return request({
    url:'/visualPage/selectBy',
    method:'POST',
    data
  })
}
