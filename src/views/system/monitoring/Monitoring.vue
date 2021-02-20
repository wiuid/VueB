<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-row>
          <el-card class="marginB10px">
            <div slot="header" class="clearfix">
              <span>CPU</span>
            </div>
            <el-divider></el-divider>
            <el-divider></el-divider>
            <el-divider></el-divider>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="marginB10px">
            <div slot="header" class="clearfix">
              <span>服务器信息</span>
            </div>
            <el-divider></el-divider>
            <el-divider></el-divider>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="marginB10px">
            <div slot="header" class="clearfix">
              <span>Java虚拟机信息</span>
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
              <span>内存</span>
            </div>
            <el-divider></el-divider>
            <el-divider></el-divider>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="marginB10px">
            <div slot="header" class="clearfix">
              <span>磁盘状态</span>
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
export default {
  name: 'Monitoring'
}
</script>

<style scoped>
  .marginB10px {
    margin-bottom: 10px;
  }
</style>
