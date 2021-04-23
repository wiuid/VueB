<template>
  <div>
   <el-row>
      <el-table
      v-loading="loading"
      :data="tableData"
      stripe style="width: 100%"
      :header-cell-style="{'text-align':'center'}">
        <el-table-column label="序号" type="index" width="55" align="center"></el-table-column>
        <el-table-column prop="uuid" label="UUID" align="center" width="300"></el-table-column>
        <el-table-column prop="username" label="用户" align="center"></el-table-column>
        <el-table-column prop="ip" label="Ip地址" align="center"></el-table-column>
        <el-table-column prop="city" label="城市" align="center"></el-table-column>
        <el-table-column prop="date" label="登录时间" width="200" align="center">
          <template slot-scope="scope">
            {{scope.row.date | formatData()}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="deleteData(scope.row.uuid)"><i class="el-icon-delete"></i>下线</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { getData, delData } from '@/api/system/monitoring/activeUser'
export default {
  name: 'ActiveUser',
  data () {
    return {
      tableData: [],
      loading: false
    }
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
  created () {
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      this.loading = true
      getData().then((result) => {
        if (result.status === 200) {
          this.tableData = result.data.activeUserList
        }
      })
      this.loading = false
    },
    deleteData (Uuid) {
      delData(Uuid).then((result) => {
        if (result.status === 200) {
          this.$message.success(result.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
