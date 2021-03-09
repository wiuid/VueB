<template>
  <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item><i class="el-icon-s-fold"></i></el-menu-item>
    <el-submenu style="float: right" index="2">
      <template slot="title">
        <img src="../assets/images/touxiang.gif" style="width: 40px;height: 40px">
      </template>
      <el-menu-item index="/system/info">个人中心</el-menu-item>
      <el-menu-item @click="logout">退出登录</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { logout } from '@/api/login'
export default {
  name: 'NavigationBarHeader',
  data () {
    return {
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {
      logout().then((result) => {
        if (result.data.status === 200) {
          sessionStorage.removeItem('token')
        } else {
          this.$message.error(result.data.msg)
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style scoped>
</style>
