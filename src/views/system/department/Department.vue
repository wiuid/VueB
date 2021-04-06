<template>
  <div>
    <el-row>
      <el-button type="primary" plain icon="el-icon-plus" @click="openAddDialog">新 增</el-button>
    </el-row>
    <el-row>
      <el-table lazy v-loading="loading" row-key="id" :data="tableData" style="width: 100%" ref="departmentTable">
        <el-table-column prop="title" label="部门名称"></el-table-column>
        <el-table-column prop="nickname" label="负责人" align="center">
          <template slot-scope="scope">
            {{scope.row.nickname | formatNull()}}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
            v-model="scope.row.state"
            :active-value="0"
            :inactive-value="1"
            @change="dataStateSwitch(scope.row.id)">
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
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="openEditDialog(scope.row.id)"><i class="el-icon-edit"></i>修改</el-link>
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="openAddChildrenDialog(scope.row.id)"><i class="el-icon-plus"></i>新增</el-link>
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="deleteData(scope.row)"><i class="el-icon-delete"></i>删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog :title="dialogAddDepartmentTitle+'部门'" :visible.sync="dialogAddDepartment" :before-close="closeDialog">
      <el-form :model="department" :rules="rules" ref="department">
        <el-row>
          <el-form-item label="上级部门" :label-width="formLabelWidth" prop="superior">
            <treeselect :normalizer="normalizer" v-model="department.superId" :options="tableData" placeholder="请选择上级部门，不填写则为顶级部门">
            </treeselect>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门名称" :label-width="formLabelWidth" prop="title">
              <el-input v-model="department.title" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人" :label-width="formLabelWidth" prop="userId">
              <el-select v-model="department.userId" filterable clearable placeholder="请选择负责人">
                <el-option
                  v-for="item in userTree"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="部门状态" :label-width="formLabelWidth" prop="state">
            <el-radio-group v-model="department.state" @change="stateHint()">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog;dialogAddDepartment = false">取 消</el-button>
        <el-button type="primary" @click="saveData('department')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getData, getDepartment, saveDepartment, updateState, delectDepartment } from '@/api/system/department'
import { getUserTree } from '@/api/system/user'
export default {
  name: 'Department',
  components: { treeselect },
  data () {
    return {
      // 表格数据
      tableData: [],
      loading: false,

      // 修改/保存 表单
      department: {
        id: 0,
        title: '',
        superId: null,
        userId: null,
        state: 0
      },
      rules: {
        title: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
      },

      userTree: [], // 搜索的用户返回的结果显示

      dialogAddDepartmentTitle: '新增',
      dialogAddDepartment: false,
      formLabelWidth: '80px'
    }
  },
  mounted () {
    this.getTableData()
    this.getUserData()
  },
  filters: {
    // 时间格式化处理
    formatData (time) {
      var data = new Date(time)
      var y = data.getFullYear()
      var M = data.getMonth() + 1
      var d = data.getDate()

      var h = data.getHours()
      var m = data.getMinutes()
      return y + '-' + M + '-' + d + ' ' + h + ':' + m
    },
    // 空值 转换为 暂无 处理
    formatNull (param) {
      if (param === null || param === '') {
        return '暂无'
      } else {
        return param
      }
    }
  },
  methods: {
    // 获得部门列表
    getTableData () {
      this.loading = true
      const res = new Promise((resolve, reject) => {
        getData().then((result) => { resolve(result) }).catch((err) => { reject(err) })
      })
      res.then((result) => {
        if (result.status === 200) {
          if (result.data === null) {
            this.tableData = []
          } else {
            this.tableData = JSON.parse(result.data.departmentList)
          }
          this.loading = false
        }
      })
    },
    getUserData () {
      const res = new Promise((resolve, reject) => {
        getUserTree().then((result) => { resolve(result) }).catch((err) => { reject(err) })
      })
      res.then((result) => {
        if (result.status === 200) {
          this.userTree = JSON.parse(result.data.userList)
        }
      })
    },
    /**
     * 打开新增部门对话框（默认顶级部门）
     */
    openAddDialog () {
      this.dialogAddDepartmentTitle = '新增'
      this.dialogAddDepartment = true
    },
    /**
     * 打开新增部门对话框（自动定位上级部门）
     * @param title
     */
    openAddChildrenDialog (id) {
      this.department.superId = id
      this.dialogAddDepartmentTitle = '新增'
      this.dialogAddDepartment = true
    },
    /**
     * 打开修改部门对话框
     * @param id
     */
    openEditDialog (id) {
      const res = new Promise((resolve, reject) => {
        getDepartment(id).then((result) => { resolve(result) }).catch((err) => { reject(err) })
      })
      res.then((result) => {
        if (result.status === 200) {
          this.department.id = result.data.department.id
          this.department.title = result.data.department.title
          this.department.superId = result.data.department.superId
          this.department.userId = result.data.department.userId
          this.department.state = result.data.department.state
          this.dialogAddDepartmentTitle = '修改'
          this.dialogAddDepartment = true
        }
      })
      /**
       * 这里通过传入的id参数从后台获取数据传入到department表单
       */
    },
    /**
     * 离开对话框并清除校验规则
     */
    closeDialog () {
      this.$refs.department.resetFields()
      this.department.id = 0
      this.department.title = ''
      this.department.superId = null
      this.department.nickname = ''
      this.department.email = ''
      this.department.phone = ''
      this.department.state = 0
      this.dialogAddDepartment = false
    },
    /**
     * 清除检验规则
     */
    /**
     * 保存  新增/修改 的部门信息
     * @param department
     */
    saveData (department) {
      this.$refs[department].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认' + this.dialogAddDepartmentTitle + '名称为"' + this.department.title + '"的部门?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const res = new Promise((resolve, reject) => {
              saveDepartment(this.department).then((result) => { resolve(result) }).catch((err) => { reject(err) })
            })
            res.then((result) => {
              if (result.status === 200) {
                this.$message.success(this.dialogAddDepartmentTitle + '部门成功!')
                this.dialogAddDepartment = false
                this.closeDialog()
                this.getTableData()
              }
            })
          })
        } else {
          return false
        }
      })
    },
    /**
     * 删除部门（仅支持删除单个部门，不支持批量删除）
     * @param row
     */
    deleteData (row) {
      this.$confirm('是否确认删除名称为"' + row.title + '"及下级的部门?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const res = new Promise((resolve, reject) => {
          delectDepartment(row.id).then((result) => { resolve(result) }).catch((err) => { reject(err) })
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
    // 更新部门状态
    dataStateSwitch (id) {
      this.$confirm('此操作将使本部门及下级部门一同更改状态属性, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const res = new Promise((resolve, reject) => {
          updateState(id).then((result) => { resolve(result) }).catch((err) => { reject(err) })
        })
        res.then((result) => {
          if (result.status === 200) {
            this.$message.success(result.msg)
            this.getTableData()
          } else {
            this.$message.error(result.msg)
          }
        })
      }).catch(() => {
        this.getTableData()
      })
    },
    // 提示
    stateHint () {
      this.$message.info('提示：修改状态并提交后，下级部门的状态将一并修改')
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

<style scoped>

</style>
