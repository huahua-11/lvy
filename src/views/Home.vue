<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div class="logo"></div>
        <el-menu
          :router="true"
          :unique-opened="true"
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#fe7f27"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/home/users">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>

            <el-menu-item index="2-1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>

            <el-menu-item index="3-1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="3-2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>

            <el-menu-item index="4-1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="4-2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计管理</span>
            </template>

            <el-menu-item index="5-1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="5-2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="myicon myicon-menu toggle-btn"></span>
          <h1 class="system-title">好易购后台管理系统</h1>
          <div class="welcome">
            <span>欢迎你</span> &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="javascript:;">退出</a>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/myimg/2.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
