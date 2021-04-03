<template>
  <div class="block" style="margin: 20px 0">
    <el-pagination
      @current-change="handleSizeChange"
      layout="prev, pager, next"
      :hide-on-single-page="true"
      :total="total"
      :current-page="pager">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['total', 'pager', 'current'],
  methods: {
    handleSizeChange (val) {
      this.current(val)
    }
  }
}
</script>

<style scoped>

</style>
