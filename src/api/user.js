// 专门处理users用户管理
// 引入
import axios from 'axios'

// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么?手动传递token
  // 1.获取token
  var token = localStorage.getItem('token')
  // 2.必须在请求头中使用 Authorization 字段提供 token 令牌
  config.headers['Authorization'] = token
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 实现用户登陆
export const login = (data) => {
  return axios({
    method: 'post',
    url: 'login',
    data
  })
}
// 获取用户数据列表
export const getUserList = (params) => {
  return axios({
    url: 'users',
    params
  })
}
// 添加用户数据
export const addUser = (data) => {
  return axios({
    method: 'post',
    url: 'users',
    data
  })
}
// 修改用户状态
export const upUserState = (uid, type) => {
  return axios({
    method: 'put',
    url: `users/${uid}/state/${type}`
  })
}
