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
import { getMonitoring } from '@/api/system/monitoring'
export default {
  name: 'Monitoring',
  mounted () {
    getMonitoring().then((result) => {
      if (result.data.status !== 200) {
        this.$message.error('您当前未登录')
      }
    }).catch((err) => {
      console.log('----------------------')
      console.log(err)
      // this.$message.error(err)
    })
  }
}
</script>

<style scoped>
  .marginB10px {
    margin-bottom: 10px;
  }
</style>
