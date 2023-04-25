<!---登录页面---->
<template>
  <div class="signin_container" id="signin" :style="backgroundImage">
    <div class="signin_box">
       <div class="avatar_box">
        <img src="@/assets/image/reading.jpg" />
      </div>
      <el-form ref="signinForm" :model="user" label-width="100px" :rules="formRules" class="signin_form">
          <el-form-item label="账户：" prop="userName">
              <el-input v-model="user.userName" size="small"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="userGender">
              <el-radio-group v-model="user.userGender">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄：" prop="userAge">
              <el-input v-model="user.userAge" size="small"></el-input>
          </el-form-item>
          <el-form-item label="年级：" prop="userGrade">
              <el-input v-model="user.userGrade" size="small"></el-input>
          </el-form-item>
          <el-form-item label="输入密码：" prop="userPassword">
              <el-input v-model="user.userPassword"  type="password" size="small"></el-input>
          </el-form-item>
          <el-form-item label="再次确认：" prop="chechkPass">
              <el-input v-model="user.chechkPass"  type="password" size="small"></el-input>
          </el-form-item>
          <el-form-item class="btns">
              <el-button type="primary" @click="register()">注册</el-button>
              <el-button @click="reset()">重置</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    let isDuplicate = (rule, value, callback) => {
      this.$http.get('users/isDuplicate', {
        params: {
          userName: value
        }
      }).then(function (res) {
        if (res.data === false) {
          callback(new Error('用户名重复'))
        }
        callback()
      }).catch(function (e) {
        callback(new Error('用户名重复'))
      })
    }

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.user.chechkPass !== '') {
          this.$refs.signinForm.validateField('chechkPass')
        }
        callback()
      }
    }
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.userPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    var checkAge = (rule, value, callback) => {
      const regAge = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/
      if (!value) {
        callback(new Error('年龄不能为空'))
      } else if (!regAge.test(value)) {
        callback(new Error('年龄不合法'))
      } else {
        callback()
      }
    }

    let checkGrade = (rule, value, callback) => {
      if (!value) {
        callback(new Error('年级不能为空'))
      }
      // eslint-disable-next-line quotes
      if (!Number.isInteger(parseInt(value))) {
        callback(new Error('请输入数字值'))
      } else {
        if (parseInt(value) < 0 || parseInt(value) > 12) {
          callback(new Error('请输入正确的年级'))
        } else {
          callback()
        }
      }
    }

    return {
      user: {
        userName: 'wy',
        userGender: '男',
        userAge: '18',
        userPassword: '123456',
        chechkPass: '123456',
        userRealName: 'wyf',
        userGrade: '6'
      },
      formRules: {
        userName: [
          { required: true, message: '请输入账户名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' },
          { validator: isDuplicate, trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        chechkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
          { validator: validateCheckPass, trigger: 'blur' }
        ],
        userAge: [
          { required: true, trigger: 'blur' },
          { validator: checkAge, trigger: 'blur' }
        ],
        userGrade: [
          { required: true, trigger: 'blur' },
          { validator: checkGrade, trigger: 'blur' }
        ]
      },
      backgroundImage: {
        backgroundImage: 'url(' + require('@/assets/image/reading.jpg') + ')',
        backgroundSize: '100% 100%'
      }
    }
  },
  methods: {
    register () {
      this.$refs.signinForm.validate(async valid => {
        if (!valid) return
        this.user.userAge = parseInt(this.user.userAge)
        let submitUser = JSON.parse(JSON.stringify(this.user))
        delete submitUser.chechkPass
        console.log(submitUser)
        const {data: user} = await this.$http.post('users/signin', submitUser)
        console.log(user)
        /** 跳转到登录界面并讲注册的用户信息传递到登录界面 */
        this.$router.push({
          path: '/index/login',
          query: submitUser
        })
      })
    },
    reset () {
      this.$refs.signinForm.resetFields()
    }
  }
}
</script>
<style scoped>
.signin_container {
  /* background-color: #2b4b6b; */
  height: 100%;
}
.signin_box {
  height: 550px;
  width: 450px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.signin_box>.avatar_box {
    border: 1px solid #eee;
    border-radius: 50%;
    width: 130px;
    height: 130px;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }

.signin_box>.avatar_box>img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
      background-color: #eee;
}

.btns {
  position: relative;
  width: 100%;
  left: calc(50% - 160px);
}
.signin_form {
  position: absolute;
  bottom: 0;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
}
.toSignIn {
  position: relative;
  width: 140px;
  top: -10px;
  left: calc(50% - 70px);
}
.el-link:after {
  width: 0px;
}
</style>
