// 专门处理users用户管理

// 引入
import axios from 'axios'

// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 实现用户登陆
export const login = (data) => {
  return axios({
    method: 'post',
    url: 'login',
    data
  })
}
