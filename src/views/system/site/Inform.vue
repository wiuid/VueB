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
      <el-button type="primary" plain icon="el-icon-plus"  @click="openAddDialog">新 增</el-button>
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
        <el-table-column prop="title" label="公告标题" align="center"></el-table-column>
        <el-table-column prop="userNickname" label="发布人" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" :active-value="0" :inactive-value="1" @change="dataStateSwitch(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="时间" align="center">
          <template slot-scope="scope">
            {{scope.row.createDate | formatData()}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="openEditDialog(scope.row.id)"><i class="el-icon-edit"></i>修改</el-link>
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

    <el-dialog :title="dialogAddInformTitle+'公告'" :visible.sync="dialogAddInform" :width="dialogWidth" :before-close="closeDialog">
      <el-form :model="inform" :rules="rules" ref="inform">
        <el-row>
          <el-form-item label="公告标题" :label-width="formLabelWidth" prop="title">
            <el-input v-model="inform.title" autocomplete="off"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
              <el-switch v-model="inform.state" :active-value="0" :inactive-value="1"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="通知正文" :label-width="formLabelWidth" prop="text">
            <el-input type="textarea" placeholder="请输入通知内容" v-model="inform.text" show-word-limit rows="6"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveData('inform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getData, getInform, saveInform, deleteInform, deleteInforms } from '@/api/system/site/inform'
import pagination from '@/components/Pagination'
export default {
  name: 'Inform',
  components: { pagination },
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
      inform: {
        id: 0,
        title: '',
        state: 0,
        text: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入公告标题', trigger: 'blur' }
        ],
        text: [
          { required: true, message: '请输入公告正文内容', trigger: 'blur' }
        ]
      },

      // 对话框相关
      dialogAddInform: false,
      dialogAddInformTitle: '',
      formLabelWidth: '80px',
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
    openAddDialog () {
      this.dialogAddInformTitle = '新增'
      this.dialogAddInform = true
    },
    /**
     * 将获取的行数据赋值到对话框进行更新
     * @param id
     */
    openEditDialog (id) {
      this.dialogAddInformTitle = '修改'
      const res = new Promise((resolve, reject) => {
        getInform(id).then((result) => { resolve(result) })
      })

      res.then((result) => {
        if (result.status === 200) {
          this.inform = result.data.inform
        }
      })
      this.dialogAddInform = true
    },
    /**
     * 关闭对话框并重置表单
     */
    closeDialog () {
      this.dialogAddInform = false
      this.$refs.inform.resetFields()
      this.inform.id = 0
      this.inform.title = ''
      this.inform.userNickname = ''
      this.inform.state = 0
      this.inform.text = ''
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
    /**
     * 保存对话框中的数据到后台数据库（更新和新增同一接口）
     */
    saveData (inform) {
      this.$refs[inform].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认' + this.dialogAddInformTitle + '名称为"' + this.inform.title + '"的公告通知?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const res = new Promise((resolve, reject) => {
              this.inform.text = this.inform.text.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
              saveInform(this.inform).then((result) => { resolve(result) })
            })
            res.then((result) => {
              if (result.status === 200) {
                this.$message.success(result.msg)
                this.getTableData()
              }
            })
            this.closeDialog()
          })
        } else {
          return false
        }
      })
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
    }
  }
}
</script>

<style scoped>

</style>
