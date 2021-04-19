<template>
  <div>
    <el-row style="margin-bottom: 10px">
      <el-input v-model="params.title" style="margin: 0 10px 10px 0;width: 200px;" placeholder="请输入权限名称" clearable></el-input>
      <el-input v-model="params.code" style="margin: 0 10px 10px 0;width: 200px;" placeholder="请输入权限字符" clearable></el-input>
      <el-select v-model="params.state" placeholder="请选择权限状态" style="margin: 0 10px 10px 0;width: 200px" clearable>
        <el-option v-for="item in stateSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-date-picker style="margin: 0 10px 10px 0" v-model="searchDate" type="daterange" clearable range-separator="-" start-placeholder="开始创建日期" end-placeholder="结束创建日期"></el-date-picker>
      <el-button type="primary" plain icon="el-icon-search"  @click="getTableData" style="margin: 0 10px 10px 0">搜索</el-button>
      <el-button type="primary" plain icon="el-icon-refresh"  @click="reSearchParams" style="margin: 0 10px 10px 0">重置</el-button>
    </el-row>
    <el-row>
      <el-button type="primary" plain icon="el-icon-plus"  @click="openAddDialog">新 增</el-button>
      <el-button type="danger" plain icon="el-icon-delete"  @click="deleteDatas">删 除</el-button>
      <el-button type="success" plain icon="el-icon-download" @click="exportData">导 出</el-button>
    </el-row>
    <el-row>
      <el-table v-loading="loading" :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange" :header-cell-style="{'text-align':'center'}">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column prop="id" v-if="false"></el-table-column>
        <el-table-column prop="title" label="名称" align="center"></el-table-column>
        <el-table-column prop="code" label="字符" align="center"></el-table-column>
        <el-table-column prop="serial" label="排序" align="center"></el-table-column>
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

    <el-dialog :title="dialogAddRoleTitle+'角色'" :visible.sync="dialogAddRole" :before-close="closeDialog">
      <el-form :model="role" :rules="rules" ref="role">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称" :label-width="formLabelWidth" prop="title">
              <el-input v-model="role.title" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="code" :label-width="formLabelWidth" prop="code">
              <el-input v-model="role.code" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="排序" :label-width="formLabelWidth" prop="serial">
              <el-input-number v-model="role.serial" :min="0" :max="99"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" :label-width="formLabelWidth" prop="state">
               <el-radio-group v-model="role.state">
                <el-radio :label="0">正常</el-radio>
                <el-radio :label="1">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="权限" :label-width="formLabelWidth">
            <div style="height: 150px; margin-bottom: 10px">
              <el-scrollbar style="height:100%">
                <el-tree
                  :data="authTree"
                  show-checkbox
                  :default-checked-keys="ids"
                  node-key="id"
                  ref="tree"
                  highlight-current
                  check-strictly
                  :props="defaultProps">
                </el-tree>
                <div v-if="authTreeIf">
                    <el-button plain>请点击我</el-button>
                </div>
              </el-scrollbar>
            </div>
            <el-button plain @click="setAllSelect">全选</el-button>
            <el-button plain @click="setInvertSelect">反选</el-button>
            <el-button plain @click="setCancelSelect">取消</el-button>
            <el-button plain @click="viewSelect">查看选中</el-button>

          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
            <el-input type="textarea" placeholder="备注内容" v-model="role.remark" show-word-limit rows="3"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveData('role')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import pagination from '@/components/Pagination'
import { getData, getRole, getAuthTree, saveRole, updateState, deleteRole, deleteRoles, exportRole } from '@/api/system/user/auth'
export default {
  name: 'Auth',
  components: { pagination },
  data () {
    return {
      loading: false,
      tableData: [],
      multipleSelection: [],
      searchDate: [],
      total: 0,
      params: {
        title: '',
        code: '',
        state: null,
        createDateStart: '',
        createDateEnd: '',
        page: 1
      },

      dialogAddRole: false,
      dialogAddRoleTitle: '新增',
      formLabelWidth: '80px',

      // 对话框表单
      role: {
        id: 0,
        title: '',
        code: '',
        authIds: '',
        serial: 0,
        state: 0,
        remark: ''
      },
      ids: [],
      rules: {
        title: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入角色字符', trigger: 'blur' }
        ]
      },

      // 权限树
      authTree: [],
      authTreeIf: false,
      // 指定权限树中需要显示的字段
      defaultProps: {
        label: 'title'
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
  mounted () {
    this.getTableData()
    this.getDataAuth()
    if (this.authTree === []) {
      this.authTreeIf = true
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
    // 搜索角色数据
    getTableData () {
      this.loading = true
      if (this.searchDate.length !== 0) {
        this.params.createDateStart = this.searchDate[0]
        this.params.createDateEnd = this.searchDate[1]
      }
      var res = new Promise((resolve, reject) => {
        getData(this.params).then((result) => { resolve(result) }).catch((err) => { reject(err) })
      })
      res.then((result) => {
        if (result.status === 200) {
          this.tableData = result.data.roleList
          this.total = result.data.total
          this.loading = false
        }
      })
    },
    // 获取权限数据
    getDataAuth () {
      var res = new Promise((resolve, reject) => {
        getAuthTree().then((result) => { resolve(result) }).catch((err) => { reject(err) })
      })
      res.then((result) => {
        if (result.status === 200) {
          this.authTree = result.data.authTree
        }
      })
    },
    // 打开新增对话框
    openAddDialog () {
      this.dialogAddRoleTitle = '新增'
      this.dialogAddRole = true
    },
    // 打开编辑对话框
    openEditDialog (id) {
      this.dialogAddRoleTitle = '修改'
      var res = new Promise((resolve, reject) => {
        getRole(id).then((result) => { resolve(result) }).catch((err) => { reject(err) })
      })
      res.then((result) => {
        if (result.status === 200) {
          this.role = result.data.role
          this.$refs.tree.setCheckedKeys(result.data.role.authIds.split(','))
        }
      })
      this.dialogAddRole = true
    },
    // 离开对话框的操作
    closeDialog () {
      this.dialogAddRole = false
      this.$refs.tree.setCheckedKeys([])
      this.$refs.role.resetFields()
      this.role.id = 0
      this.role.title = ''
      this.role.code = ''
      this.role.serial = 0
      this.role.state = 0
      this.role.remark = ''
    },
    // 页码跳转
    pageJump (page) {
      this.params.page = page
      this.getTableData()
    },
    // 重置搜索条件
    reSearchParams () {
      this.params.title = ''
      this.params.code = ''
      this.params.state = null
      this.params.createDateStart = ''
      this.params.createDateEnd = ''
      this.params.parge = 1
      this.getTableData()
    },
    // 新建/修改 接口对接
    saveData (role) {
      this.$refs[role].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认' + this.dialogAddRoleTitle + '名称为"' + this.role.title + '"的角色?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var id = this.role.id
            if (id === 1 || id === 2) {
              this.$message.warning('提示：默认角色不可删除，不可修改！')
              this.closeDialog()
            } else {
              this.role.authIds = this.$refs.tree.getCheckedKeys().toString()
              var res = new Promise((resolve, reject) => {
                saveRole(this.role).then((result) => { resolve(result) }).catch((err) => { reject(err) })
              })
              res.then((result) => {
                if (result.status === 200) {
                  this.$message.success(result.msg)
                  this.getTableData()
                  this.closeDialog()
                } else {
                  this.$message.error(result.msg)
                }
              })
            }
          })
        } else {
          return false
        }
      })
    },
    // 修改单数据状态
    dataStateSwitch (id) {
      if (id === 1 || id === 2) {
        this.$message.warning('提示：默认角色不可删除，不可修改！')
        this.getTableData()
        return
      }
      var res = new Promise((resolve, reject) => {
        updateState(id).then((result) => { resolve(result) }).catch((err) => { reject(err) })
      })
      res.then((result) => {
        if (result.status === 200) {
          this.$message.success(result.msg)
        } else {
          this.$message.error(result.msg)
          this.getTableData()
        }
      })
    },
    // 删除单条数据
    deleteData (row) {
      this.$confirm('是否确认删除名称为"' + row.title + '"的角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.id === 1 || row.id === 2) {
          this.$message.warning('提示：默认角色不可删除，不可修改！')
          return
        }
        const res = new Promise((resolve, reject) => {
          deleteRole(row.id).then((result) => { resolve(result) }).catch((err) => { reject(err) })
        })
        res.then((result) => {
          if (result.status === 200) {
            this.$message.success(result.msg)
            this.getTableData()
          } else {
            this.$message.error(result.msg)
          }
        })
      })
    },
    // 批量删除数据
    deleteDatas () {
      const roleList = this.multipleSelection
      const idList = []
      const titleList = []
      if (roleList.length !== 0) {
        for (const index in roleList) {
          idList.push(roleList[index].id)
          titleList.push(roleList[index].title)
        }
        if (idList.includes(1) || idList.includes(2)) {
          this.$message.warning('提示：默认角色不可删除，不可修改！')
          return
        }
        this.$confirm('是否确认删除名称为"' + titleList.toString() + '"的岗位?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const res = new Promise((resolve, reject) => {
            deleteRoles(idList.toString()).then((result) => { resolve(result) }).catch((err) => { reject(err) })
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
    // 导出
    exportData () {
      const res = new Promise((resolve, reject) => {
        exportRole().then((result) => { resolve(result) }).catch((err) => { reject(err) })
      })
      res.then(result => {
        this.$notify.success({
          title: '下载提示',
          message: '正在进行下载，下载完成请查看浏览器下载位置！',
          position: 'bottom-left'
        })
        const url = window.URL.createObjectURL(new Blob([result]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', '角色信息.xls')

        document.body.appendChild(link)
        link.click()
      })
    },
    // 全选
    setAllSelect () {
      this.$refs.tree.setCheckedKeys([0, 1, 2, 3, 4, 5, 6])
    },
    // 反选
    setInvertSelect () {
      var keys = this.$refs.tree.getCheckedKeys()
      var keyList = []
      for (let index = 1; index < 19; index++) {
        if (keys.indexOf(index) === -1) {
          keyList.push(index)
        }
      }
      this.$refs.tree.setCheckedKeys(keyList)
    },
    // 取消选中
    setCancelSelect () {
      this.$refs.tree.setCheckedKeys([])
    },
    viewSelect () {
      var keys = this.$refs.tree.getCheckedKeys()
      this.$message.info(keys.toString())
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
.el-tree {
  background: #f4f4f4 !important;
}
.el-scrollbar__wrap {
  /* 必要的 */
  overflow: scroll;
  /* 隐藏侧边默认滚动条 （达不到效果可以自己试着微调） 如解决不了可尝试用 `margin-right -60px` */
  width: 110%;
  /* 隐藏侧边默认滚动条 （达不到效果可以自己试着微调） 如解决不了可尝试用 `margin-right -60px` */
  height: 100%;
}
.el-scrollbar__wrap    {
  overflow-x: hidden!important;
}
</style>
