<template>
  <div style="margin-top: 50px">
    <span>
      {{footerCopyright}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'NavigationBarFooter',
  data () {
    return {
      footerCopyright: ''
    }
  },
  mounted () {
    var data = new Date()
    this.footerCopyright = '2021-' +  data.getFullYear() + ' webra.top'
  }
}
</script>

<style scoped>

</style>
