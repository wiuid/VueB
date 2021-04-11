<template>
  <div class="bg" :height="fullHeight" :width="fullWidth">
    <div class="img_box">
      <!-- 背景图片：动态绑定宽高 -->
      <img src="@/assets/images/backimg.png" :width="fullWidth" />
      <el-container>
        <el-row style="display: flex;margin: auto;text-align: center">
          <div style="margin-top: 150px;">
            <el-form ref="form" :model="form" :rules="rules">
              <h3>webraAdminA 后 台</h3>
              <el-form-item prop="username" require>
                <el-input type="text"
                clearable v-model="form.username"
                prefix-icon="el-icon-user-solid"
                placeholder="账号"
                style="width: 100%;"
                @keyup.enter.native="login()">
                </el-input>
              </el-form-item>
              <el-form-item prop="password" required>
                <el-input type="password"
                clearable v-model="form.password"
                prefix-icon="el-icon-s-help"
                placeholder="密码"
                style="width: 100%;"
                @keyup.enter.native="login()"></el-input>
              </el-form-item>
              <el-button type="primary" style="width: 100%" @click="login()">登 录</el-button>
            </el-form>
          </div>
        </el-row>
      </el-container>
    </div>
  </div>
</template>

<script>

import { login } from '@/api/login'

export default {
  name: 'Login',
  data () {
    return {
      // 登录规范验证
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 5, message: '账号最短5位' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码最短6位' }
        ]
      },
      // 账号密码表单
      form: {
        username: 'admin',
        password: '123qwe'
      },
      // 获取设备宽度、高度
      fullWidth: document.documentElement.clientWidth,
      fullHeight: document.documentElement.clientHeight
    }
  },
  beforeCreate () {
    // 登录token检测
    if (sessionStorage.getItem('token') !== null) {
      this.$router.replace('/system')
    }
  },
  created () {
    // 添加监听，监听设备宽高
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    // 销毁监听
    window.removeEventListener('resize', this.handleResize)
  },
  mounted () {
  },
  methods: {
    // 登录方法
    login () {
      if (this.form.username.length > 4) {
        if (this.form.password.length > 5) {
          var res = new Promise((resolve, reject) => {
            login(this.form).then(result => { resolve(result) }).catch(err => { reject(err) })
          })
          res.then(result => {
            if (result.status === 200) {
              sessionStorage.setItem('token', result.data.token)
              localStorage.setItem('token', result.data.token)
              localStorage.setItem('dynamicRouter', JSON.stringify(result.data.routes))
              console.log(status.data)
              this.toSystem()
            } else {
              this.$message.error('账号或密码错误，请检查账号密码')
            }
          })
        } else {
          this.$message.info('密码最短6位')
        }
      } else {
        this.$message.info('账号最短5位')
      }
    },
    // 跳转方法
    toSystem () {
      // 该方法将刷新整个页面，路由表将重置，判断localStrage中的dynamicRouter 来对默认路由进行添加
      location.href = '/system'
      // 下面方法不会刷新路由
      // this.$router.push({ path: '/system' })
    }
  }
}
</script>

<style scoped>
.bg{
  padding: 0;
  margin: 0;
}
.bg .img_box{
  width: 100%;height: 100%;
}
.bg .img_box img{
  position: fixed; /* 固定图片位置 */
}
</style>
