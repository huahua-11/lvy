// 1.引入vue
import Vue from 'vue'
// 2.引入你想展示的组件  路由
import router from '@/router/router.js'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'

// 所有模板的使用都需要use
Vue.use(ElementUI)
Vue.config.productionTip = false

// 添加路由导航守卫
router.beforeEach((to, from, next) => {
  // 获取token
  var token = localStorage.getItem('token')
  // 如果没有token值，除非你去登陆，否则都应该重定向到登陆
  if (token || to.path === '/login') {
    // 如果有token,那么就next
    next()
  } else if (!token && to.path !== '/login') {
    next({ name: 'login' })
  }
})
new Vue({
  // 注入
  router,
  render: h => h(App)
}).$mount('#app')
