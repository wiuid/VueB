<template>
  <div>
    <el-row>
      <treeselect :normalizer="normalizer" v-model="params.departmentId" :options="department" placeholder="请选择用户所在部门" style="width: 200px; margin-right: 10px"></treeselect>
      <el-input v-model="params.username" style="width: 200px; margin-right: 10px" placeholder="输入用户名称" clearable></el-input>
      <el-select v-model="params.state" placeholder="请选择用户状态" style="width: 200px; margin-right: 10px" clearable>
        <el-option
          v-for="item in stateSelect"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
        style="width: 300px; margin-right: 10px"
        v-model="searchDate"
        type="daterange"
        clearable
        range-separator="-"
        start-placeholder="开始创建日期"
        end-placeholder="结束创建日期">
      </el-date-picker>
      <el-button type="primary" plain icon="el-icon-refresh" @click="reSearchUserOption">重置</el-button>
      <el-button type="primary" plain icon="el-icon-search" @click="getTableData">搜索</el-button>
    </el-row>
    <el-row>
      <el-button type="primary" plain icon="el-icon-plus"  @click="openAddDialog">新 增</el-button>
      <el-button type="danger" plain icon="el-icon-delete"  @click="deleteDatas">删 除</el-button>
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
            {{scope.row.departmentTitle | formatNull()}}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机" align="center">
          <template slot-scope="scope">
            {{scope.row.phone | formatNull()}}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" :active-value="0" :inactive-value="1" @change="dataStateSwitch(scope.row.id)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" align="center">
          <template slot-scope="scope">
            {{scope.row.createDate | formatData()}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="openEditDialog(scope.row.id)"><i class="el-icon-edit"></i>修改</el-link>
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="openEditPasswordDialog(scope.row)"><i class="el-icon-edit"></i>密码</el-link>
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
            <el-form-item label="部门" :label-width="formLabelWidth" prop="departmentId">
              <treeselect :normalizer="normalizer" v-model="user.departmentId" :options="department" placeholder="请选择部门">
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
          <el-col :span="12">
            <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
              <el-input type="number" v-model="user.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
              <el-input v-model="user.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
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
          <el-col :span="24">
            <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
              <el-input type="textarea" placeholder="请输入备注" v-model="user.remark" show-word-limit rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveData('user')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改用户密码" :visible.sync="dialogUpdatePassword" width="30%" :before-close="closeUpdatePassword">
      <el-form :model="userPassword" :rules="userPasswordRules" ref="userPassword">
        <el-form-item label="您的密码" :label-width="formLabelWidth" prop="rootPassword">
          <el-input type="password" v-model="userPassword.rootPassword"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth" prop="userPassword">
          <el-input type="password" v-model="userPassword.userPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="confirmPassword" required>
          <el-input type="password" v-model="userPassword.confirmPassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeUpdatePassword()">取 消</el-button>
        <el-button type="primary" @click="updateUserPassword('userPassword')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import '@/assets/styles/defaultTreeselect.css'
import treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import pagination from '@/components/Pagination'
import { getData, getUser, saveUser, updatePassword, updateState, deleteUser, deleteUsers } from '@/api/system/user'
import { getRoleTree } from '@/api/system/user/auth'
import { getDepartmentTree } from '@/api/system/department'
import { getPostTree } from '@/api/system/department/post'

export default {
  name: 'User',
  components: { pagination, treeselect },
  data () {
    const validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入用户密码'))
      } else if (value !== this.userPassword.userPassword) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      total: 0,
      multipleSelection: [],
      searchDate: [],
      loading: false,
      params: {
        departmentId: null,
        username: '',
        phone: '',
        state: '',
        createDateStart: '',
        createDateEnd: '',
        page: 1
      },

      role: [],
      department: [],
      post: [],
      user: {
        id: 0,
        username: '',
        nickname: '',
        departmentId: null,
        phone: '',
        email: '',
        state: 0,
        postId: '',
        roleId: '',
        remark: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账户', trigger: 'blur' },
          { min: 5, message: '账号最短五位' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, message: '昵称最短两位' }
        ]
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
      ],

      userPassword: {
        id: 0,
        username: '',
        rootPassword: '',
        userPassword: '',
        confirmPassword: ''
      },
      userPasswordRules: {
        rootPassword: [
          { required: true, message: '请输入您的密码', trigger: 'blur' },
          { min: 6, message: '密码最短6位' }
        ],
        userPassword: [
          { required: true, message: '请输入该用户的新密码', trigger: 'blur' },
          { min: 6, message: '密码最短6位' }
        ],
        confirmPassword: [
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      },
      dialogAddUser: false,
      dialogAddUserTitle: '新增',
      formLabelWidth: '80px',
      dialogUpdatePassword: false
    }
  },
  mounted () {
    Promise.all([this.getTableData(), this.getDataRole(), this.getDataDepartment(), this.getDataPost()])
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
    formatNull (param) {
      if (param === null || param === '') {
        return '暂无'
      } else {
        return param
      }
    }
  },
  methods: {
    // 请求数据
    getTableData () {
      this.loading = true
      // 时间处理
      if (this.searchDate.length !== 0) {
        this.params.createDateStart = this.searchDate[0]
        this.params.createDateEnd = this.searchDate[1]
      }

      // 数据请求
      const res = new Promise((resolve, reject) => {
        getData(this.params).then((result) => {
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
    // 页码跳转
    pageJump (page) {
      this.params.page = page
      this.getTableData()
    },
    // 获取角色信息
    getDataRole () {
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
    // 获取部门数据
    getDataDepartment () {
      const res = new Promise((resolve, reject) => {
        getDepartmentTree().then((result) => {
          resolve(result)
        }).catch((err) => { reject(err) })
      })
      res.then((result) => {
        if (result.status === 200) {
          this.department = JSON.parse(result.data.departmentList)
        }
      })
    },
    // 获取岗位数据
    getDataPost () {
      const res = new Promise((resolve, reject) => {
        getPostTree().then((result) => {
          resolve(result)
        }).catch((err) => { reject(err) })
      })
      res.then((result) => {
        if (result.status === 200) {
          this.post = result.data.postList
        }
      })
    },

    // 打开新增对话框
    openAddDialog () {
      this.dialogAddUserTitle = '新增'
      this.dialogAddUser = true
    },
    // 打开编辑对话框
    openEditDialog (id) {
      this.dialogAddUserTitle = '编辑'
      const res = new Promise((resolve, reject) => {
        getUser(id).then((result) => {
          resolve(result)
        }).catch((err) => { reject(err) })
      })
      res.then((result) => {
        if (result.status === 200) {
          this.user.id = result.data.user.id
          this.user.username = result.data.user.username
          this.user.nickname = result.data.user.nickname
          this.user.departmentId = result.data.user.departmentId
          this.user.phone = result.data.user.phone
          this.user.email = result.data.user.email
          this.user.state = result.data.user.state
          this.user.postId = result.data.user.postId
          this.user.roleId = result.data.user.roleId
          this.user.remark = result.data.user.remark
          this.dialogAddUser = true
        }
      })
    },
    // 关闭对话框
    closeDialog () {
      this.dialogAddUser = false
      this.$refs.user.resetFields()
      this.user.id = 0
      this.user.username = ''
      this.user.nickname = ''
      this.user.departmentId = null
      this.user.phone = ''
      this.user.email = ''
      this.user.state = 0
      this.user.postId = ''
      this.user.roleId = ''
      this.user.remark = ''
    },

    openEditPasswordDialog (row) {
      this.userPassword.id = row.id
      this.userPassword.username = row.username
      this.dialogUpdatePassword = true
    },
    closeUpdatePassword () {
      this.dialogUpdatePassword = false
      this.$refs.userPassword.resetFields()
    },
    updateUserPassword (userPassword) {
      this.$refs[userPassword].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认修改名称为"' + this.userPassword.username + '"用户的密码?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const res = new Promise((resolve, reject) => {
              updatePassword(this.userPassword).then((result) => { resolve(result) })
            })
            res.then((result) => {
              if (result.status === 200) {
                this.$message.success(result.msg)
                this.closeUpdatePassword()
              }
            })
          })
        } else {
          return false
        }
      })
    },

    // 清除搜索参数的表单
    reSearchUserOption () {
      this.params.departmentId = null
      this.params.username = ''
      this.params.phone = ''
      this.params.state = ''
      this.params.createDateStart = ''
      this.params.createDateEnd = ''
      this.params.page = 1
      this.getTableData()
    },
    // 新增/编辑 api
    saveData (user) {
      this.$refs[user].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认' + this.dialogAddUserTitle + '名称为"' + this.user.username + '"的用户?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const res = new Promise((resolve, reject) => {
              saveUser(this.user).then((result) => { resolve(result) })
            })
            res.then((result) => {
              if (result.status === 200) {
                this.$message.success(result.msg)
                this.getTableData()
                this.closeDialog()
              }
            })
          })
        } else {
          return false
        }
      })
    },
    dataStateSwitch (id) {
      const res = new Promise((resolve, reject) => {
        updateState(id).then((result) => { resolve(result) })
      })
      res.then((result) => {
        if (result.status === 200) {
          this.$message.success(result.msg)
        } else {
          this.getTableData()
        }
      })
    },
    // 删除单个用户
    deleteData (row) {
      this.$confirm('是否确认删除账户为"' + row.username + '"的用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const res = new Promise((resolve, reject) => {
          deleteUser(row.id).then((result) => { resolve(result) })
        })
        res.then((result) => {
          if (result.status === 200) {
            this.$message.success(result.msg)
            this.getTableData()
          }
        })
      })
    },
    // 删除多个用户
    deleteDatas () {
      const userList = this.multipleSelection
      const idList = []
      const usernameList = []
      if (userList.length !== 0) {
        for (const index in userList) {
          idList.push(userList[index].id)
          usernameList.push(userList[index].username)
        }
        this.$confirm('是否确认删除序号为"' + usernameList.toString() + '"的账户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const res = new Promise((resolve, reject) => {
            deleteUsers(idList.toString()).then((result) => { resolve(result) })
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
     * 获取当前选中了表格中的哪些数据
     * @param val
     */
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 属性列表选择框 属性定义
    normalizer (node) {
      return {
        id: node.id,
        label: node.title,
        children: node.children
      }
    }
  }
}
</script>

<style>
  div.vue-treeselect__control{
    height: 32px !important;
  }

</style>
