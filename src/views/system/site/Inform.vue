<template>
  <div>
    <el-row style="margin-bottom: 10px">
      <el-input v-model="params.title"  style="margin-right: 10px;width: 200px;" placeholder="输入公告标题部分字段"></el-input>
      <el-date-picker v-model="searchDate" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"  :default-time="['00:00:00', '23:59:59']" style="margin-right: 10px"></el-date-picker>
      <el-select  v-model="params.state" style="margin-right: 10px;" clearable placeholder="公告状态">
        <el-option v-for="item in stateSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" plain icon="el-icon-refresh" @click="clearSearchInform">重置</el-button>
      <el-button type="primary" plain icon="el-icon-search" @click="searchInform">搜索</el-button>
    </el-row>
    <el-row>
      <el-button type="primary" plain icon="el-icon-plus"  @click="openDialogAddInform">新 增</el-button>
      <el-button type="danger" plain icon="el-icon-delete"  @click="deleteInforms">删 除</el-button>
    </el-row>
    <el-row>
      <el-table v-loading="loading"
        :data="tableData"
        stripe style="width: 100%"
        ref="informTable"
        @selection-change="handleSelectionChange"
        :header-cell-style="{'text-align':'center'}">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" type=index label="序号" width="55" align="center"></el-table-column>
        <el-table-column prop="title" label="公告标题" align="center"></el-table-column>
        <el-table-column prop="createDate" :formatter="dateFormat" label="时间" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" :active-value="0" :inactive-value="1"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="userNickname" label="发布人" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="editInform(scope.row.id)"><i class="el-icon-edit"></i>修改</el-link>
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="deleteInform(scope.row)"><i class="el-icon-delete"></i>删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="text-align: center">
      <pagination :total="total" :pager="params.page" :current="pageJump"></pagination>
    </el-row>

    <el-dialog :title="dialogAddInformTitle+'公告'" :visible.sync="dialogAddInform" :before-close="closeDialog">
      <el-form :model="inform" :rules="rules" ref="inform">
        <el-row>
          <el-form-item label="公告标题" :label-width="formLabelWidth" prop="title">
            <el-input v-model="inform.title" autocomplete="off"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
              <el-switch v-model="inform.state" :active-value="0" :inactive-value="1"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布时间" :label-width="formLabelWidth" prop="clearable">
              <span>{{inform.createDate}}</span>
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
        <el-button @click="clearInform;dialogAddInform = false">取 消</el-button>
        <!-- <el-button @click="clearInform" type="warning" plain style="float:left;">清 空</el-button> -->
        <el-button type="primary" @click="saveInform('inform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getInformList, getInform, saveInformApi, deleteInformApi, deleteInformsApi } from '@/api/system/site/inform'
import pagination from '@/components/Pagination'
import moment from 'moment'
export default {
  name: 'Inform',
  components: { pagination },
  data () {
    return {
      rules: {
        title: [
          { required: true, message: '请输入公告标题', trigger: 'blur' }
        ],
        text: [
          { required: true, message: '请输入公告正文内容', trigger: 'blur' }
        ]
      },
      tableData: [],
      inform: {
        id: null,
        title: '',
        createDate: '',
        updateDate: '',
        state: 0,
        text: ''
      },
      dialogAddInform: false,
      dialogAddInformTitle: '',
      formLabelWidth: '80px',
      multipleSelection: [],
      loading: false,
      params: {
        title: '',
        state: '',
        page: 1,
        createDateStart: '',
        createDateEnd: ''
      },
      searchDate: [],
      stateSelect: [
        {
          value: 0,
          label: '正常'
        },
        {
          value: 1,
          label: '停用'
        }
      ],
      total: ''
    }
  },
  mounted () {
    this.searchInform()
  },
  methods: {
    searchInform () {
      this.loading = true
      // 时间处理
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
        this.tableData = res.informList
        this.total = res.total
        this.loading = false
      }).catch(() => {
        this.tableData = []
        this.$message.info('暂无数据')
        this.loading = false
      })
    },
    pageJump (page) {
      this.params.page = page
      this.searchInform()
    },
    clearSearchInform () {
      this.params.title = ''
      this.params.state = ''
      this.params.page = 1
      this.params.createDateStart = ''
      this.params.createDateEnd = ''
      this.searchDate = []
      this.searchInform()
    },
    /**
     * 打开对话框  同时清空表单数据、标题改为新增公告
     */
    openDialogAddInform () {
      const date = moment().format('YYYY-MM-DD HH:mm:ss')
      this.inform.createDate = date
      this.inform.updateDate = date
      this.dialogAddInformTitle = '新增'
      this.dialogAddInform = true
    },
    /**
     * 清空表单数据
     */
    clearInform () {
      this.$refs.inform.resetFields()
      this.inform.id = null
      this.inform.title = ''
      this.inform.userNickname = ''
      this.inform.state = 0
      this.inform.text = ''
    },
    /**
     * 将获取的行数据赋值到对话框进行更新
     * @param id
     */
    editInform (id) {
      this.dialogAddInformTitle = '修改'
      getInform(id).then((result) => {
        if (result.status === 200) {
          this.inform = result.data.inform
          this.inform.createDate = moment(this.inform.createDate).format('YYYY-MM-DD HH:mm:ss')
          this.inform.updateDate = moment().format('YYYY-MM-DD HH:mm:ss')
        } else {
          this.$message.error('数据错误')
        }
      }).catch((err) => {
        this.$message.error(err)
      })
      this.dialogAddInform = true
    },
    /**
     * 想要离开对话框时清空表单，并关闭对话框
     */
    closeDialog () {
      this.clearInform()
      this.dialogAddInform = false
    },
    /**
     * 保存对话框中的数据到后台数据库（更新和新增同一接口）
     */
    saveInform (inform) {
      this.$refs[inform].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认' + this.dialogAddInformTitle + '名称为"' + this.inform.title + '"的公告通知?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            saveInformApi(this.inform).then((result) => {
              if (result.status === 200) {
                this.$message.success(result.msg)
                this.searchInform()
              } else {
                this.$message.success(result.msg)
              }
            }).catch((err) => { this.$message.error(err) })
            this.clearInform()
            this.dialogAddInform = false
          })
        } else {
          return false
        }
      })
    },
    /**
     * 删除后台数据库中的该行数据
     * @param row
     */
    deleteInform (row) {
      this.$confirm('是否确认删除名称为"' + row.title + '"的公告通知?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteInformApi(row.id).then((res) => {
          if (res.status === 200) {
            this.$message.success(res.msg)
            this.searchInform()
          } else {
            this.$message.error(res.msg)
          }
        }).catch((err) => { this.$message.error(err) })
        this.dialogAddInform = false
      })
    },
    /**
     * 批量删除通知公告
     */
    deleteInforms () {
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
          deleteInformsApi(idList.toString()).then((res) => {
            if (res.status === 200) {
              this.$message.success(res.msg)
              this.searchInform()
            } else {
              this.$message.error(res.msg)
            }
          }).catch((err) => { this.$message.error(err) })
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
    dateFormat (row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style scoped>

</style>
