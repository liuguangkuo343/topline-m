// 用户相关的请求模块

import request from '../utils/request'
export const login = data => {
  return request({
    method: 'POST', // 请求方法
    url: ' /app/v1_0/authorizations', // 请求路径
    // headers: {}, // 请求头
    // params: {}, // 查询参数query
    data// body请求体参数
  })
}
export const getSmsCode = mobile => {
  return request({
    method: 'GET', // 请求方法
    url: `/app/v1_0/sms/codes/${mobile}` // 请求路径
    // headers: {}, // 请求头
    // params: {}, // 查询参数query
    // data// body请求体参数
  })
}
