<template>
  <div>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="0">LOGO</el-menu-item>
          <el-menu-item index="1">交流社群</el-menu-item>
          <el-menu-item index="2">文档教程</el-menu-item>
          <el-menu-item index="3"><a href="/login">后台演示</a></el-menu-item>
        </el-menu>
      </el-header>

      <el-carousel height="500px" indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>

    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
