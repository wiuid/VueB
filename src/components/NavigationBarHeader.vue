<template>
  <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item><i class="el-icon-s-fold"></i></el-menu-item>
    <el-submenu style="float: right" index="2">
      <template slot="title">
        <img src="../assets/touxiang.gif" style="width: 40px;height: 40px">
      </template>
      <el-menu-item index="/system/info">个人中心</el-menu-item>
      <el-menu-item index="/">退出登录</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'NavigationBarHeader',
  data () {
    return {
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
</style>
