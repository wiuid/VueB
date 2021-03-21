<template>
  <div>
    <el-row>
      <el-col :lg="8" :md="12" :sm="24" style="margin-bottom: 10px">
        <treeselect v-model="params.departmentId" :options="option" placeholder="请选择用户所在部门" style="width: 300px">
          <label slot="option-label" slot-scope="{ node, labelClassName }" :class="labelClassName">
            {{ node.label }}
          </label>
        </treeselect>
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" style="margin-bottom: 10px">
        <el-input v-model="params.username" style="width: 300px;" placeholder="输入用户名称" clearable></el-input>
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" style="margin-bottom: 10px">
        <el-input v-model="params.phone" style="width: 300px;" placeholder="输入手机号码" clearable></el-input>
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" style="margin-bottom: 10px">
        <el-select v-model="params.state" placeholder="请选择用户状态" style="width: 300px" clearable>
          <el-option
            v-for="item in stateSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" style="margin-bottom: 10px">
        <el-date-picker
          style="width: 300px;"
          v-model="searchDate"
          type="daterange"
          clearable
          range-separator="-"
          start-placeholder="开始创建日期"
          end-placeholder="结束创建日期">
        </el-date-picker>
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" style="margin-bottom: 10px">
        <el-button type="primary" plain icon="el-icon-refresh"  @click="reSearchUserOption">重置</el-button>
        <el-button type="primary" plain icon="el-icon-search"  @click="searchUser">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-button type="primary" plain icon="el-icon-plus"  @click="openDialogAddUser">新 增</el-button>
      <el-button type="danger" plain icon="el-icon-delete"  @click="deleteUsers">删 除</el-button>
    </el-row>
    <el-row>
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        style="width: 100%"
        ref="userTable"
        @selection-change="handleSelectionChange"
        :header-cell-style="{'text-align':'center'}">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="序号" type="index" width="55" align="center"></el-table-column>
        <el-table-column prop="id" v-if="false"></el-table-column>
        <el-table-column prop="username" label="账户" align="center"></el-table-column>
        <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
        <el-table-column prop="departmentTitle" label="部门" align="center">
          <template slot-scope="scope">
            {{scope.row.departmentTitle | nullReturn()}}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机" align="center">
          <template slot-scope="scope">
            {{scope.row.phone | nullReturn()}}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" :active-value="0" :inactive-value="1"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" align="center">
          <template slot-scope="scope">
            {{scope.row.createDate | formatData()}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="editUser(scope.row.id)"><i class="el-icon-edit"></i>修改</el-link>
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="deleteUser(scope.row)"><i class="el-icon-delete"></i>删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="text-align: center">
      <pagination :total="20"></pagination>
    </el-row>

    <el-dialog :title="dialogAddUserTitle+'用户'" :visible.sync="dialogAddUser" :before-close="closeDialog">
      <el-form :model="user" :rules="rules" ref="user">
        <el-row>
          <el-col :span="12">
            <el-form-item label="账户" :label-width="formLabelWidth" prop="username">
              <el-input v-model="user.username" autocomplete="off" placeholder="请输入账户，不可修改"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
              <el-input v-model="user.nickname" autocomplete="off" placeholder="请输入用户昵称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门" :label-width="formLabelWidth" prop="departmentId">
              <treeselect v-model="user.departmentId" :options="option" placeholder="请选择部门">
                <label slot="option-label" slot-scope="{ node, labelClassName }" :class="labelClassName">
                  {{ node.label }}
                </label>
              </treeselect>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岗位" :label-width="formLabelWidth" prop="postId">
              <el-select v-model="user.postId" placeholder="请选择岗位" style="width: 100%">
                <el-option
                  v-for="item in post"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
              <el-input v-model="user.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
              <el-input v-model="user.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色" :label-width="formLabelWidth" prop="roleId">
              <el-select v-model="user.roleId" placeholder="请选择角色" style="width: 100%">
                <el-option
                  v-for="item in role"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" :label-width="formLabelWidth" prop="state">
              <el-radio-group v-model="user.state">
                <el-radio :label="0">正常</el-radio>
                <el-radio :label="1">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
              <el-input type="textarea" placeholder="请输入备注" v-model="user.remark" show-word-limit rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button @click="clearUser" type="warning" plain style="float:left;">清 空</el-button>
        <el-button type="primary" @click="saveUser('user')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '@/assets/styles/defaultTreeselect.css'
import treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import pagination from '@/components/Pagination'
import { getUserList, getUser } from '@/api/system/user'
import { getRoleTree } from '@/api/system/user/auth'

export default {
  name: 'User',
  components: { pagination, treeselect },
  data () {
    return {
      tableData: [],
      role: [],
      user: {
        id: '0',
        username: '',
        nickname: '',
        departmentId: null,
        phone: '',
        email: '',
        state: 0,
        postId: '',
        roleId: '',
        marks: ''
      },
      option: [
        {
          id: 'a',
          label: 'a',
          children: [
            {
              id: 'aa',
              label: 'aa'
            },
            {
              id: 'ab',
              label: 'ab'
            }
          ]
        },
        {
          id: 'b',
          label: 'b'
        },
        {
          id: 'c',
          label: 'c'
        }
      ],
      stateSelect: [
        {
          label: '正常',
          value: '0'
        },
        {
          label: '停用',
          value: '1'
        }
      ],
      multipleSelection: [],
      dialogAddUser: false,
      dialogAddUserTitle: '新增',
      formLabelWidth: '80px',
      params: {
        departmentId: null,
        username: '',
        phone: '',
        state: '',
        createDateStart: '',
        createDateEnd: '',
        page: 1
      },
      searchDate: [],
      loading: false,
      total: ''
    }
  },
  mounted () {
    this.getRoleList()
    this.searchUser()
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
    },
    nullReturn (param) {
      if (param === null) {
        return '暂无'
      } else {
        return param
      }
    }
  },
  methods: {
    getRoleList () {
      const res = new Promise((resolve, reject) => {
        getRoleTree().then((result) => {
          resolve(result)
        }).catch((err) => { reject(err) })
      })
      res.then((result) => {
        if (result.status === 200) {
          this.role = result.data.roleList
        }
      })
    },
    // 请求数据
    searchUser () {
      this.loading = true
      // 时间处理
      if (this.searchDate.length !== 0) {
        this.params.createDateStart = this.searchDate[0]
        this.params.createDateEnd = this.searchDate[1]
      }

      // 数据请求
      const res = new Promise((resolve, reject) => {
        getUserList(this.params).then((result) => {
          resolve(result)
        }).catch((err) => { reject(err) })
      })

      res.then((result) => {
        if (result.status === 200) {
          this.tableData = result.data.userList
          this.total = result.data.total
        } else {
          this.tableData = []
          this.$methods.info(result.msg)
        }
        this.loading = false
      })
    },
    // 打开新增对话框
    openDialogAddUser () {
      this.dialogAddUserTitle = '新增'
      this.dialogAddUser = true
    },
    // 打开编辑对话框
    editUser (id) {
      this.dialogAddUserTitle = '编辑'
      const res = new Promise((resolve, reject) => {
        getUser(id).then((result) => {
          resolve(result)
        }).catch((err) => { reject(err) })
      })
      res.then((result) => {
        if (result.status === 200) {
          this.user = result.data.user
          this.dialogAddUser = true
        } else {
          this.tableData = []
          this.$methods.info(result.msg)
        }
      })
    },
    // 关闭对话框
    closeDialog () {
      this.clearUser()
      this.dialogAddUser = false
    },
    // 清除新增/编辑 对话框中的表单
    clearUser () {
      this.$refs.user.resetFields()
    },
    // 清除搜索参数的表单
    clearSearchUser () {
      this.$refs.user.resetFields()
    },
    // 新增/编辑 api
    saveUser (user) {
      this.$refs[user].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认' + this.dialogAddUserTitle + '名称为"' + this.user.username + '"的用户?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message.success(this.dialogAddUserTitle + '成功!')
            this.dialogAddUser = false
          })
        } else {
          return false
        }
      })
    },
    // 删除单个用户
    deleteUser (row) {
      this.$confirm('是否确认删除账户为"' + row.username + '"的用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功!')
        this.dialogAddUser = false
      })
    },
    // 删除多个用户
    deleteUsers () {
      const postList = this.multipleSelection
      const idList = []
      if (postList.length !== 0) {
        for (const index in postList) {
          idList.push(postList[index].id)
        }
        this.$confirm('是否确认删除序号为"' + idList.toString() + '"的账户?', '提示', {
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

<style>
  div.vue-treeselect__control{
    height: 32px !important;
  }

</style>
