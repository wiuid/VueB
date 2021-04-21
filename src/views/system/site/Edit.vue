<template>
  <div>
    <el-form :model="inform" :rules="rules" ref="inform">
      <el-row>
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="inform.title" style="width: 200px"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="inform.state" :active-value="0" :inactive-value="1"></el-switch>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item prop="text">
          <editor
            :api-key="tinymceApi"
            :init="editConfig"
            v-model="inform.text"/>
          <!-- <el-input type="textarea" placeholder="请输入通知内容" v-model="inform.text" show-word-limit rows="6"></el-input> -->
        </el-form-item>
      </el-row>
      <el-row style="float: right">
        <el-button type="warning" @click="closePage">离 开</el-button>
        <el-button type="primary" @click="saveData('inform')">{{saveButton}}</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { saveInform, getInform } from '@/api/system/site/inform'
import Editor from '@tinymce/tinymce-vue'
export default {
  name: 'Edit',
  components: {
    editor: Editor
  },
  data () {
    return {
      tinymceApi: 'aai55p11jqys3z88pngri55kum6x2s92usda7k28o1sxwytn',
      editConfig: {
        height: 300,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright | bullist numlist | removeformat '
      },

      rules: {
        title: [
          { required: true, message: '请输入公告标题', trigger: 'blur' }
        ],
        text: [
          { required: true, message: '请输入公告正文内容', trigger: 'blur' }
        ]
      },

      inform: {
        id: 0,
        title: '',
        state: 0,
        text: ''
      },
      saveButton: '发 布'
    }
  },
  created () {
    const url = window.location.pathname
    const add = url.substring(url.lastIndexOf('/') + 1, url.length)
    if (add !== 'edit' && !isNaN(Number(add))) {
      console.log('yes')
      getInform(Number(add)).then(result => {
        this.inform = result.data.inform
      })
    }
  },
  methods: {
    // 修改/发布方法
    saveData (inform) {
      this.$refs[inform].validate((valid) => {
        if (valid) {
          this.$confirm('是否确认' + this.saveButton + '名称为"' + this.inform.title + '"的公告通知?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const res = new Promise((resolve, reject) => {
              saveInform(this.inform).then((result) => { resolve(result) })
            })
            res.then((result) => {
              if (result.status === 200) {
                this.$message.success(result.msg + ',跳转至公告页')
                setTimeout(() => {
                  this.toInformPage()
                }, 2000)
              }
            })
          })
        } else {
          return false
        }
      })
    },
    // 离开该页面
    closePage () {
      this.$confirm('确认退出公告编辑页?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.toInformPage()
      })
    },
    toInformPage () {
      this.$router.push({ path: '/system/site/inform' })
    }
  }
}
</script>
<style scoped>
</style>
