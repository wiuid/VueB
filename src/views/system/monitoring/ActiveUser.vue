<template>
  <div>
    my name's activeUser
    {{mes}}
    <el-button @click="getApi">前后段数据交互</el-button>
  </div>
</template>

<script>
import { getListAPI } from '@/api/auth/index.js'
export default {
  name: 'ActiveUser',
  data () {
    return {
      mes: 'hhhhh'
    }
  },
  methods: {
    getApi () {
      getListAPI().then((result) => {
        console.log(result.data)
      }).catch((err) => {
        console.log(err.data)
      })
    }
  }
}
</script>

<style scoped>

</style>
