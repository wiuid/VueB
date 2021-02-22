<template>
  <div class="about">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-row>
          <el-card class="marginB10px">
            <div slot="header" class="clearfix">
              <span>Webra后台管理框架A</span>
            </div>
            <span style="font-size: 12px; color: #676a6c">
              自己是个小白，想着用别人的，可能对于整个后台架构而言，自己是不熟悉的，索性自己的开始写一套，帮助自己更好的理解VUE框架及相关组件的知识。
              <br/>
              本站是<b>免费开源</b>的，所以您可以通过Github来拉取代码，对该项目进行深度的自定义支持
              <h6>当前版本：0.1.0</h6>
            </span>
            <span style="font-size: 16px; color: #676a6c">传送门：</span>
            <a href="https://github.com/wiuid/VueA" target="_blank">
              <img src="~icon/ic-github.svg" height="30px"/>
            </a>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="marginB10px">
            <div slot="header" class="clearfix">
              <span>联系方式</span>
            </div>
            <el-divider></el-divider>
            <el-divider></el-divider>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="marginB10px">
            <div slot="header" class="clearfix">
              <span>技术选型</span>
            </div>
            <el-divider></el-divider>
            <el-divider></el-divider>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-card class="marginB10px">
            <div slot="header" class="clearfix">
              <span>捐赠支持</span>
            </div>
            <el-divider></el-divider>
            <el-divider></el-divider>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="marginB10px">
            <div slot="header" class="clearfix">
              <span>更新日志</span>
            </div>
            <el-divider></el-divider>
            <el-divider></el-divider>
            <el-divider></el-divider>
            <el-divider></el-divider>
            <el-divider></el-divider>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'About'
  // components: {
  //   HelloWorld
  // }
}
</script>
<style scoped>
  .marginB10px {
    margin-bottom: 10px;
  }
</style>
