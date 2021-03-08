<template>
  <div>
    <el-row style="margin-bottom: 10px">
      <el-input v-model="searchPostOption.title"  style="margin-right: 10px;width: 200px;" placeholder="输入岗位名称部分字段" @change="searchPost" clearable></el-input>
      <el-select  v-model="searchPostOption.state" placeholder="状态分类" style="margin-right: 10px;" clearable @change="searchPost">
        <el-option v-for="item in stateSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-row>
    <el-row>
      <el-button type="primary" plain icon="el-icon-plus"  @click="openDialogAddPost">新 增</el-button>
      <el-button type="danger" plain icon="el-icon-delete"  @click="deletePosts">删 除</el-button>
      <el-button type="success" plain icon="el-icon-download"  @click="deletePosts">导 出</el-button>
    </el-row>
    <el-row>
      <el-table v-loading="loading" :data="tableData" stripe style="width: 100%" ref="informTable"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="序号" width="55"></el-table-column>
        <el-table-column prop="title" label="岗位名称"></el-table-column>
        <el-table-column prop="serial" label="排序"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="editPost(scope.row.id)"><i class="el-icon-edit"></i>修改</el-link>
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="deletePost(scope.row)"><i class="el-icon-delete"></i>删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="text-align: center">
      <pagination :total="20"></pagination>
    </el-row>

    <el-dialog :title="dialogAddPostTitle+'岗位'" :visible.sync="dialogAddPost" :before-close="closeDialog">
      <el-form :model="post" :rules="rules" ref="post">
        <el-row>
          <el-col :span="24">
            <el-form-item label="岗位名称" :label-width="formLabelWidth" prop="title">
              <el-input v-model="post.title" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="岗位顺序" :label-width="formLabelWidth" prop="serial">
              <el-input-number v-model="post.serial" :min="0" :max="99"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="岗位状态" :label-width="formLabelWidth" prop="state">
              <el-radio-group v-model="post.state">
                <el-radio :label="0">正常</el-radio>
                <el-radio :label="1">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2}"
                placeholder="请输入内容"
                v-model="post.remark">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button @click="clearPost" type="warning" plain style="float:left;">清 空</el-button>
        <el-button type="primary" @click="savePost('post')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from '@/components/Pagination'
export default {
  name: 'Post',
  components: { pagination },
  data () {
    return {
      tableData: [
        {
          id: '1',
          title: '董事长',
          serial: '1',
          state: '正常',
          date: '2021/2/19'
        },
        {
          id: '2',
          title: '总经理',
          serial: '2',
          state: '正常',
          date: '2021/2/19'
        }
      ],
      post: {
        title: '',
        serial: '',
        state: 0,
        remark: ''
      },
      multipleSelection: [],
      loading: false,
      formLabelWidth: '80px',
      dialogAddPost: false,
      dialogAddPostTitle: '新增',
      rules: {
        title: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' }
        ]
      },
      searchPostOption: {
        title: '',
        state: ''
      },
      stateSelect: [
        {
          label: '正常',
          value: '0'
        },
        {
          label: '停用',
          value: '1'
        }
      ]
    }
  },
  methods: {
    /**
     * 打开新增对话框
     */
    openDialogAddPost () {
      this.dialogAddPostTitle = '新增'
      this.dialogAddPost = true
    },
    /**
     * 打开编辑对话框
     */
    editPost (id) {
      this.dialogAddPostTitle = '修改'
      this.dialogAddPost = true
      /**
       * 这里通过传入的id参数从后台获取数据传入到post表单
       */
    },
    /**
     * 离开对话框并清除表单规则
     */
    closeDialog () {
      this.clearPost()
      this.dialogAddPost = false
    },
    /**
     * 清除对话框表单规则
     */
    clearPost () {
      this.$refs.post.resetFields()
    },
    /**
     * 保存 新增/修改 的岗位信息
     */
    savePost (post) {
      this.$refs[post].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认' + this.dialogAddPostTitle + '名称为"' + this.post.title + '"的岗位?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message.success(this.dialogAddPostTitle + '岗位成功!')
            this.dialogAddPost = false
          })
        } else {
          return false
        }
      })
    },
    /**
     * 搜索岗位
     */
    searchPost () {
      this.loading = true
      this.$message.success('触发搜索API')
      this.loading = false
    },
    /**
     * 删除单个岗位
     */
    deletePost (row) {
      this.$confirm('是否确认删除名称为"' + row.title + '"的岗位?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功!')
        this.dialogAddInform = false
      })
    },
    /**
     * 批量删除岗位
     */
    deletePosts () {
      const postList = this.multipleSelection
      const idList = []
      if (postList.length !== 0) {
        for (const index in postList) {
          idList.push(postList[index].id)
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
