

import request from './index'
export function save(data) {
  return request({
    url:'/visualPage/save',
    method:'POST',
    data
  })
}
export function selectBy(data) {
  return request({
    url:'/visualPage/selectBy',
    method:'POST',
    data
  })
}
export function update(data) {
  return request({
    url:'/visualPage/update',
    method:'POST',
    data
  })
}
export function publish(data) {
  return request({
    url:'/visualPage/publish',
    method:'POST',
    data
  })
}
export function selectByPageId(data) {
  return request({
    url:'/visualPage/selectByPageId',
    method:'POST',
    data
  })
}
// 保存 生成画布图片
export function saveScreenshot(data) {
  return request({
    url:'/visualPage/saveScreenshot',
    method:'POST',
    data
  })
}