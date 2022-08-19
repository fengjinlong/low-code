import request from './index'

// post
export function getList(data) {
  return request({
    url:'xxx',
    method:'POST',
    data
  })
}
// get
export function getList2(params) {
  return request({
    url:'xxx',
    method:'GET',
    params
  })
}

// 页面调用方式
// getList(p).then((res) => {
//   console.log(res);
// });
// getList2(p).then((res) => {
//   console.log(res);
// });