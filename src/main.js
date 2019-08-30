// 1.引入vue
import Vue from 'vue'
// 2.引入你想展示的组件
import Hello from './components/HelloWorld.vue'

new Vue ({
    el: '#app'
    // 在Vue中有一个内置的render函数，它可以实现渲染
    // 函数有一个参数，这个参数是一个真正能够进行渲染的函数，我们所需要做的就是将这个渲染的结构返回
    render: (fn) => {
        // fn会渲染指定的组件内容，并将渲染的结果返回
        return fn(Hello);
    }
})