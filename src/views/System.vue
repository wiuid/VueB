<template>
  <div>
    <el-container style="height:100vh;">
      <el-aside width="202px" style="border-right: solid 1px #e6e6e6">
        <NavigationBarAside></NavigationBarAside>
      </el-aside>
      <el-container>
        <el-header style="padding: 0">
          <NavigationBarHeader></NavigationBarHeader>
        </el-header>
        <el-main style="height:0;flex-grow:1;">
          <router-view/>
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
  components: { NavigationBarFooter, NavigationBarAside, NavigationBarHeader }
}
</script>

<style scoped>
</style>
