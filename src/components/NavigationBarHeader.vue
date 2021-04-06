<template>
  <el-menu router  class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item @click="off">
      <i v-if="close" class="el-icon-s-fold"></i>
      <i v-if="open" class="el-icon-s-unfold"></i>
    </el-menu-item>

    <el-submenu style="float: right" index="2">
      <template slot="title">
        <img :src="avatar" style="height:40px; wight:40px; border-radius: 10px"/>
      </template>
      <el-menu-item index="/system/info">个人中心</el-menu-item>
      <el-menu-item @click="logout">退出登录</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { logout } from '@/api/login'
import { getAvatar } from '@/api/system/user/info'
export default {
  name: 'NavigationBarHeader',
  props: ['close', 'open', 'off'],
  data () {
    return {
      avatar: ''
    }
  },
  mounted () {
    getAvatar().then((result) => {
      if (result.status === 200) {
        this.avatar = result.data.avatar
      }
    })
  },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
    },
    logout () {
      const token = sessionStorage.getItem('token')

      if (token !== null && token !== '') {
        const res = new Promise((resolve, reject) => {
          logout().then((result) => {
            resolve(result)
          }).catch((err) => {
            reject(err)
            this.$message.error(err)
          })
        })
        res.then((result) => {
          if (result.status === 200) {
            sessionStorage.removeItem('token')
            localStorage.removeItem('token')
            localStorage.removeItem('dynamicRouter')
            this.$router.replace('/login')
          } else {
            this.$message.info(result.msg)
          }
        }).catch(() => {
          this.$message.error('后端异常')
        })
      } else {
        this.$message.error('您当前未登录')
      }
    }
  }
}
</script>

<style scoped>
/* 去除顶栏选中后的蓝条 */
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
  border-bottom: 0 im !important;
}
.el-submenu.is-active .el-submenu__title {
    border-bottom-color: white !important;
}
</style>
