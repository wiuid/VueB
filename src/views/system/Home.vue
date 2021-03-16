<template>
  <div>
    <el-row>
      <!--基础信息展示-->
      <el-col :span="15" :xs="24">
        <el-col :span="12" :xs="24">
          <el-card class="card-home" shadow="hover">
            <el-row :gutter="20">
              <el-col :span="12">
                <img src="@/assets/images/user.png" style="max-height: 60px"/>
              </el-col>
              <el-col :span="12" style="float:right;">
                <el-row>人员情况1</el-row>
                <el-row>xxxxxx</el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-card class="card-home" shadow="hover">
            <el-row :gutter="20">
              <el-col :span="12">
                <img src="@/assets/images/user.png" style="max-height: 60px"/>
              </el-col>
              <el-col :span="12" style="float:right;">
                <el-row>人员情况2</el-row>
                <el-row>xxxxxx</el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-card class="card-home" shadow="hover">
            <el-row :gutter="20">
              <el-col :span="12">
                <img src="@/assets/images/user.png" style="max-height: 60px"/>
              </el-col>
              <el-col :span="12" style="float:right;">
                <el-row>人员情况3</el-row>
                <el-row>xxxxxx</el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12" :xs="24">
          <el-card class="card-home" shadow="hover">
            <el-row :gutter="20">
              <el-col :span="12">
                <img src="@/assets/images/user.png" style="max-height: 60px"/>
              </el-col>
              <el-col :span="12" style="float:right;">
                <el-row>人员情况4</el-row>
                <el-row>xxxxxx</el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-col>
      <!--管理公告！-->
      <el-col :span="9" :xs="24"><el-card style="height: 220px;margin: 10px;flex-grow:1;" shadow="hover" >
        <el-row><span>网站公示板</span>
          <el-link :underline="false" type="primary" title="更多公告" @click="searchInform">
            <i class="el-icon-more-outline" style="padding: 0 10px"></i>
          </el-link>
        </el-row>
        <hr/>
        <el-row>
          <!--最多6条公告-->
          <el-row v-for="item in newTableData" :key="item.id">
            <!--white-space: nowrap;  强制不换行
            display: inline-block;    将span当做块级元素对待
            width: 100%;            宽度限制
            overflow: hidden;       超出隐藏
            text-overflow: ellipsis; 超出部分用。。。 代替
            -->
            <el-col :span="12">
              <el-link type="primary"
              :underline="false" @click="viewInform($event)"
              style="white-space: nowrap;display: inline-block; width: 100%; overflow: hidden;text-overflow: ellipsis;">
                <span name="id" style="display:none">{{item.id}}</span>
                <span>{{item.title}}</span>
              </el-link>
            </el-col>
            <el-col :span="8">{{item.createDate | formatDate }}</el-col>
            <el-col :span="4">{{item.userNickname}}</el-col>
            <!-- <el-col :span="1" title="普通"><el-tag size="mini"><i class="el-icon-warning"></i></el-tag></el-col> -->
          </el-row>
        </el-row>
      </el-card></el-col>
    </el-row>
    <el-row>
      <el-card style="margin: 10px;" shadow="hover">
        <div id="myChart1" style="height: 500px;width: 100%;"></div>
      </el-card>
    </el-row>
    <el-row>
      <el-col :span="12" :xs="24">
        <el-card class="card-home" shadow="hover" style="height: 600px;">
          <div id="myChart2" style="height: 500px;width: 100%;"></div>
        </el-card>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-card class="card-home" shadow="hover" style="height: 600px;">
          <div id="myChart3" style="height: 500px;width: 100%;"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-card class="card-home" shadow="hover" style="height: 300px">
        <p>本业顶部人员情况四个板块，不晓得要放什么数据，索性就空出来了</p>
        <p>右上角公告采用了Element的抽屉和对话框的样式，对接了公告API</p>
        <p>中间及下面的三张图标采用了Echarts的折线图及饼图，未对接后台数据，这个要根据自身的业务去做合理的规划对接</p>
        <p>Echarts官网传送门：<a href="https://echarts.apache.org/zh/index.html" target="_blank">
        <img src="@/assets/icon/ic-echarts.png" height="30px"/></a>  Echarts Github传送门：<a href="https://github.com/apache/echarts" target="_blank">
        <img src="@/assets/icon/ic-github.svg" height="30px"/></a></p>
      </el-card>
    </el-row>

    <el-dialog center :title="dialogInformText.title" :visible.sync="dialogInformInfo">
      <el-row style="text-align: center;margin-bottom: 20px">
        <i class="el-icon-date">{{dialogInformText.createDate | formatDate}}</i>
        <span style="padding: 0 10px">发布人：{{dialogInformText.userNickname}}</span>
      </el-row>
      <el-row>
        <span>
          {{dialogInformText.text}}
        </span>
      </el-row>
    </el-dialog>

    <el-drawer title="所有公告" :visible.sync="drawer" :with-header="true">
      <el-row style="padding: 0 20px 40px 20px">
        <el-row>
          <el-input v-model="params.title"  style="margin-left: 10px;width: 200px;" placeholder="标题" clearable></el-input>
        </el-row>
        <el-row>
          <el-date-picker v-model="searchDate" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"  :default-time="['00:00:00', '23:59:59']" style="margin-left: 10px"></el-date-picker>
        </el-row>
        <el-row>
          <el-button type="primary" plain icon="el-icon-refresh" @click="clearSearchInform" style="margin-left: 10px">重置</el-button>
          <el-button type="primary" plain icon="el-icon-search" @click="searchInform">搜索</el-button>
        </el-row>
      </el-row>
      <el-row style="margin: 20px 20px"
        v-for="item in allTableData"
        :key="item.id">
        <el-col :span="12">
          <el-link type="primary"
            :underline="false"
            @click="viewInform($event)"
            style="white-space: nowrap;display: inline-block; width: 100%; overflow: hidden;text-overflow: ellipsis;">
            <span name="id" style="display:none">{{item.id}}</span>
            <span>{{item.title}}</span>
          </el-link>
        </el-col>
        <el-col :span="8">{{item.createDate | formatDate }}</el-col>
        <el-col :span="4">{{item.userNickname}}</el-col>
      </el-row>
      <el-row style="text-align: center">
        <pagination :total="total" :pager="params.page" :current="pageJump"></pagination>
      </el-row>

    </el-drawer>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import pagination from '@/components/Pagination'
import { getInformList, getInform } from '@/api/system/site/inform'

export default {
  name: 'Home',
  components: { pagination },
  // components: {
  //   HelloWorld
  // }
  data () {
    return {
      newTableData: [],
      allTableData: [],
      dialogInformInfo: false,
      dialogInformText: {
        title: '',
        createDate: '',
        userNickname: '',
        text: ''
      },
      drawer: false,
      params: {
        title: '',
        page: 1,
        createDateStart: '',
        createDateEnd: ''
      },
      total: '',
      newParams: {
        state: 0,
        page: 1,
        pageSize: 6
      },
      searchDate: []
    }
  },
  mounted () {
    this.drawLine1()
    this.drawLine2()
    this.drawLine3()
    this.getNewTableData()
  },
  filters: {
    formatDate (time) {
      const date = new Date(time)
      var years = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      return years + '-' + month + '-' + day
    }
  },
  methods: {
    getNewTableData () {
      getInformList(this.newParams).then((result) => {
        if (result.status === 200) {
          this.newTableData = result.data.informList
        } else {
          this.$message.info(result.msg)
        }
      }).catch((err) => { console.log(err) })
    },
    searchInform () {
      if (this.searchDate.length !== 0) {
        this.params.createDateStart = this.searchDate[0]
        this.params.createDateEnd = this.searchDate[1]
      }
      // 数据请求
      const res = new Promise((resolve, reject) => {
        getInformList(this.params).then((result) => {
          if (result.status === 200) {
            resolve(result.data)
          } else {
            reject(res.msg)
          }
        }).catch((err) => { reject(err) })
      })
      // 结果处理
      res.then((res) => {
        this.allTableData = res.informList
        this.total = res.total
      }).catch(() => {
        this.tableData = []
        this.$message.info('暂无数据')
      })

      this.drawer = true
    },
    viewInform (event) {
      var informId = event.currentTarget.firstElementChild.firstElementChild.innerHTML
      getInform(informId).then((res) => {
        if (res.status === 200) {
          this.dialogInformText = res.data.inform
          this.dialogInformInfo = true
        }
      }).catch((err) => { console.log(err) })
    },
    clearSearchInform () {
      this.params.title = ''
      this.params.page = 1
      this.params.createDateStart = ''
      this.params.createDateEnd = ''
      this.searchDate = []
      this.searchInform()
    },
    pageJump (page) {
      this.params.page = page
      this.searchInform()
    },
    drawLine1 () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart1'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['webra1', 'webra2', 'webra3', 'webra4', 'webra5']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'webra1',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'webra2',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'webra3',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'webra4',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'webra5',
            type: 'line',
            stack: '总量',
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      })
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drawLine2 () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart2'))
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          top: '5%'
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'webra',
            type: 'pie',
            radius: [10, 200],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: [
              { value: 40, name: 'webra 1' },
              { value: 38, name: 'webra 2' },
              { value: 32, name: 'webra 3' },
              { value: 30, name: 'webra 4' },
              { value: 28, name: 'webra 5' },
              { value: 26, name: 'webra 6' },
              { value: 22, name: 'webra 7' },
              { value: 18, name: 'webra 8' }
            ]
          }
        ]
      })
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drawLine3 () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart3'))
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'webra',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'webra1' },
              { value: 735, name: 'webra2' },
              { value: 580, name: 'webra3' },
              { value: 484, name: 'webra4' },
              { value: 300, name: 'webra5' }
            ]
          }
        ]
      })
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  }
}
</script>
<style>
  .card-home {
    margin: 10px;
    height: 100px;
  }
</style>
