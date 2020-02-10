// axios 请求模块
import axios from 'axios'
import jsonBig from 'json-bigint'
// 在JavaScript模块中直接import 获取容器就可以
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// axios 专门提供的一个api 支持由用户决定如何转换后端返回的数据
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    return {}
  }
}]

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 统一设置 Token
  const { user } = store.state
  if (user) {
    // 后端要求把token 放到请求头中, 使用名字 Authorization 指定
    // config.headers 用啦获取本次的请求头,这是axios 的固定api
    // 注意,后端要求的token 数据格式为Bearer tokeen数据 要注意bearer 后面有一个空格
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.request.use(function (config) {
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default request
