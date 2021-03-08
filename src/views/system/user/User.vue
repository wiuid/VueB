<template>
  <div>
    <el-row>
      <el-col :span="8" style="margin-bottom: 10px">
        <treeselect v-model="searchUserOption.department" :options="option" placeholder="请选择用户所在部门" style="width: 300px">
          <label slot="option-label" slot-scope="{ node, labelClassName }" :class="labelClassName">
            {{ node.label }}
          </label>
        </treeselect>
      </el-col>
      <el-col :span="8" style="margin-bottom: 10px">
        <el-input v-model="searchUserOption.name" style="width: 300px;" placeholder="输入用户名称" clearable></el-input>
      </el-col>
      <el-col :span="8" style="margin-bottom: 10px">
        <el-input v-model="searchUserOption.phone" style="width: 300px;" placeholder="输入手机号码" clearable></el-input>
      </el-col>
      <el-col :span="8" style="margin-bottom: 10px">
        <el-select v-model="searchUserOption.state" placeholder="请选择用户状态" style="width: 300px" clearable>
          <el-option
            v-for="item in stateSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8" style="margin-bottom: 10px">
        <el-date-picker
          style="width: 300px;"
          v-model="searchUserOption.date"
          type="daterange"
          clearable
          range-separator="-"
          start-placeholder="开始创建日期"
          end-placeholder="结束创建日期">
        </el-date-picker>
      </el-col>
      <el-col :span="8" style="margin-bottom: 10px">
        <el-button type="primary" plain icon="el-icon-search"  @click="searchUser">搜索</el-button>
        <el-button type="primary" plain icon="el-icon-refresh"  @click="reSearchUserOption">重置</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-button type="primary" plain icon="el-icon-plus"  @click="openDialogAddUser">新 增</el-button>
      <el-button type="danger" plain icon="el-icon-delete"  @click="deleteUsers">删 除</el-button>
    </el-row>
    <el-row>
      <el-table v-loading="loading" :data="tableData" stripe style="width: 100%" ref="informTable"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="序号" width="55"></el-table-column>
        <el-table-column prop="username" label="账户"></el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="department" label="部门"></el-table-column>
        <el-table-column prop="phone" label="手机"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column prop="date" label="创建时间"></el-table-column>
        <el-table-column label="操作">
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
            <el-form-item label="用户账户" :label-width="formLabelWidth" prop="username">
              <el-input v-model="user.username" autocomplete="off" placeholder="请输入账户，不可修改"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户昵称" :label-width="formLabelWidth" prop="nickname">
              <el-input v-model="user.nickname" autocomplete="off" placeholder="请输入用户昵称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门" :label-width="formLabelWidth" prop="department">
              <treeselect v-model="user.department" :options="option" placeholder="请选择部门">
                <label slot="option-label" slot-scope="{ node, labelClassName }" :class="labelClassName">
                  {{ node.label }}
                </label>
              </treeselect>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
              <el-input v-model="user.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="权限" :label-width="formLabelWidth" prop="auth">
              <el-select v-model="user.auth" placeholder="请选择权限">
                <el-option
                  v-for="item in authSelect"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" :label-width="formLabelWidth" prop="marks">
              <el-input type="textarea" placeholder="请输入备注" v-model="user.marks" show-word-limit rows="3"></el-input>
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
import '../../../assets/styles/defaultTreeselect.css'
import treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import pagination from '@/components/Pagination'
export default {
  name: 'User',
  components: { pagination, treeselect },
  data () {
    return {
      tableData: [
        {
          id: '1',
          username: 'zhangsan',
          nickname: '张三',
          department: '开发部',
          phone: '18231200000',
          state: '正常',
          date: '2021年2月20日'
        },
        {
          id: '2',
          username: 'lisi',
          nickname: '李四',
          department: '市场部',
          phone: '18231200000',
          state: '正常',
          date: '2021年2月20日'
        }
      ],
      user: {
        id: '0',
        username: '',
        nickname: '',
        department: null,
        phone: '',
        email: '',
        password: '',
        state: 0,
        post: '',
        auth: '',
        marks: ''
      },
      searchUserOption: {
        department: null, // 这里不可以是单引号，必须是null，不然显示异常
        username: '',
        phone: '',
        state: '',
        date: ''
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
      authSelect: [
        {
          label: '超级管理员',
          value: '0'
        },
        {
          label: '普通管理员',
          value: '1'
        }
      ]
    }
  },
  methods: {
    searchUser () {
      this.$message.success('搜索API')
    },
    reSearchUserOption () {
      this.searchUserOption.department = null
      this.searchUserOption.name = ''
      this.searchUserOption.phone = ''
      this.searchUserOption.state = ''
      this.searchUserOption.date = ''
      this.searchUser()
    },
    openDialogAddUser () {
      this.dialogAddUserTitle = '新增'
      this.dialogAddUser = true
    },
    closeDialog () {
      this.clearUser()
      this.dialogAddUser = false
    },
    clearUser () {
      this.$refs.user.resetFields()
    },
    editUser (id) {
      this.dialogAddUserTitle = '编辑'
      this.user.username = id
      this.dialogAddUser = true
    },
    saveUser (user) {
      this.$refs[user].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认' + this.dialogAddUserTitle + '名称为"' + this.user.username + '"的用户?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message.success(this.dialogAddUserTitle + '成功!')
            this.dialogAddInform = false
          })
        } else {
          return false
        }
      })
    },
    deleteUser (row) {
      this.$confirm('是否确认删除账户为"' + row.username + '"的用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功!')
        this.dialogAddInform = false
      })
    },
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

<style scoped>

</style>
