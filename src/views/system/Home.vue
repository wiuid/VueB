<template style="transition: all .5s">
  <div>
    <el-row>
      <!--基础信息展示-->
      <el-col :md="15" :sm="24" :xs="24">
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
      <el-col :md="9" :sm="24" :xs="24"><el-card style="height: 220px;margin: 10px;flex-grow:1;" shadow="hover" >
        <el-row><span>网站公示板</span>
          <el-link :underline="false" type="primary" title="更多公告" @click="getTableData">
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
              <el-link
              :underline="false" @click="getData($event)"
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
      <el-card style="margin: 10px; height: auto" shadow="hover" >
        <div id="myChart1" style="height: 300px; width: 100%;"></div>
      </el-card>
    </el-row>
    <el-row>
      <el-col :span="12" :xs="24">
        <el-card class="card-home" shadow="hover" style="height: auto">
          <div id="myChart2" style="height: 400px;width: 100%;"></div>
        </el-card>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-card class="card-home" shadow="hover" style="height: auto">
          <div id="myChart3" style="height: 400px;width: 100%;"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-card class="card-home" shadow="hover" style="height: auto">
        <p>本业顶部人员情况四个板块，不晓得要放什么数据，索性就空出来了</p>
        <p>右上角公告采用了Element的抽屉和对话框的样式，对接了公告API</p>
        <p>中间及下面的三张图标采用了Echarts的折线图及饼图，未对接后台数据，这个要根据自身的业务去做合理的规划对接</p>
        <p>Echarts官网传送门：<a href="https://echarts.apache.org/zh/index.html" target="_blank">
        <img src="@/assets/icon/ic-echarts.png" height="30px"/></a>  Echarts Github传送门：<a href="https://github.com/apache/echarts" target="_blank">
        <img src="@/assets/icon/ic-github.svg" height="30px"/></a></p>
      </el-card>
    </el-row>

    <el-dialog center :title="dialogInformText.title" :width="dialogWidth" :visible.sync="dialog">
      <el-row style="text-align: center;margin-bottom: 20px">
        <i class="el-icon-date">{{dialogInformText.createDate | formatDate}}</i>
        <span style="padding: 0 10px">发布人：{{dialogInformText.userNickname}}</span>
      </el-row>
      <el-row class="informTextStyle">
        <span v-html="dialogInformText.text">
        </span>
      </el-row>
    </el-dialog>

    <el-drawer title="所有公告" :visible.sync="drawer" size="200" :with-header="true">
      <el-row style="padding: 0 20px 10px 20px">
        <el-row style="margin-bottom: 10px">
          <el-input v-model="params.title"  style="margin-left: 10px;width: 200px;" placeholder="标题" clearable></el-input>
        </el-row>
        <el-row style="margin-bottom: 10px">
          <el-date-picker v-model="searchDate" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"  :default-time="['00:00:00', '23:59:59']" style="margin-left: 10px"></el-date-picker>
        </el-row>
        <el-row style="margin-bottom: 10px">
          <el-button type="primary" plain icon="el-icon-refresh" @click="reSearchParams" style="margin-left: 10px">重置</el-button>
          <el-button type="primary" plain icon="el-icon-search" @click="getTableData">搜索</el-button>
        </el-row>
      </el-row>
      <el-row style="margin: 0 20px 20px 20px"
        v-for="item in allTableData"
        :key="item.id">
        <el-col :span="12">
          <el-link type="primary"
            :underline="false"
            @click="getData($event)"
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
import { getData, getInformByHome } from '@/api/system/site/inform'

// 加载echarts，注意引入文件的路径
const echarts = require('echarts/lib/echarts')
// 引入图类型
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/radar')

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/grid')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/radar')
// 图例翻译滚动
export default {
  name: 'Home',
  components: { pagination },
  // components: {
  //   HelloWorld
  // }
  data () {
    return {
      // 最新的状态为正常的6条公告
      newTableData: [],
      // 全部状态为正常的公告（10条）
      allTableData: [],
      // 对话框状态--显示公告具体信息的
      dialog: false,
      dialogWidth: '50%',
      // 对话框中信息载体
      dialogInformText: {
        title: '',
        createDate: '',
        userNickname: '',
        text: ''
      },
      // 抽屉状态--显示全部公告
      drawer: false,
      // 抽屉中的公告筛选条件
      params: {
        title: '',
        page: 1,
        createDateStart: '',
        createDateEnd: ''
      },
      // 抽屉中数据的总数据数
      total: '',
      // 页面初始化6条数据获取的条件（不是后端定义的）
      newParams: {
        state: 0,
        page: 1,
        pageSize: 6
      },
      // 抽屉中时间的载体
      searchDate: []
    }
  },
  created () {
    this.$store.dispatch('setDialogWidth')
    this.dialogWidth = this.$store.getters.getDialogWidth
  },
  mounted () {
    // 三个图表
    this.drawLine1()
    this.drawLine2()
    this.drawLine3()
    // 6条最新公告的获取
    this.getNewData()

    window.onresize = () => {
      this.$store.dispatch('setDialogWidth')
      this.dialogWidth = this.$store.getters.getDialogWidth
    }
  },
  filters: {
    // 时间格式过滤
    formatDate (time) {
      const date = new Date(time)
      var years = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      return years + '-' + month + '-' + day
    }
  },
  methods: {
    // 获取6条公告方法
    getNewData () {
      getData(this.newParams).then((result) => {
        if (result.status === 200) {
          this.newTableData = result.data.informList
        } else {
          this.$message.info(result.msg)
        }
      }).catch((err) => { console.log(err) })
    },
    // 搜索全部公告方法
    getTableData () {
      if (this.searchDate.length !== 0) {
        this.params.createDateStart = this.searchDate[0]
        this.params.createDateEnd = this.searchDate[1]
      }
      // 数据请求
      const res = new Promise((resolve, reject) => {
        getData(this.params).then((result) => {
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
    // 查看公告内容
    getData (event) {
      var informId = event.currentTarget.firstElementChild.firstElementChild.innerHTML
      getInformByHome(informId).then((res) => {
        if (res.status === 200) {
          this.dialogInformText = res.data.inform
          this.dialog = true
        }
      }).catch((err) => { console.log(err) })
    },
    // 页码跳转
    pageJump (page) {
      this.params.page = page
      this.getTableData()
    },
    // 重置搜索条件
    reSearchParams () {
      this.params.title = ''
      this.params.page = 1
      this.params.createDateStart = ''
      this.params.createDateEnd = ''
      this.searchDate = []
      this.getTableData()
    },
    // 下面都是图表
    drawLine1 () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('myChart1'))
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
            // symbol: 'none', // 去除折线图中的节点 小圆点
            smooth: true, // 将折线图中的折线 变为平滑曲线
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
            smooth: true,
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
            smooth: true,
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
            smooth: true,
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
            smooth: true,
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
      const myChart = echarts.init(document.getElementById('myChart2'))
      // var colors = ['#FDD100', '#08CED0', '#7351E3', '#FF4873', '#01BE6E']
      // 颜色下标，每次渲染饼图一个扇区加一操作
      // var i = 0
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          showContent: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
          data: ['预算分配（webra）', '实际开销（webra）', '售后（webra）', '开发（webra）']
        },
        radar: {
          shape: 'circle',
          name: {
            textStyle: {
              color: '#333',
              // backgroundColor: '#fff',
              borderRadius: 3,
              padding: [1, 1]
            }
          },
          indicator: [
            { name: '销售（webras）', max: 6500 },
            { name: '管理（webra）', max: 16000 },
            { name: '信息技术（webra）', max: 30000 },
            { name: '客服（webra）', max: 38000 },
            { name: '研发（webra）', max: 52000 },
            { name: '市场（webra）', max: 25000 }
          ]
        },
        series: [{
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          areaStyle: { normal: {} },
          data: [
            {
              value: [4300, 10000, 28000, 35000, 50000, 19000],
              name: '预算分配（webra）'
            },
            {
              value: [5000, 14000, 28000, 31000, 42000, 21000],
              name: '实际开销（webra）'
            },
            {
              value: [3200, 8000, 18000, 21000, 32000, 11000],
              name: '售后（webra）'
            },
            {
              value: [4000, 10000, 20000, 20000, 35000, 15000],
              name: '开发（webra）'
            }
          ]
        }]
      })
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    drawLine3 () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('myChart3'))
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
  .informTextStyle {
    padding: 10px 20px;
    -webkit-box-shadow: 0 0 6px 1px rgba(0,0,0,0.2) inset;
    /* border: 1px solid #333333; */
    border-radius: 5px;
  }
</style>
