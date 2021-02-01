<template>
  <div class="block" style="margin: 20px 0">
    <el-pagination
      layout="prev, pager, next"
      :hide-on-single-page="1"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['total']
}
</script>

<style scoped>

</style>
