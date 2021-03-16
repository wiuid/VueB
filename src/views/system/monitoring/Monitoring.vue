<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-row>
          <el-card class="marginB10px">
            <div slot="header" class="clearfix">
              <span>CPU</span>
            </div>
            <div class="fontSize14">
              <el-row>
                <el-col span="12">核心</el-col>
                <el-col span="12">{{cpu.kernel}}</el-col>
              </el-row>
              <el-divider class="dividerHeight"></el-divider>
              <el-row>
                <el-col span="12">逻辑处理器</el-col>
                <el-col span="12">{{cpu.logicalProcessor}}</el-col>
              </el-row>
              <el-divider class="dividerHeight"></el-divider>
              <el-row>
                <el-col span="12">使用率</el-col>
                <el-col span="12">{{cpu.usageRate}}</el-col>
              </el-row>
              <el-divider class="dividerHeight"></el-divider>
              <el-row>
                <el-col span="12">空闲率</el-col>
                <el-col span="12">{{cpu.vacancyRate}}</el-col>
              </el-row>
            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="marginB10px">
            <div slot="header" class="clearfix">
              <span>服务器信息</span>
            </div>
            <div class="fontSize14">
              <el-row>
                <el-col span="12">运行时长</el-col>
                <el-col span="12">{{system.date}}</el-col>
              </el-row>
              <el-divider class="dividerHeight"></el-divider>
              <el-row>
                <el-col span="12">主机名</el-col>
                <el-col span="12">{{system.hostname}}</el-col>
              </el-row>
              <el-divider class="dividerHeight"></el-divider>
              <el-row>
                <el-col span="12">地址</el-col>
                <el-col span="12">{{system.ip}}</el-col>
              </el-row>
              <el-divider class="dividerHeight"></el-divider>
              <el-row>
                <el-col span="12">系统</el-col>
                <el-col span="12">{{system.system}}</el-col>
              </el-row>
              <el-divider class="dividerHeight"></el-divider>
              <el-row>
                <el-col span="12">版本</el-col>
                <el-col span="12">{{system.version}}</el-col>
              </el-row>
            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="marginB10px">
            <div slot="header" class="clearfix">
              <span>Java虚拟机信息</span>
            </div>
            <div class="fontSize14">
              <el-row>
                <el-col span="12">版本</el-col>
                <el-col span="12">{{jvm.version}}</el-col>
              </el-row>
              <el-divider class="dividerHeight"></el-divider>
              <el-row>
                <el-col span="12">运行时间</el-col>
                <el-col span="12">{{jvm.date}}</el-col>
              </el-row>
              <el-divider class="dividerHeight"></el-divider>
              <el-row>
                <el-col span="12">堆初始大小</el-col>
                <el-col span="12">{{jvm.memorySize}}M</el-col>
              </el-row>
              <el-divider class="dividerHeight"></el-divider>
              <el-row>
                <el-col span="12">堆最大</el-col>
                <el-col span="12">{{jvm.memoryMax}}M</el-col>
              </el-row>
            </div>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-card class="marginB10px">
            <div slot="header" class="clearfix">
              <span>内存</span>
            </div>
            <div class="fontSize14">
              <el-row>
                <el-col span="12">大小</el-col>
                <el-col span="12">{{memory.total}}M</el-col>
              </el-row>
              <el-divider class="dividerHeight"></el-divider>
              <el-row>
                <el-col span="12">已用</el-col>
                <el-col span="12">{{memory.current}}M</el-col>
              </el-row>
              <el-divider class="dividerHeight"></el-divider>
              <el-row>
                <el-col span="12">空闲</el-col>
                <el-col span="12">{{memory.available}}M</el-col>
              </el-row>
              <el-divider class="dividerHeight"></el-divider>
              <el-row>
                <el-col span="12">使用率</el-col>
                <el-col span="12">{{memory.usageRate}}</el-col>
              </el-row>
            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="marginB10px">
            <div slot="header" class="clearfix">
              <span>磁盘状态</span>
            </div>
            <div class="fontSize14">
              <!-- <el-divider class="dividerHeight"></el-divider> -->
              {{disk.partitions}}
            </div>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="marginB10px">
            <div class="fontSize14">
              <p>本页面的数据是通过后台接入的插件而实现的，该插件名为·oshi·</p>
              <p>github传送门：<a href="https://github.com/oshi/oshi" target="_blank">
              <img src="@/assets/icon/ic-github.svg" height="30px"/></a></p>
              <p>Jvm的数据是通过Java自带的ManagementFactory查询获得的</p>
            </div>
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
  data () {
    return {
      cpu: {},
      disk: {},
      memory: {},
      system: {},
      jvm: {}
    }
  },
  mounted () {
    getMonitoring().then((result) => {
      this.cpu = result.data.cpu
      this.disk = result.data.disk
      this.memory = result.data.memory
      this.system = result.data.system
      this.jvm = result.data.jvm
    }).catch((err) => {
      this.$message.error(err)
    })
  }
}
</script>

<style scoped>
  .marginB10px {
    margin-bottom: 10px;
  }
  .dividerHeight {
    height: 1px;
    margin: 5px 0;
  }
  .fontSize14 {
    font-size: 14px;
  }
</style>
