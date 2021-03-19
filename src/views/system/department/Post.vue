<template>
  <div>
    <el-row style="margin-bottom: 10px">
      <el-input v-model="params.title"  style="margin-right: 10px;width: 200px;" placeholder="输入岗位名称部分字段" clearable></el-input>
      <el-select  v-model="params.state" placeholder="请选择状态" style="margin-right: 10px;" clearable>
        <el-option v-for="item in stateSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" plain icon="el-icon-refresh" @click="clearSearchPost">重置</el-button>
      <el-button type="primary" plain icon="el-icon-search" @click="searchPost">搜索</el-button>
    </el-row>
    <el-row>
      <el-button type="primary" plain icon="el-icon-plus"  @click="openDialogAddPost">新 增</el-button>
      <el-button type="danger" plain icon="el-icon-delete"  @click="deletePosts">删 除</el-button>
      <el-button type="success" plain icon="el-icon-download"  @click="deletePosts">导 出</el-button>
    </el-row>
    <el-row>
      <el-table v-loading="loading" :data="tableData" stripe style="width: 100%" ref="informTable"  @selection-change="handleSelectionChange" :header-cell-style="{'text-align':'center'}">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column prop="id" v-if="false" align="center"></el-table-column>
        <el-table-column prop="title" label="岗位名称" align="center"></el-table-column>
        <el-table-column prop="serial" label="排序" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
            v-model="scope.row.state"
            :active-value="0"
            :inactive-value="1"
            @change="editSwitch(scope.row.id)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="时间" align="center">
          <template slot-scope="scope">
            {{scope.row.createDate | formatData()}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="editPost(scope.row.id)"><i class="el-icon-edit"></i>修改</el-link>
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="deletePost(scope.row)"><i class="el-icon-delete"></i>删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row style="text-align: center">
      <pagination :total="total"
      :pager="params.page"
      :current="pageJump"></pagination>
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
import { getPostList, getPostById, savePost, deletePost, deletePosts, updatePostState } from '@/api/system/department/post'
export default {
  name: 'Post',
  components: { pagination },
  data () {
    return {
      tableData: [],
      post: {
        id: 0,
        title: '',
        serial: 0,
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
      params: {
        title: '',
        state: '',
        page: 1
      },
      total: 0,
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
  mounted () {
    this.searchPost()
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
      const res = new Promise((resolve, reject) => {
        getPostById(id).then((result) => { resolve(result) }).catch((err) => { reject(err) })
      })
      res.then((result) => {
        if (result.status === 200) {
          this.post.id = result.data.post.id
          this.post.title = result.data.post.title
          this.post.serial = result.data.post.serial
          this.post.state = result.data.post.state
          this.post.remark = result.data.post.remark
        }
      })
      this.dialogAddPost = true
      /**
       * 这里通过传入的id参数从后台获取数据传入到post表单
       */
    },
    /**
     * 离开对话框并清除表单规则
     */
    closeDialog () {
      this.dialogAddPost = false
      this.clearPost()
    },
    /**
     * 清除对话框表单规则
     */
    clearPost () {
      this.$refs.post.resetFields()
      this.post.id = 0
      this.post.title = ''
      this.post.serial = 0
      this.post.state = 0
      this.post.remark = ''
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
            const res = new Promise((resolve, reject) => {
              savePost(this.post).then((result) => { resolve(result) }).catch((err) => reject(err))
            })
            res.then((result) => {
              if (result.status === 200) {
                this.$message.success(result.msg)
                this.searchPost()
                this.closeDialog()
              }
            })
          })
        } else {
          return false
        }
      })
    },
    editSwitch (id) {
      const res = new Promise((resolve, reject) => {
        updatePostState(id).then((result) => { resolve(result) }).catch((err) => { reject(err) })
      })
      res.then((result) => {
        if (result.status === 200) {
          this.$message.success(result.msg)
          this.searchPost()
        }
      })
    },
    /**
     * 搜索岗位
     */
    searchPost () {
      this.loading = true
      const res = new Promise((resolve, reject) => {
        getPostList(this.params).then((result) => { resolve(result) }).catch((err) => { reject(err) })
      })
      res.then((result) => {
        this.tableData = result.data.postList
        this.total = result.data.total
        this.loading = false
      })
    },
    pageJump (page) {
      this.params.page = page
      this.searchPost()
    },
    clearSearchPost () {
      this.params.title = ''
      this.params.state = null
      this.params.page = 1
      this.searchPost()
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
        const res = new Promise((resolve, reject) => {
          deletePost(row.id).then((result) => { resolve(result) }).catch((err) => { reject(err) })
        })
        res.then((result) => {
          if (result.status === 200) {
            this.closeDialog()
            this.$message.success(result.msg)
            this.searchPost()
          }
        })
      })
    },
    /**
     * 批量删除岗位
     */
    deletePosts () {
      const postList = this.multipleSelection
      const idList = []
      const titleList = []
      if (postList.length !== 0) {
        for (const index in postList) {
          idList.push(postList[index].id)
          titleList.push(postList[index].title)
        }
        this.$confirm('是否确认删除名称为"' + titleList.toString() + '"的岗位?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const res = new Promise((resolve, reject) => {
            deletePosts(idList.toString()).then((result) => { resolve(result) }).catch((err) => { reject(err) })
          })
          res.then((result) => {
            if (result.status === 200) {
              this.closeDialog()
              this.$message.success(result.msg)
              this.searchPost()
            }
          })
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
