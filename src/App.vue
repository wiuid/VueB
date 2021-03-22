<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
<script>
export default {
  name: 'app',
  mounted () {
    // 关闭浏览器删除localStorage中的token
    // 该方法在刷新时也会触发，所以需要刷新之后，通过下面的方法将sessionStorage中的token同步至localStorage中
    window.onbeforeunload = function (e) {
      localStorage.removeItem('token')
    }
    // 判断session 是否存有token   面对刷新当前页面的情况
    const sessionToken = sessionStorage.getItem('token')
    const localToken = localStorage.getItem('token')

    if (sessionToken === null && localToken === null) {
      const pathName = window.location.pathname
      if (pathName !== '/' && pathName !== '/login') {
        console.log('----------------------------------')
        console.log('跳转提示')
        console.log('----------------------------------')
        // this.$router.replace('/login')
      }
    } else if (localStorage === null) {
      localStorage.setItem('token', sessionToken)
    } else {
      sessionStorage.setItem('token', sessionToken)
    }
  },
  activated () {
  }
}
</script>
