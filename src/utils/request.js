// axios 请求模块
import axios from 'axios'
import jsonBig from 'json-bigint'
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

// 相应拦截器

export default request
