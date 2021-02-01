<template>
  <div>
    <el-row>
      <el-button type="primary" plain icon="el-icon-plus" size="small" @click="openDialogAddInform">新 增</el-button>
      <el-button type="danger" plain icon="el-icon-delete" size="small" @click="deleteInforms">删 除</el-button>
      <el-date-picker v-model="searchInform.data" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" size="small" :default-time="['00:00:00', '23:59:59']" style="margin-left: 10px"></el-date-picker>
      <el-select size="small" v-model="searchInform.mark" placeholder="请选择" style="margin-left: 10px;" clearable>
        <el-option v-for="item in markSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <br>
      <p>组件值：{{ searchInform.data }}</p>
    </el-row>
    <el-row>
      <el-table :data="tableData" stripe style="width: 100%" ref="informTable"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="序号" width="55"></el-table-column>
        <el-table-column prop="title" label="公告标题"></el-table-column>
        <el-table-column prop="data" label="时间"></el-table-column>
        <el-table-column prop="mark" label="重要标识"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="small" plain icon="el-icon-edit  " type="primary" @click="editInform(scope.row.id)">修改</el-button>
              <el-button size="small" plain icon="el-icon-delete" type="danger" @click="deleteInform(scope.row)">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="text-align: center">
      <Pagination :total="20"></Pagination>
    </el-row>

    <el-dialog :title="dialogAddInformTitle+'公告'" :visible.sync="dialogAddInform">
      <el-form :model="inform">
        <el-row>
          <el-form-item label="公告标题" :label-width="formLabelWidth" required>
            <el-input v-model="inform.title" autocomplete="off"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :sm="12" :xs="24">
            <el-form-item label="发布日期" :label-width="formLabelWidth" required>
              <el-date-picker type="date" placeholder="选择日期" v-model="inform.date" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :xs="24">
            <el-form-item label="重要程度" :label-width="formLabelWidth" required>
              <el-select v-model="inform.mark" placeholder="请选择">
                <el-option
                  v-for="item in markSelect"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="通知正文" :label-width="formLabelWidth" required>
            <el-input
              type="textarea"
              placeholder="请输入通知内容"
              v-model="inform.text"
              show-word-limit
              rows="6"
            ></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddInform = false">取 消</el-button>
        <el-button @click="clearInform" type="warning" plain style="float:left;">清 空</el-button>
        <el-button type="primary" @click="saveInform">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'Inform',
  components: { Pagination },
  data () {
    return {
      searchInform: {
        data: '',
        mark: ''
      },
      tableData: [
        {
          id: '1',
          title: '我是公告标题1',
          data: '时间1',
          mark: '1'
        }, {
          id: '2',
          title: '我是公告标题2',
          data: '时间2',
          mark: '2'
        }, {
          id: '3',
          title: '我是公告标题3',
          data: '时间3',
          mark: '3'
        }, {
          id: '4',
          title: '我是公告标题4',
          data: '时间4',
          mark: '4'
        }
      ],
      inform: {
        title: '',
        data: '',
        mark: '',
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
      multipleSelection: []
    }
  },
  methods: {
    /**
     * 打开对话框  同时清空表单数据、标题改为新增公告
     */
    openDialogAddInform () {
      this.clearInform()
      this.inform.mark = 'success'
      this.dialogAddInformTitle = '新增'
      this.dialogAddInform = true
    },
    /**
     * 清空表单数据
     */
    clearInform () {
      for (const key in this.inform) {
        this.inform[key] = ''
      }
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
     * 保存对话框中的数据到后台数据库（更新和新增同一接口）
     */
    saveInform () {
      this.$confirm('是否确认' + this.dialogAddInformTitle + '名称为"' + this.inform.title + '"的公告通知?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success(this.dialogAddInformTitle + '成功!')
        this.dialogAddInform = false
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
        this.$message.success('你应该至少选中一个！')
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>

</style>
