import axios from 'axios'

export function request(config) {
    // 1. 创建axios的实例
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/wh',
    timeout: 5000
  })

  instance.interceptors.request.use(config => {
    return config; // 所以这里必须返回回去
  }, err => {
    // console.log(err)
  })

  instance.interceptors.response.use(res => {
    // console.log(res)
    return res.data // 做些处理返回data数据
  }, err => {
    console.log(err)
  })

  // 3. 发送真正的网络请求
  return instance(config)
}
