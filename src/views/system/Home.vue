<template>
<!--  <div class="home">-->
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--  </div>-->
  <!--首页顶部信息展示-->
  <div>
    <el-row>
      <!--基础信息展示-->
      <el-col :span="15" :xs="24">
        <el-col :span="12" :xs="24"><el-card class="card-home" shadow="hover">
          <el-row :gutter="20">
            <el-col :span="12">
              <img src="../../assets/user.png" style="max-height: 60px"/>
            </el-col>
            <el-col :span="12" style="float:right;">
              <el-row>人员情况1</el-row>
              <el-row>xxxxxx</el-row>
            </el-col>
          </el-row>
        </el-card></el-col>
        <el-col :span="12" :xs="24"><el-card class="card-home" shadow="hover">
          <el-row :gutter="20">
            <el-col :span="12">
              <img src="../../assets/user.png" style="max-height: 60px"/>
            </el-col>
            <el-col :span="12" style="float:right;">
              <el-row>人员情况2</el-row>
              <el-row>xxxxxx</el-row>
            </el-col>
          </el-row>
        </el-card></el-col>
        <el-col :span="12" :xs="24"><el-card class="card-home" shadow="hover">
          <el-row :gutter="20">
            <el-col :span="12">
              <img src="../../assets/user.png" style="max-height: 60px"/>
            </el-col>
            <el-col :span="12" style="float:right;">
              <el-row>人员情况3</el-row>
              <el-row>xxxxxx</el-row>
            </el-col>
          </el-row>
        </el-card></el-col>
        <el-col :span="12" :xs="24"><el-card class="card-home" shadow="hover">
          <el-row :gutter="20">
            <el-col :span="12">
              <img src="../../assets/user.png" style="max-height: 60px"/>
            </el-col>
            <el-col :span="12" style="float:right;">
              <el-row>人员情况4</el-row>
              <el-row>xxxxxx</el-row>
            </el-col>
          </el-row>
        </el-card></el-col>
      </el-col>
      <!--管理公告！-->
      <el-col :span="9" :xs="24"><el-card style="height: 220px;margin: 10px;flex-grow:1;" shadow="hover" >
        <el-row><span>网站公示板</span>
          <el-link :underline="false" type="primary" title="更多公告" @click="drawer = true">
            <i class="el-icon-more-outline" style="padding: 0 10px"></i>
          </el-link>
        </el-row>
        <hr/>
        <el-row>
          <!--最多6条公告-->
          <el-row>
            <!--white-space: nowrap;  强制不换行
            display: inline-block;    将span当做块级元素对待
            width: 100%;            宽度限制
            overflow: hidden;       超出隐藏
            text-overflow: ellipsis; 超出部分用。。。 代替
            -->
            <el-col :span="17">
              <el-link type="primary" :underline="false" @click="dialogInformInfo = true" style="white-space: nowrap;display: inline-block; width: 100%; overflow: hidden;text-overflow: ellipsis;">
                <span>我是公告标题我是公告标题我是公告标题</span>
              </el-link>
            </el-col>
            <el-col :span="5">time</el-col>
            <el-col :span="1" title="普通"><el-tag size="mini"><i class="el-icon-warning"></i></el-tag></el-col>
          </el-row>
        </el-row>
      </el-card></el-col>
    </el-row>
    <el-row>
      <el-card style="margin: 10px;" shadow="hover">
        <div id="myChart" style="height: 500px;width: 100%;"></div>
      </el-card>
    </el-row>
    <el-row>
      <el-col :span="12" :xs="24">
        <el-card class="card-home" shadow="hover">人员情况变动板</el-card>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-card class="card-home" shadow="hover">其他板</el-card>
      </el-col>
    </el-row>

    <el-dialog center title="我是公告标题我是公告标题我是公告标题" :visible.sync="dialogInformInfo">
      <el-row style="text-align: center;margin-bottom: 20px">
        <i class="el-icon-date">xxxxxxxxxxxx</i>
        <span style="padding: 0 10px">占位：重要等级</span>
      </el-row>
      <el-row>
        <span>
          正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文
        </span>
      </el-row>
    </el-dialog>

    <el-drawer title="所有公告" :visible.sync="drawer" :with-header="true">
      <el-row style="padding: 0 20px 40px 20px">
        <el-row>
          <el-input v-model="searchInformOption.title" size="small" style="margin-left: 10px;width: 200px;" placeholder="标题" @change="searchInform"></el-input>
        </el-row>
        <el-row>
          <el-date-picker v-model="searchInformOption.data" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" size="small" :default-time="['00:00:00', '23:59:59']" style="margin-left: 10px" @change="searchInform"></el-date-picker>
        </el-row>
        <el-row>
          <el-select size="small" v-model="searchInformOption.mark" placeholder="请选择" style="margin-left: 10px;" clearable @change="searchInform">
            <el-option v-for="item in markSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-row>
      </el-row>
      <el-row style="padding: 0 20px">
        <!--white-space: nowrap;  强制不换行
        display: inline-block;    将span当做块级元素对待
        width: 100%;            宽度限制
        overflow: hidden;       超出隐藏
        text-overflow: ellipsis; 超出部分用。。。 代替
        -->
        <el-col :span="17">
          <el-link type="primary" :underline="false" @click="dialogInformInfo = true" style="white-space: nowrap;display: inline-block; width: 100%; overflow: hidden;text-overflow: ellipsis;">
            <span>我是公告标题我是公告标题我是公告标题</span>
          </el-link>
        </el-col>
        <el-col :span="5">time</el-col>
        <el-col :span="1"><el-tag size="mini"><i class="el-icon-warning"></i></el-tag></el-col>
      </el-row>

      <el-row style="text-align: center">
        <Pagination :total="20"></Pagination>
      </el-row>

    </el-drawer>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Pagination from '@/components/Pagination'

export default {
  name: 'Home',
  components: { Pagination },
  // components: {
  //   HelloWorld
  // }
  data () {
    return {
      dialogInformInfo: false,
      drawer: false,
      searchInformOption: {
        title: '',
        data: '',
        mark: ''
      },
      markSelect: [
        {
          value: 'success',
          label: '普通'
        },
        {
          value: 'warning',
          label: '警告'
        },
        {
          value: 'danger',
          label: '紧急'
        }
      ]
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    searchInform () {
      this.$message.success('yes my love')
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '在Vue中使用echarts' },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
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
