<template>
  <div>
    <el-row :gutter="20">
      <el-col :md="9" :sm="24" :xs="24" style="margin-bottom: 10px">
        <el-card>
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div style="text-align: center">
            <el-link @click="dialogChangePortrait = true">
              <img :src="userInfo.avatar" style="height:100px;border-radius:10px">
            </el-link>
          </div>
          <div style="font-size: 15px">
            <el-divider class="costHr"></el-divider>
            <el-row>
              <el-col span="12"><i class="el-icon-user"></i>用户账号</el-col>
              <el-col span="12">{{userInfo.username}}</el-col>
            </el-row>
            <el-divider class="costHr"></el-divider>
            <el-row>
              <el-col span="12"><i class="el-icon-mobile-phone"></i>手机号码</el-col>
              <el-col span="12">{{userInfo.phone | formatNull()}}</el-col>
            </el-row>
            <el-divider class="costHr"></el-divider>
            <el-row>
              <el-col span="12"><i class="el-icon-message"></i>用户邮箱</el-col>
              <el-col span="12">{{userInfo.email | formatNull()}}</el-col>
            </el-row>
            <el-divider class="costHr"></el-divider>
            <el-row>
              <el-col span="12"><i class="el-icon-office-building"></i>所属部门</el-col>
              <el-col span="12">{{userInfo.department | formatNull()}}</el-col>
            </el-row>
            <el-divider class="costHr"></el-divider>
            <el-row>
              <el-col span="12"><i class="el-icon-finished"></i>所属角色</el-col>
              <el-col span="12">{{userInfo.role}}</el-col>
            </el-row>
            <el-divider class="costHr"></el-divider>
            <el-row>
              <el-col span="12"><i class="el-icon-date"></i>创建日期</el-col>
              <el-col span="12">{{userInfo.createDate | formatDate()}}</el-col>
            </el-row>
            <el-divider class="costHr"></el-divider>
          </div>
        </el-card>
      </el-col>
      <el-col :md="15" :sm="24" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本资料</span>
          </div>
          <el-tabs v-model="activeName">
            <el-tab-pane label="基本资料" name="first">
              <el-form label-position="right" label-width="80px" :model="info" :rules="rulesInfo" ref="rulesInfo">
                <el-form-item label="用户昵称" prop="nickname" required>
                  <el-input v-model="info.nickname" autocomplete="off" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                  <el-input type="number" v-model="info.phone" autocomplete="off" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="用户邮箱" prop="email">
                  <el-input type="email" v-model="info.email" autocomplete="off" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary"  @click="saveInfo('rulesInfo')" style="margin-right: 10px;">保存</el-button>
                  <router-link to="/system">
                    <el-button type="danger" >关闭</el-button>
                  </router-link>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="密码修改" name="second">
              <el-form label-position="right" label-width="80px" :model="passwordForm" :rules="rulesPassword" ref="rulesPassword">
                <el-form-item label="旧密码" prop="oldPassword" required>
                  <el-input type="password" v-model="passwordForm.oldPassword" autocomplete="off" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword" required>
                  <el-input type="password" v-model="passwordForm.newPassword" autocomplete="off" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword" required>
                  <el-input type="password" v-model="passwordForm.confirmPassword" autocomplete="off" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary"  @click="savePassword('rulesPassword')" style="margin-right: 10px;">保存</el-button>
                  <router-link to="/system">
                    <el-button type="danger" >关闭</el-button>
                  </router-link>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="修改头像" :visible.sync="dialogChangePortrait" width="dialogWidth" style="transition: all .5s">
      <el-row>
        <el-col :xs="24" :md="12" :style="{height: '350px'}">
          <el-row style="margin-bottom:10px">
            <VueCropper style="height:300px"
              :img="option.img"
              ref="cropper"
              :autoCrop="true"
              :outputSize="option.size"
              :autoCropWidth="200"
              :autoCropHeight="200"
              :fixedBox="true"
              @realTime="realTime"></VueCropper>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-upload action="#"
              :http-request="requestUpload"
              :show-file-list="false"
              :before-upload="beforeUpload">
                <el-button icon="el-icon-upload2">选择</el-button>
              </el-upload>
            </el-col>
            <el-button icon="el-icon-refresh" @click="refreshCrop">复位</el-button>
            <el-button type="primary" icon="el-icon-upload" @click="uploadImg">提交</el-button>
          </el-row>
        </el-col>
        <el-col :xs="24" :md="12" :style="{height: '350px'}">
          <div style="padding-left: 60px"><span style="font-size: 16px; font-wight: 10">预览图</span></div>
          <div class="sssssssssssssss">
            <div  class="show-preview" :style="{'width': '200px', 'height': '200px',  'overflow': 'hidden', 'margin': '5px', 'border-radius': '20px','box-shadow': 'darkgrey 10px 10px 30px 1px'}">
              <div :style="option.data.div">
                <img :src="option.data.url" :style="option.data.img">
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getData, updateInfo, updatePassword, updateAvatar } from '@/api/system/user/info'
import { VueCropper } from 'vue-cropper'
export default {
  name: 'Info',
  components: { VueCropper },
  data () {
    const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户昵称'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length !== 11) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    const validateNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value.length < 6) {
        callback(new Error('至少输入6位新密码'))
      } else {
        callback()
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      option: {
        img: '',
        size: '',
        data: {}
      },
      userInfo: {
        id: 0,
        portrait: '',
        username: '',
        avatar: '',
        phone: '',
        email: '',
        department: '',
        role: '',
        createDate: ''
      },
      info: {
        nickname: '',
        phone: '',
        email: ''
      },
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      labelPosition: 'right',
      activeName: 'first',
      rulesInfo: {
        nickname: [
          { validator: validateName, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      rulesPassword: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { validator: validateNewPassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      },
      dialogChangePortrait: false,
      dialogWidth: '800px'
    }
  },
  filters: {
    formatDate (time) {
      var data = new Date(time)
      var y = data.getFullYear()
      var M = data.getMonth() + 1
      var d = data.getDate()

      var h = data.getHours()
      var m = data.getMinutes()
      return y + '-' + M + '-' + d + ' ' + h + ':' + m
    },
    formatNull (param) {
      if (param === null || param === '') {
        return '暂无'
      } else {
        return param
      }
    }
  },
  created () {
    // 初始修改头像对话框宽度数据
    this.setDialogWidth()
  },
  mounted () {
    // 获取页面基础数据
    this.getTableData()
    // 对话框宽度自适应
    window.onresize = () => {
      return (() => {
        this.setDialogWidth()
      })()
    }
  },
  methods: {
    requestUpload () {
    },
    setDialogWidth () {
      // 头像修改对话框宽度自适应
      var val = document.body.clientWidth
      if (val < '800') {
        this.dialogWidth = '400px'
      } else {
        this.dialogWidth = '800px'
      }
    },
    // 上传预处理
    beforeUpload (file) {
      if (file.type.indexOf('image/') === -1) {
        this.$message.error('文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。')
      } else {
        // 读取文件，以数据的形式进行处理
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.option.img = reader.result
        }
      }
    },
    // 实时预览
    realTime (data) {
      this.option.data = data
    },
    // 图片复位
    refreshCrop () {
      this.$refs.cropper.refresh()
    },
    // 图片上传
    uploadImg () {
      this.$refs.cropper.getCropData(data => {
        var params = {
          id: this.userInfo.id,
          base64: data.replace('data:image/jpeg;base64,', '')
        }
        updateAvatar(params).then((result) => {
          if (result.status === 200) {
            this.$message.success(result.msg)
          }
        })
      })
    },
    // 页面初始化基础数据
    getTableData () {
      const res = new Promise((resolve, reject) => {
        getData().then((result) => { resolve(result) })
      })
      res.then((result) => {
        this.userInfo.id = result.data.user.id
        this.userInfo.username = result.data.user.username
        this.info.nickname = result.data.user.nickname
        this.userInfo.phone = result.data.user.phone
        this.info.phone = result.data.user.phone
        this.userInfo.email = result.data.user.email
        this.info.email = result.data.user.email
        this.userInfo.phone = result.data.user.phone
        this.userInfo.department = result.data.departmentTitle
        this.userInfo.role = result.data.roleTitle
        this.userInfo.createDate = result.data.user.createDate
        this.userInfo.avatar = '/api' + result.data.user.avatar
      })
    },
    /**
     * 保存基本资料
     */
    saveInfo (rules) {
      this.$refs[rules].validate((valid) => {
        if (valid) {
          const res = new Promise((resolve, reject) => {
            this.info.id = this.userInfo.id
            updateInfo(this.info).then((result) => { resolve(result) })
          })
          res.then((result) => {
            if (result.status === 200) {
              this.$message.success(result.msg)
              this.getTableData()
            }
          })
        } else {
          return false
        }
      })
    },
    /**
     * 保存修改的密码
     */
    savePassword (rules) {
      this.$refs[rules].validate((valid) => {
        if (valid) {
          const res = new Promise((resolve, reject) => {
            this.passwordForm.id = this.userInfo.id
            updatePassword(this.passwordForm).then((result) => { resolve(result) })
          })
          res.then((result) => {
            if (result.status === 200) {
              sessionStorage.removeItem('token')
              localStorage.removeItem('token')
              this.$message.success(result.msg)
              this.$router.replace('/login')
            }
          })
        } else {
          this.$message.info('某规则不符合要求，请重新修改')
          return false
        }
      })
    },
    // 图片预处理
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
  /* 配置信息的上下宽度 */
  .costHr {
    margin: 5px 0;
  }
  /* 修改头像对话框预览图的位置及高度样式 */
  .sssssssssssssss {
    margin: 40px;
    height: 300px;
  }
</style>
