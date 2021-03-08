<template>
  <div>
    <el-row>
      <el-col :span="8" style="margin-bottom: 10px">
        <el-input v-model="searchAuthOption.name" style="width: 300px;" placeholder="请输入权限名称" clearable></el-input>
      </el-col>
      <el-col :span="8" style="margin-bottom: 10px">
        <el-input v-model="searchAuthOption.code" style="width: 300px;" placeholder="请输入权限字符" clearable></el-input>
      </el-col>
      <el-col :span="8" style="margin-bottom: 10px">
        <el-select v-model="searchAuthOption.state" placeholder="请选择权限状态" style="width: 300px" clearable>
          <el-option
            v-for="item in stateSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" style="margin-bottom: 10px">
        <el-date-picker
          style="width: 300px;"
          v-model="searchAuthOption.date"
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
      <el-button type="primary" plain icon="el-icon-plus"  @click="openDialogAddPost">新 增</el-button>
      <el-button type="danger" plain icon="el-icon-delete"  @click="deletePosts">删 除</el-button>
      <el-button type="danger" plain icon="el-icon-circle-close"  @click="deletePosts">停 用</el-button>
      <el-button type="success" plain icon="el-icon-download"  @click="deletePosts">导 出</el-button>
    </el-row>
    <el-row>
      <el-table v-loading="loading" :data="tableData" stripe style="width: 100%" ref="informTable"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="序号" width="55"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="code" label="字符"></el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state"></el-switch>
          </template>
        </el-table-column>
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
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data () {
    return {
      loading: false,
      tableData: [
        {
          id: '1',
          name: '超级管理员',
          code: 'admin',
          state: true,
          date: '2021/02/21'
        },
        {
          id: '2',
          name: '普通角色',
          code: 'common',
          state: false,
          date: '2021/02/21'
        }
      ],
      searchAuthOption: {
        name: '',
        code: '',
        state: '',
        date: ''
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
  }
}
</script>

<style scoped>

</style>
