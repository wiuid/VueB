<template>
  <el-col :span="12">
    <el-menu
      router
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <router-link to="/system">
        <div style="height: 50px;border-bottom: solid 1px #e6e6e6;padding: 5px 0">
          <img src="../assets/logo.png" style="height: 50px;width: 50px;"/>
          <span style="font-size: 20px;max-width: 150px;line-height: 1.7" >Webra</span>
        </div>
      </router-link>
      <el-menu-item index="/system">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="/system/site">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>站点管理</span>
        </template>
        <el-menu-item index="/system/site/inform">通知公告</el-menu-item>
        <el-menu-item index="/system/site/log">日志详情</el-menu-item>
      </el-submenu>
      <el-submenu index="/system/department">
        <template slot="title">
          <i class="el-icon-s-management"></i>
          <span>部门管理</span>
        </template>
        <el-menu-item index="/system/department">部门管理</el-menu-item>
        <el-menu-item index="/system/department/post">岗位管理</el-menu-item>
      </el-submenu>
      <el-submenu index="/system/user">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/system/user">用户管理</el-menu-item>
        <el-menu-item index="/system/user/auth">权限管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="/system/info">
        <i class="el-icon-s-order"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-submenu index="/system/monitoring">
        <template slot="title">
          <i class="el-icon-s-platform"></i>
          <span>系统监控</span>
        </template>
        <el-menu-item index="/system/monitoring">系统状态</el-menu-item>
        <el-menu-item index="/system/monitoring/user">在线用户</el-menu-item>
      </el-submenu>
      <el-menu-item index="/system/about">
        <i class="el-icon-s-flag"></i>
        <span slot="title">本站相关</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  name: 'NavigationBarAside',
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    border-right: solid 0 !important;
  }
</style>
