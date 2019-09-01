import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由所对应的组件
// @:src  相当于Src目录
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

// 创建路由对象
var router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: { name: 'login' }
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/home',
      component: Home
    }

  ]
})

export default router
