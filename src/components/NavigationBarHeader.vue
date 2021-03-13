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
import router from '@/router'
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
      const sessionToken = sessionStorage.getItem('token')
      const localToken = localStorage.getItem('token')

      if (sessionToken !== null && localToken !== null) {
        logout().then((result) => {
          if (result.status === 200) {
            sessionStorage.removeItem('token')
            localStorage.removeItem('token')
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          } else {
            this.$message.error(result.msg)
          }
        }).catch((err) => {
          this.$message.error(err)
        })
      } else {
        this.$message.error('您当前未登录')
      }
    }
  }
}
</script>

<style scoped>
</style>
