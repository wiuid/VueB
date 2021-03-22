<template>
  <div>
    <el-container style="height:100vh;">
      <!-- 侧边导航 -->
      <el-aside :width="navigationBarAsideWidth"  style="border-right: solid 1px #e6e6e6;  transition: all .5s">
        <NavigationBarAside :collapse="collapse"></NavigationBarAside>
      </el-aside>
      <el-container>
        <!-- 顶部导航 -->
        <el-header style="padding: 0">
          <NavigationBarHeader :close="nameHide" :open="collapse" :off="switchOff"></NavigationBarHeader>
        </el-header>
        <!-- 内容显示区 -->
        <el-main style="height:0;flex-grow:1;">
          <router-view/>
          <!-- 底栏 -->
          <el-footer style="padding: 0">
            <NavigationBarFooter></NavigationBarFooter>
          </el-footer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavigationBarFooter from '@/components/NavigationBarFooter'
import NavigationBarAside from '@/components/NavigationBarAside'
import NavigationBarHeader from '@/components/NavigationBarHeader'

export default {
  name: 'System',
  // 引入的三个模块
  components: { NavigationBarFooter, NavigationBarAside, NavigationBarHeader },
  data () {
    return {
      // 控制侧栏的展开和收缩
      navigationBarAsideWidth: '64px',
      collapse: true,
      nameHide: false
    }
  },
  methods: {
    // 侧栏的展开收缩控制方法
    switchOff () {
      this.collapse = !this.collapse
      this.nameHide = !this.nameHide
      this.navigationBarAsideWidth = this.navigationBarAsideWidth === '64px' ? '202px' : '64px'
    }
  }
}
</script>

<style scoped>
.el-aside, .el-header {
    box-shadow: 1px 3px 5px 0 rgb(0 0 0 / 10%) !important;
}
</style>
