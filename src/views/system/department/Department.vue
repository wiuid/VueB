<template>
  <div>
    <el-row>
      <el-button type="primary" plain icon="el-icon-plus" size="small" @click="openDialogAddDepartment">新 增</el-button>
    </el-row>
    <el-row>
      <el-table lazy v-loading="loading" row-key="id" :data="tableData" size="mini" style="width: 100%" ref="departmentTable">
        <el-table-column prop="title" label="部门名称"></el-table-column>
        <el-table-column prop="leader" label="负责人"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="editDepartment(scope.row.id)"><i class="el-icon-edit"></i>修改</el-link>
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="openDialogAddDepartment2(scope.row.title)"><i class="el-icon-plus"></i>新增</el-link>
            <el-link :underline="false" type="primary" style="margin-right: 10px;font-size: 10px" @click="deleteDepartment(scope.row)"><i class="el-icon-delete"></i>删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row style="text-align: center">
      <pagination :total="20"></pagination>
    </el-row>
    <el-dialog :title="dialogAddDepartmentTitle+'部门'" :visible.sync="dialogAddDepartment" :before-close="closeDialog">
      <el-form :model="department" :rules="rules" ref="department">
        <el-row>
          <el-form-item label="上级部门" :label-width="formLabelWidth" prop="superior">
            <treeselect v-model="department.superior" :options="options" placeholder="请选择上级部门，不填写则为顶级部门">
              <label slot="option-label" slot-scope="{ node, labelClassName }" :class="labelClassName">
                {{ node.label }}
              </label>
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
            <el-form-item label="负责人" :label-width="formLabelWidth" prop="principal">
              <el-input v-model="department.principal" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
              <el-input v-model="department.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
              <el-input v-model="department.email" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="部门状态" :label-width="formLabelWidth" prop="state">
            <el-radio-group v-model="department.state">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog;dialogAddDepartment = false">取 消</el-button>
        <el-button @click="clearDepartment" type="warning" plain style="float:left;">清 空 重 置</el-button>
        <el-button type="primary" @click="saveDepartment('department')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import pagination from '@/components/Pagination'
export default {
  name: 'Department',
  components: { pagination, treeselect },
  data () {
    return {
      tableData: [
        {
          id: '1',
          title: '部门1',
          leader: '张三',
          state: '正常',
          date: '2020-11-20'
        },
        {
          id: '2',
          title: '部门2',
          leader: '李四',
          state: '正常',
          date: '2020-11-20',
          children: [
            {
              id: '3',
              title: '部门3',
              leader: '王五',
              state: '正常',
              date: '2020-11-20'
            }
          ]
        }
      ],
      loading: false,
      rules: {
        title: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
      },
      department: {
        title: '',
        superior: null,
        principal: '',
        email: '',
        phone: '',
        state: 0,
        date: ''
      },
      dialogAddDepartmentTitle: '新增',
      dialogAddDepartment: false,
      formLabelWidth: '120px',
      options: [ // 选择框下拉 树形组件 的数据
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
      ]
    }
  },
  methods: {
    /**
     * 打开新增部门对话框（默认顶级部门）
     */
    openDialogAddDepartment () {
      this.dialogAddDepartmentTitle = '新增'
      this.dialogAddDepartment = true
    },
    /**
     * 打开新增部门对话框（自动定位上级部门）
     * @param title
     */
    openDialogAddDepartment2 (title) {
      this.dialogAddDepartmentTitle = '新增'
      this.dialogAddDepartment = true
      this.department.superior = title
    },
    /**
     * 打开修改部门对话框
     * @param id
     */
    editDepartment (id) {
      this.dialogAddDepartmentTitle = '修改'
      this.dialogAddDepartment = true
      /**
       * 这里通过传入的id参数从后台获取数据传入到department表单
       */
    },
    /**
     * 清除检验规则
     */
    clearDepartment () {
      this.$refs.department.resetFields()
    },
    /**
     * 离开对话框并清除校验规则
     */
    closeDialog () {
      this.clearDepartment()
      this.dialogAddDepartment = false
    },
    /**
     * 保存  新增/修改 的部门信息
     * @param department
     */
    saveDepartment (department) {
      this.$refs[department].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认' + this.dialogAddDepartmentTitle + '名称为"' + this.department.title + '"的部门?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message.success(this.dialogAddDepartmentTitle + '部门成功!')
            this.dialogAddDepartment = false
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
    deleteDepartment (row) {
      this.$confirm('是否确认删除名称为"' + row.title + '"及下级的部门?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功!')
        this.dialogAddInform = false
      })
    }
  }
}
</script>

<style scoped>

</style>
