<template>
  <el-col :span="12">
    <el-menu
      :collapse="collapse"
      router
      class="el-menu-vertical-demo"
      unique-opened
      @open="handleOpen"
      @close="handleClose">
      <router-link to="/system">
        <div class="logo">
          <img  class="logoImage" src="../assets/images/logo.png" style="height: 50px;width: 50px;"/>
          <span v-if="!collapse" class="logoText">Webra</span>
        </div>
      </router-link>
      <el-menu-item index="/system">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <template v-for="item in aside">
        <el-submenu v-if="item.children" :index="item.path" :key="item.path">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item
            v-for="(items, key) in item.children"
            :key="key"
            :index="items.path">
            {{ items.title }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.path" :key="item.path">
          <i :class="item.icon"></i>
          <span span slot="title">{{item.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  name: 'NavigationBarAside',
  props: ['collapse'],
  data () {
    return {
      isCollapse: true,
      aside: []
    }
  },
  created () {
    this.aside = JSON.parse(localStorage.getItem('dynamicRouter'))
    console.log('侧栏对象----------------------')
    console.log(this.aside)
    console.log('侧栏对象----------------------')
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
  .logo:hover {
    color: black;
  }
  .logo {
    width:100%;
    height: 60px;
    position:relative;
    border-bottom: solid 1px #e6e6e6;
  }
  .logoImage {
    margin: 5px 7px;
  }
  .logoText {
    color: black;
    font-size: 25px;
    margin: 25px 0 25px 60px;
    display: block;
    position: absolute;
    top: -10px;
  }
</style>
