<template>
  <!-- 一个组件只有一个根元素 -->
  <div class="hello">你好啊，世界！！！{{msg}}</div>
</template>

<script>
// var Index = {template:''}
// export导出当前组件实例
// default:当前实例是默认实例，默认实例在这个文件被引入的时候会自动的导出
// {} 就是当前的组件对象
export default {
  // 不用写模板了，模板会自动的对应上面的template结构
  // 组件的data是一个函数
  data(){
      return {
          msg:'hello world!!!'
      }
  }
}
</script>

<style lang="less" scoped>
/* scoped：标记当前样式是局部作用域样式：说明这里面写的样式只有当前组件可以使用 */
</style>