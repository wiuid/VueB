<template>
  <div class="bg" :height="fullHeight" :width="fullWidth">
    <div class="img_box">
      <!-- 背景图片：动态绑定宽高 -->
      <!-- <img src="../../assets/img/bg01.png" :width="fullWidth" /> -->
      <img src="@/assets/images/backimg.png" :width="fullWidth" />
      <el-container>
        <el-row style="display: flex;margin: auto;text-align: center">
          <div style="margin-top: 150px;">
            <el-form ref="form" :model="form" :rules="rules">
              <h3>管 理 后 台 登 陆</h3>
              <el-form-item prop="username" require>
                <el-input type="text" clearable v-model="form.username" prefix-icon="el-icon-user-solid" placeholder="账号" style="width: 100%;" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item prop="password" required>
                <el-input type="password" clearable v-model="form.password" show-password prefix-icon="el-icon-s-help" placeholder="密码" style="width: 100%;" autocomplete="off"></el-input>
              </el-form-item>
              <el-button type="primary" style="width: 100%" @click="login(form)">登 录</el-button>
              <br style="margin: 5px"/>
              <br style="margin: 5px"/>
              <el-button type="primary" style="width: 100%" @click="toSystem()">免 登 录 按 钮</el-button>
            </el-form>
          </div>
        </el-row>
      </el-container>
    </div>
  </div>
</template>

<script>

import { login } from '@/api/login'
import router from '@/router'

export default {
  name: 'Login',
  data () {
    return {
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 5, message: '账号最短五位' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码最短六位' }
        ]
      },
      form: {
        username: '',
        password: ''
      },
      // 获取设备宽度、高度
      fullWidth: document.documentElement.clientWidth,
      fullHeight: document.documentElement.clientHeight
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
  methods: {
    login (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          login(this.form).then((result) => {
            if (result.data.status === 200) {
              // 登录成功，token存储到sessionStorage，该存储位置，随着浏览器关闭而自动清除
              sessionStorage.setItem('token', result.data.data.token)
              this.toSystem()
            } else {
              this.$message.error('账号不存在或密码错误，请重新填写')
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    toSystem () {
      router.replace({
        path: '/system',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
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
