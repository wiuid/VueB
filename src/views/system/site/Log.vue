<template>
  <div>
    <el-row style="margin-bottom: 10px">
      <el-input v-model="searchLogOption.title"  style="margin-right: 10px;width: 200px;" placeholder="输入日志标题部分字段" @change="searchLog"></el-input>
      <el-date-picker v-model="searchLogOption.data" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"  :default-time="['00:00:00', '23:59:59']" style="margin-right: 10px" @change="searchLog"></el-date-picker>
      <el-select  v-model="searchLogOption.mark" placeholder="日志分类" style="margin-right: 10px;" clearable @change="searchLog">
        <el-option v-for="item in markSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-row>
    <el-row>
      <el-button type="danger" plain icon="el-icon-delete"  @click="deleteLogs">删 除</el-button>
      <el-button type="success" plain icon="el-icon-download"  @click="deleteLogs">导 出</el-button>
      <el-button type="danger" icon="el-icon-brush"  @click="deleteLogs">清 空</el-button>
    </el-row>
    <el-row>
      <el-table v-loading="loading" :data="tableData" stripe style="width: 100%" ref="logTable" size="mini"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="序号" width="55"></el-table-column>
        <el-table-column prop="title" label="日志标题"></el-table-column>
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="text" label="详情"></el-table-column>
      </el-table>
    </el-row>
    <el-row style="text-align: center">
      <pagination :total="20"></pagination>
    </el-row>
  </div>
</template>

<script>
import pagination from '@/components/Pagination'
export default {
  name: 'Log',
  components: { pagination },
  data () {
    return {
      multipleSelection: [],
      loading: false,
      tableData: [
        {
          id: '1',
          title: '一',
          date: '',
          text: ''
        },
        {
          id: '2',
          title: '二',
          date: '',
          text: ''
        }
      ],
      searchLogOption: {
        title: '',
        date: '',
        mark: ''
      },
      markSelect: [
        {
          label: '1',
          value: '一级'
        },
        {
          label: '2',
          value: '二级'
        },
        {
          label: '3',
          value: '三级'
        },
        {
          label: '4',
          value: '四级'
        },
        {
          label: '5',
          value: '五级'
        }
      ]
    }
  },
  methods: {
    /**
     * 批量删除日志
     */
    deleteLogs () {
      const logList = this.multipleSelection
      const idList = []
      if (logList.length !== 0) {
        for (const index in logList) {
          idList.push(logList[index].id)
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
     * 搜索日志
     */
    searchLog () {
      this.$message.success('搜索日志API')
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
