<template>
  <el-menu router  class="el-menu-demo" mode="horizontal" @select="handleSelect" style="height: 60px">
    <el-menu-item class="" @click="off">
      <i class="el-icon-s-fold hidden-xs-only" v-if="close"></i>
      <i class="el-icon-s-unfold hidden-xs-only" v-if="open"></i>
      <i class="el-icon-s-unfold hidden-sm-and-up"></i>
    </el-menu-item>

    <el-menu-item class="hidden-xs-only">
        <el-breadcrumb separator="/" style="margin-top:20px">
          <el-breadcrumb-item :to="{ path: '/system' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="nav !== null">
            {{nav}}
          </el-breadcrumb-item>
        </el-breadcrumb>
    </el-menu-item>
    
    <el-submenu style="float: right" index="2">
      <template slot="title">
        <img  v-if="fullIf" :src="avatar" style="height:40px; wight:40px; border-radius: 10px"/>
      </template>
      <el-menu-item index="/system/info">个人中心</el-menu-item>
      <el-menu-item @click="logout">退出登录</el-menu-item>
    </el-submenu>
    <el-menu-item style="float: right" @click="full">
      <img v-if="fullIf" src="@/assets/icon/ic-enlarge.svg" title="全屏" height="20px">
      <img v-if="!fullIf" src="@/assets/icon/ic-narrow.svg" title="缩小" height="20px">
    </el-menu-item>
    <el-menu-item class="hidden-xs-only" style="float: right">
      <a href="https://github.com/wiuid/webraAdminA" target="_blank">
        <img src="@/assets/icon/ic-github.svg" title="后端地址" height="20px">
      </a>
    </el-menu-item>
    <el-menu-item class="hidden-xs-only" style="float: right">
      <a href="https://github.com/wiuid/VueA" target="_blank">
        <img src="@/assets/icon/ic-github.svg" title="前端地址" height="20px">
      </a>
    </el-menu-item>
    <el-menu-item class="hidden-xs-only" style="float: right">
      <a href="https://www.yuque.com/webra/admina" target="_blank">
        <img src="@/assets/icon/ic-document.svg" title="文档地址" height="20px">
      </a>
    </el-menu-item>
    <el-submenu class="hidden-sm-and-up" style="float: right" index="3">
      <template slot="title">
        <i class="el-icon-more-outline"></i>
      </template>
      <el-menu-item>
        <a href="https://www.yuque.com/webra/admina" target="_blank" style="text-decoration: none; color: #909399">
          <img src="@/assets/icon/ic-document.svg" title="文档地址" height="20px">
          <span style="padding-left: 15px">文档地址</span>
        </a>
      </el-menu-item>
      <el-menu-item>
        <a href="https://github.com/wiuid/VueA" target="_blank" style="text-decoration: none; color: #909399">
          <img src="@/assets/icon/ic-github.svg" title="前端地址" height="20px">
          <span style="padding-left: 15px">前端地址</span>
        </a>
      </el-menu-item>
      <el-menu-item>
        <a href="https://github.com/wiuid/webraAdminA" target="_blank" style="text-decoration: none; color: #909399">
          <img src="@/assets/icon/ic-github.svg" title="后端地址" height="20px">
          <span style="padding-left: 15px">后端地址</span>
        </a>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import screenfull from 'screenfull'
import { logout } from '@/api/login'
import { getAvatar } from '@/api/system/user/info'
export default {
  name: 'NavigationBarHeader',
  props: ['close', 'open', 'off'],
  data () {
    return {
      avatar: '',
      fullIf: true,
      nav: null
    }
  },
  watch: {
    $route: 'getNavList'
  },
  created () {
    this.getNavList()
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
    getNavList () {
      var title = this.$route.meta.title
      if (title === '首页') {
        this.nav = null
      } else {
        this.nav = title
      }
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
    },
    full () {
      screenfull.toggle()
      this.fullIf = !this.fullIf
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
