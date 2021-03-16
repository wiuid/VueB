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
              <img src="@/assets/icon/ic-github.svg" height="30px"/>
            </a>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="marginB10px">
            <div slot="header" class="clearfix">
              <span>联系方式<small> 有任何相关技术问题均可以添加询问</small></span>
            </div>
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="邮箱" name="1">
                <div>li_zhm@qq.com</div>
              </el-collapse-item>
              <el-collapse-item title="微信" name="2">
                <div>yu5921jing</div>
              </el-collapse-item>
              <el-collapse-item title="QQ群" name="3">
                <div>693365092   <el-link href="https://jq.qq.com/?_wv=1027&k=znMesECm" target="_blank">直达连接</el-link></div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="marginB10px">
            <div slot="header" class="clearfix">
              <span>技术选型</span>
            </div>
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-card class="marginB10px">
            <div slot="header" class="clearfix">
              <span><del>捐赠支持</del><small> 欢迎白嫖 </small></span>
            </div>
            <img src="@/assets/images/w-money.png" height="250px" title="微信收款码">
            <img src="@/assets/images/z-money.jpg" height="250px" title="支付宝收款码">
          </el-card>
        </el-row>
        <el-row>
          <el-card class="marginB10px">
            <div slot="header" class="clearfix">
              <span>版本更新日志</span>
            </div>
            <el-collapse v-model="activeName1" accordion>
              <el-collapse-item title="0.1.0" name="1">
                <div>1、图表、信息展示</div>
                <div>2、角色、权限、左侧导航栏控制</div>
                <div>3、数据管理及导出</div>
                <div>4、系统状态监控</div>
              </el-collapse-item>
            </el-collapse>
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
  name: 'About',
  data () {
    return {
      activeName: 1,
      activeName1: 1,
      data: [{
        label: '前端',
        children: [
          {
            label: 'Vue2.0'
          },
          {
            label: 'Element'
          },
          {
            label: '其他组件',
            children: [{
              label: '路由：Router'
            }, {
              label: '交互：Axios'
            }, {
              label: '图表：Echarts'
            }, {
              label: '图标：Element+Iconfont+官网Favicon'
            }, {
              label: '树形选择：TreeSelect'
            }
            ]
          }
        ]
      }, {
        label: '后端',
        children: [{
          label: '语言：Java'
        }, {
          label: '框架：SpringBoot',
          children: [{
            label: '安全：SpringSecurity'
          }]
        }, {
          label: '持久框架：MybatisPlus'
        }, {
          label: '分页：PageHelper'
        }, {
          label: '驱动：MySql'
        }, {
          label: '状态监控：Oshi'
        }, {
          label: 'Token：Jjwt'
        }
        ]
      }]
    }
  }
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
