<template>
  <div>
    <el-row style="margin-bottom: 10px">
      <el-input v-model="searchInformOption.title" size="small" style="margin-right: 10px;width: 200px;" placeholder="输入公告标题部分字段" @change="searchInform"></el-input>
      <el-date-picker v-model="searchInformOption.date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" size="small" :default-time="['00:00:00', '23:59:59']" style="margin-right: 10px" @change="searchInform"></el-date-picker>
      <el-select size="small" v-model="searchInformOption.mark" placeholder="公告重要程度" style="margin-right: 10px;" clearable @change="searchInform">
        <el-option v-for="item in markSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-row>
    <el-row>
      <el-button type="primary" plain icon="el-icon-plus" size="small" @click="openDialogAddInform">新 增</el-button>
      <el-button type="danger" plain icon="el-icon-delete" size="small" @click="deleteInforms">删 除</el-button>

<!--      <p>组件值：{{ searchInformOption.data }}</p>-->
    </el-row>
    <el-row>
      <el-table v-loading="loading" :data="tableData" stripe style="width: 100%" ref="informTable"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="序号" width="55"></el-table-column>
        <el-table-column prop="title" label="公告标题"></el-table-column>
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="mark" label="重要标识"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="editInform(scope.row.id)"><i class="el-icon-edit"></i>修改</el-link>
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="deleteInform(scope.row)"><i class="el-icon-delete"></i>删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="text-align: center">
      <pagination :total="20"></pagination>
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
            <el-form-item label="发布日期" :label-width="formLabelWidth" prop="date">
              <el-date-picker type="date" placeholder="选择日期" v-model="inform.date" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重要程度" :label-width="formLabelWidth" prop="mark">
              <el-select v-model="inform.mark" placeholder="请选择">
                <el-option v-for="item in markSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
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
        <el-button @click="clearInform" type="warning" plain style="float:left;">清 空 重 置</el-button>
        <el-button type="primary" @click="saveInform('inform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from '@/components/Pagination'
export default {
  name: 'Inform',
  components: { pagination },
  data () {
    return {
      searchInformOption: {
        title: '',
        date: '',
        mark: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入公告标题', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        mark: [
          { required: true, message: '请选择公告类型', trigger: 'change' }
        ],
        text: [
          { required: true, message: '请输入公告正文内容', trigger: 'blur' }
        ]
      },
      tableData: [
        {
          id: '1',
          title: '我是公告标题1',
          date: '时间1',
          mark: '1'
        }, {
          id: '2',
          title: '我是公告标题2',
          date: '时间2',
          mark: '2'
        }, {
          id: '3',
          title: '我是公告标题3',
          date: '时间3',
          mark: '3'
        }, {
          id: '4',
          title: '我是公告标题4',
          date: '时间4',
          mark: '4'
        }
      ],
      inform: {
        title: '',
        date: '',
        mark: 'success',
        text: ''
      },
      dialogAddInform: false,
      dialogAddInformTitle: '',
      formLabelWidth: '120px',
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
      ],
      multipleSelection: [],
      loading: false
    }
  },
  mounted () {
  },
  methods: {
    searchInform () {
      this.$message.success('yes my love')
    },
    /**
     * 打开对话框  同时清空表单数据、标题改为新增公告
     */
    openDialogAddInform () {
      this.dialogAddInformTitle = '新增'
      this.dialogAddInform = true
    },
    /**
     * 清空表单数据
     */
    clearInform () {
      this.$refs.inform.resetFields()
      this.inform.title = ''
      this.inform.date = ''
      this.inform.mark = 'success'
      this.inform.text = ''
    },
    /**
     * 将获取的行数据赋值到对话框进行更新
     * @param id
     */
    editInform (id) {
      this.dialogAddInformTitle = '修改'
      this.inform.title = id
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
            this.$message.success(this.dialogAddInformTitle + '成功!')
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
        this.$message.success('删除成功!')
        this.dialogAddInform = false
      })
    },
    /**
     * 批量删除通知公告
     */
    deleteInforms () {
      const informList = this.multipleSelection
      const idList = []
      if (informList.length !== 0) {
        for (const index in informList) {
          idList.push(informList[index].id)
        }
        this.$confirm('是否确认删除序号为"' + idList.toString() + '"的公告通知?', '提示', {
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
