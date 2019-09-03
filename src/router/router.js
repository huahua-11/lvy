import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由所对应的组件
// @:src  相当于Src目录
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Welcome from '@/views/Welcome.vue'
import Users from '@/views/user/index.vue'

Vue.use(VueRouter)

// 创建路由对象
var router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: { name: 'home' }
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      redirect: { path: '/home/wel' },
      // 嵌套路由 》》 对应着Home组件中的router-view
      children: [
        {
          path: 'wel',
          component: Welcome
        },
        {
          name: 'users',
          path: 'users',
          component: Users
        }
      ]
    }

  ]
})

export default router
