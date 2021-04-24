<template>
  <div style="height: 80%">
    <iframe class="iframe" src="/api/swagger-ui/index.html"></iframe>
  </div>
</template>

<script>
export default {
  name: 'Swagger',
  methods: {
  }
}
</script>

<style scoped>
.iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
