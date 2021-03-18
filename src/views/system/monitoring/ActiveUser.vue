<template>
  <div>
    my name's activeUser
    {{mes}}
    <el-button @click="getApi">前后段数据交互</el-button>
  </div>
</template>

<script>
export default {
  name: 'ActiveUser',
  data () {
    return {
      mes: 'hhhhh'
    }
  },
  methods: {
    getApi () {
    }
  }
}
</script>

<style scoped>

</style>
