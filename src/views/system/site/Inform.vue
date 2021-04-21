<template>
  <div>
    <el-row style="margin-bottom: 10px">
      <el-input v-model="params.title"  style="margin: 0 10px 10px 0;width: 200px;" placeholder="输入公告标题部分字段"></el-input>
      <el-date-picker v-model="searchDate"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
        style="margin: 0 10px 10px 0"></el-date-picker>
      <el-select  v-model="params.state" style="margin: 0 10px 10px 0;" clearable placeholder="公告状态">
        <el-option v-for="item in stateSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" plain icon="el-icon-refresh" @click="reSearchParams">重置</el-button>
      <el-button type="primary" plain icon="el-icon-search" @click="getTableData">搜索</el-button>
    </el-row>
    <el-row>
      <el-button type="primary" plain icon="el-icon-plus"  @click="openInitPage">新 增</el-button>
      <el-button type="danger" plain icon="el-icon-delete"  @click="deleteDatas">删 除</el-button>
    </el-row>
    <el-row>
      <el-table v-loading="loading"
        :data="tableData"
        stripe style="width: 100%"
        ref="informTable"
        @selection-change="handleSelectionChange"
        :header-cell-style="{'text-align':'center'}">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column prop="id" v-if="false"></el-table-column>
        <el-table-column prop="title" label="公告标题" align="center">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" @click="openViewDialog(scope.row.id)">{{scope.row.title}}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="userNickname" label="发布人" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" :active-value="0" :inactive-value="1" @change="dataStateSwitch(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="时间" align="center">
          <template slot-scope="scope">
            {{scope.row.createDate | formatDate()}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="openEditPage(scope.row.id)"><i class="el-icon-edit"></i>修改</el-link>
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="deleteData(scope.row)"><i class="el-icon-delete"></i>删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="text-align: center">
      <pagination :total="total"
      :pager="params.page"
      :current="pageJump"></pagination>
    </el-row>

    <el-dialog
      center
      :title="inform.title"
      :visible.sync="dialogViewInform"
      :width="dialogWidth">
      <el-row style="text-align: center;margin-bottom: 20px">
        <i class="el-icon-date">发布：{{inform.createDate | formatDate}}</i>
        <span style="padding: 0 10px">发布人：{{inform.userNickname}}</span>
        <i class="el-icon-date">更新：{{inform.updateDate | formatDate}}</i>
      </el-row>
      <el-row class="informTextStyle">
        <span v-html="inform.text">
        </span>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogViewInform = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getData, getInformByHome, saveInform, deleteInform, deleteInforms } from '@/api/system/site/inform'
import pagination from '@/components/Pagination'
export default {
  name: 'Inform',
  components: {
    pagination
  },
  data () {
    return {
      // 列表数据相关
      tableData: [],
      // 总数据数
      total: 0,
      loading: false,
      // 多选
      multipleSelection: [],
      // 筛选条件
      searchDate: [],
      params: {
        title: '',
        state: '',
        page: 1,
        createDateStart: '',
        createDateEnd: ''
      },

      // 对话框表单
      inform: {},

      // 对话框相关
      dialogViewInform: false,
      dialogViewInformTitle: '',
      dialogWidth: '50%',

      stateSelect: [
        {
          value: 0,
          label: '正常'
        },
        {
          value: 1,
          label: '停用'
        }
      ]
    }
  },
  created () {
    this.$store.dispatch('setDialogWidth')
    this.dialogWidth = this.$store.getters.getDialogWidth
  },
  mounted () {
    this.getTableData()
    window.onresize = () => {
      this.$store.dispatch('setDialogWidth')
      this.dialogWidth = this.$store.getters.getDialogWidth
    }
  },
  filters: {
    formatDate (time) {
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
    // 初始页面数据
    getTableData () {
      this.loading = true
      // 时间处理
      if (this.searchDate.length !== 0) {
        this.params.createDateStart = this.searchDate[0]
        this.params.createDateEnd = this.searchDate[1]
      }
      const res = new Promise((resolve, reject) => {
        getData(this.params).then((result) => { resolve(result) })
      })
      res.then((result) => {
        if (result.status === 200) {
          this.tableData = result.data.informList
          this.total = result.data.total
        }
      })
      this.loading = false
    },
    // 页码跳转
    pageJump (page) {
      this.params.page = page
      this.getTableData()
    },
    /**
     * 打开对话框  同时清空表单数据、标题改为新增公告
     */
    openViewDialog (id) {
      getInformByHome(id).then(result => {
        this.inform = result.data.inform
        this.dialogViewInform = true
      })
    },
    // 重置搜索条件
    reSearchParams () {
      this.params.title = ''
      this.params.state = ''
      this.params.page = 1
      this.params.createDateStart = ''
      this.params.createDateEnd = ''
      this.searchDate = []
      this.getTableData()
    },
    // 更新公告状态
    dataStateSwitch (row) {
      const inform = {
        id: row.id,
        state: row.state
      }

      const res = new Promise((resolve, reject) => {
        saveInform(inform).then((result) => { resolve(result) })
      })

      res.then((result) => {
        if (result.status === 200) {
          this.$message.success(result.msg)
        } else {
          this.getTableData()
        }
      })
    },
    /**
     * 删除后台数据库中的该行数据
     * @param row
     */
    deleteData (row) {
      this.$confirm('是否确认删除名称为"' + row.title + '"的公告通知?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const res = new Promise((resolve, reject) => {
          deleteInform(row.id).then((result) => { resolve(result) })
        })

        res.then((result) => {
          if (result.status === 200) {
            this.$message.success(result.msg)
            this.getTableData()
          }
        })
      })
    },
    /**
     * 批量删除通知公告
     */
    deleteDatas () {
      const informList = this.multipleSelection
      const idList = []
      const titleList = []
      if (informList.length !== 0) {
        for (const index in informList) {
          idList.push(informList[index].id)
          titleList.push(informList[index].title)
        }
        this.$confirm('是否确认删除标题为 "' + titleList.toString() + '" 的公告通知?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const res = new Promise((resolve, reject) => {
            deleteInforms(idList.toString()).then((result) => { resolve(result) })
          })

          res.then((result) => {
            if (result.status === 200) {
              this.$message.success(result.msg)
              this.getTableData()
            }
          })
        })
      } else {
        this.$message.warning('你应该至少选中一个！')
      }
    },
    /**
     * 获取表格多选选中了哪些
     * @param val
     */
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    openInitPage () {
      this.$router.push('/system/site/inform/edit')
    },
    openEditPage (id) {
      this.$router.push('/system/site/inform/edit/' + id)
    }
  }
}
</script>
<style scoped>
  .informTextStyle {
    padding: 10px 20px;
    -webkit-box-shadow: 0 0 6px 1px rgba(0,0,0,0.2) inset;
    /* border: 1px solid #333333; */
    border-radius: 5px;
  }
</style>
