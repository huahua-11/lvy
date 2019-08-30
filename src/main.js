// 1.引入vue
import Vue from 'vue'
// 2.引入你想展示的组件  路由
import router from '@/router/router.js'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 所有模板的使用都需要use
Vue.use(ElementUI)
new Vue({
  // 注入
  router,
  render: h => h(App)
}).$mount('#app')
