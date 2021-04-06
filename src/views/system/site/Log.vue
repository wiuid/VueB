<template>
  <div>
    <el-row style="margin-bottom: 10px">
      <el-input v-model="params.title"  style="margin-right: 10px;width: 200px;" placeholder="输入日志标题部分字段" @change="searchLog"></el-input>
      <el-date-picker v-model="searchDate" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"  :default-time="['00:00:00', '23:59:59']" style="margin-right: 10px" @change="searchLog"></el-date-picker>
      <!-- <el-select  v-model="searchLogOption.mark" placeholder="日志分类" style="margin-right: 10px;" clearable @change="searchLog">
        <el-option v-for="item in markSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select> -->
    </el-row>
    <el-row>
      <el-button type="danger" plain icon="el-icon-delete"  @click="deleteLogs">删 除</el-button>
      <el-button type="success" plain icon="el-icon-download"  @click="deleteLogs">导 出</el-button>
      <el-button type="danger" icon="el-icon-brush"  @click="deleteLogs">清 空</el-button>
    </el-row>
    <el-row>
      <el-table v-loading="loading" :data="tableData" stripe style="width: 100%" ref="logTable" size="mini"  @selection-change="handleSelectionChange" :header-cell-style="{'text-align':'center'}">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="序号" type="index" width="55" align="center"></el-table-column>
        <el-table-column prop="id" v-if="false"></el-table-column>
        <el-table-column prop="title" label="日志标题" width="150" align="center"></el-table-column>
        <el-table-column prop="username" label="操作人员" width="100" align="center"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="200" align="center">
          <template slot-scope="scope">
            {{scope.row.createDate | formatData()}}
          </template>
        </el-table-column>
        <el-table-column prop="text" label="详情" align="center"></el-table-column>
      </el-table>
    </el-row>
    <el-row style="text-align: center">
      <pagination :total="total"
      :pager="params.page"
      :current="pageJump"></pagination>
    </el-row>
  </div>
</template>

<script>
import pagination from '@/components/Pagination'
import { getData } from '@/api/system/site/log'
export default {
  name: 'Log',
  components: { pagination },
  data () {
    return {
      multipleSelection: [],
      loading: false,
      tableData: [],
      params: {
        title: '',
        createDateStart: '',
        createDateEnd: '',
        page: 1
      },
      total: 0,
      searchDate: []
    }
  },
  mounted () {
    this.getTableData()
  },
  filters: {
    formatData (time) {
      var data = new Date(time)
      var y = data.getFullYear()
      var M = data.getMonth() + 1
      var d = data.getDate()

      var h = data.getHours()
      var m = data.getMinutes()
      return y + '-' + M + '-' + d + ' ' + h + ':' + m
    }
  },
  methods: {
    getTableData () {
      this.loading = true
      // 时间处理
      if (this.searchDate.length !== 0) {
        this.params.createDateStart = this.searchDate[0]
        this.params.createDateEnd = this.searchDate[1]
      }
      // 数据请求
      const res = new Promise((resolve, reject) => {
        getData(this.params).then((result) => { resolve(result) })
      })
      res.then((result) => {
        if (result.status === 200) {
          this.tableData = result.data.logList
          this.total = result.data.total
        }
        this.loading = false
      })
    },
    // 页码跳转
    pageJump (page) {
      this.params.page = page
      this.getTableData()
    },
    /**
     * 批量删除日志
     */
    deleteLogs () {
      const logList = this.multipleSelection
      const idList = []
      if (logList.length !== 0) {
        for (const index in logList) {
          idList.push(logList[index].id)
        }
        this.$confirm('是否确认删除序号为"' + idList.toString() + '"的日志信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success('删除成功!')
        })
      } else {
        this.$message.warning('你应该至少选中一个！')
      }
    },
    /**
     * 搜索日志
     */
    searchLog () {
      this.$message.success('搜索日志API')
    },
    /**
     * 获取当前选中了表格中的哪些数据
     * @param val
     */
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>

</style>
