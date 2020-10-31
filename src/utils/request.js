
// 请求模块
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

// JSONbig可以处理数据中超出JavaScript安全整数范围的问题
// JSONBig.parse()//把JSON格式的字符串转为JavaScript对象
// JSONBig.stringify()//把JavaScript格式的字符串转为JSON格式字符串

const request = axios.create({
  // 接口的基准路径
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 自定义后端返回的原始数据
  // data:后端返回的原始数据
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  // axios默认会在内部这样来处理后端返回的数据
  // return JSON.parse(data)
  }]
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 请求发起会经过这里
  return config
}, function (error) {
  // 如果请求出错了（还没发出去）
  return Promise.reject(error)
})
// 响应拦截器

export default request
