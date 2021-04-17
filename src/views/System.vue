<template>
  <div>
    <el-container style="height:100vh;">
      <!-- 侧边导航 -->
      <el-aside class="hidden-xs-only" :width="navigationBarAsideWidth"  style="border-right: solid 1px #e6e6e6;transition: all .5s">
        <NavigationBarAside :collapse="collapse"></NavigationBarAside>
      </el-aside>
      <el-container>
        <!-- 顶部导航 -->
        <el-header style="padding: 0">
          <NavigationBarHeader class="hidden-xs-only" :close="!collapse" :open="collapse" :off="switchOff"></NavigationBarHeader>
          <NavigationBarHeader class="hidden-sm-and-up" :open="draw" :off="switchOffx"></NavigationBarHeader>
        </el-header>
        <!-- 内容显示区 -->
        <el-main style="height:0;flex-grow:1;">
          <router-view :key="key"></router-view>
          <!-- 底栏 -->
          <el-footer style="padding: 0">
            <NavigationBarFooter></NavigationBarFooter>
          </el-footer>
        </el-main>
      </el-container>
    </el-container>
    <!-- 窄屏适配导航栏 -->
    <el-drawer
      :visible.sync="draw"
      size="200"
      :show-close="false"
      :before-close="drawClose"
      :direction="'ltr'">
      <NavigationBarAside :collapse="false"></NavigationBarAside>
    </el-drawer>
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
      key: this.$route.path + Math.random(),
      draw: false
    }
  },
  watch: { // 如果路由有变化，会再次执行该方法
    $route: 'drawClose'
  },
  methods: {
    // 侧栏的展开收缩控制方法
    switchOff () {
      this.collapse = !this.collapse
      this.navigationBarAsideWidth = this.navigationBarAsideWidth === '64px' ? '202px' : '64px'
    },
    switchOffx () {
      this.draw = !this.draw
    },
    drawClose () {
      this.draw = false
    }
  }
}
</script>

<style>
.el-aside, .el-header {
    box-shadow: 1px 3px 5px 0 rgb(0 0 0 / 10%) !important;
}

.el-drawer__header {
    margin-bottom: 0 !important;
    padding: 0 !important;
}
</style>
