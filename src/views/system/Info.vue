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
              <div class="demo-basic--circle">
                <div class="block"><el-avatar :size="100" :src="circleUrl"></el-avatar></div>
                <div class="block" v-for="size in sizeList" :key="size">
                  <el-avatar :size="size" :src="'../assets/touxiang.gif'"></el-avatar>
                </div>
              </div>
            </el-link>
          </div>
          <div style="font-size: 15px">
            <el-divider class="costHr"></el-divider>
            <el-row>
              <el-col span="12"><i class="el-icon-user"></i>用户账号</el-col>
              <el-col span="12"><span>admin</span></el-col>
            </el-row>
            <el-divider class="costHr"></el-divider>
            <el-row>
              <el-col span="12"><i class="el-icon-mobile-phone"></i>手机号码</el-col>
              <el-col span="12"><span>18231200000</span></el-col>
            </el-row>
            <el-divider class="costHr"></el-divider>
            <el-row>
              <el-col span="12"><i class="el-icon-message"></i>用户邮箱</el-col>
              <el-col span="12"><span>li_zhm@qq.com</span></el-col>
            </el-row>
            <el-divider class="costHr"></el-divider>
            <el-row>
              <el-col span="12"><i class="el-icon-office-building"></i>所属部门</el-col>
              <el-col span="12"><span>Webra科技 / 董事长</span></el-col>
            </el-row>
            <el-divider class="costHr"></el-divider>
            <el-row>
              <el-col span="12"><i class="el-icon-finished"></i>所属角色</el-col>
              <el-col span="12"><span>超级管理员</span></el-col>
            </el-row>
            <el-divider class="costHr"></el-divider>
            <el-row>
              <el-col span="12"><i class="el-icon-date"></i>创建日期</el-col>
              <el-col span="12"><span>2021/2/19</span></el-col>
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
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本资料" name="first">
              <el-form label-position="right" label-width="80px" :model="info" :rules="rulesInfo" ref="rulesInfo">
                <el-form-item label="用户昵称" prop="name" required>
                  <el-input v-model="info.name" autocomplete="off" style="width: 300px;"></el-input>
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

    <el-dialog title="修改头像" :visible.sync="dialogChangePortrait">
      <!-- 这里采用先剪裁在上传的模式，剪裁需要使用组件：vue-cropper -->
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChangePortrait = false">取 消</el-button>
        <el-button type="primary" @click="savePortrait()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Info',
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
      } else if (value.length < 8) {
        callback(new Error('至少输入8位新密码'))
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
      userInfo: {
        portrait: '',
        username: 'admin',
        phone: '18231202665',
        email: 'li_zhm@qq.com',
        department: 'Webra科技 / 董事长',
        auth: '超级管理员',
        date: '2021/2/19'
      },
      info: {
        name: '',
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
        name: [
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
      dialogChangePortrait: false
    }
  },
  methods: {
    /**
     * 保存基本资料
     * @param rules
     */
    saveInfo (rules) {
      this.$refs[rules].validate((valid) => {
        if (valid) {
          this.$message.info('规则正确，正在提交数据')
        } else {
          this.$message.info('某规则不符合要求，请重新修改')
          return false
        }
      })
    },
    /**
     * 保存修改的密码
     * @param rules
     */
    savePassword (rules) {
      this.$refs[rules].validate((valid) => {
        if (valid) {
          this.$message.info('规则正确，正在提交数据')
        } else {
          this.$message.info('某规则不符合要求，请重新修改')
          return false
        }
      })
    },
    /**
     * 清空表单校验规则
     */
    handleClick () {
      this.$refs.rulesInfo.resetFields()
      this.$refs.rulesPassword.resetFields()
    },
    /**
     * 保存头像
     */
    savePortrait () {
      this.$message.info('正在保存头像')
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
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
  .costHr {
    margin: 5px 0;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
