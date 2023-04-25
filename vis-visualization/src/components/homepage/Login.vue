<template>
  <div class="login_container" :style="backgroundImage">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="@/assets/image/head.jpg" />
      </div>
      <!-- 表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="loginFormRules" label-width="0px" class="login_form">
        <el-form-item lable="用户名" prop="userName">
          <el-input
          v-model="loginForm.userName"
          prefix-icon="iconfont icon-user"
          placeholder="用户名">
          </el-input>
        </el-form-item>
        <el-form-item lable="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="iconfont icon-3702mima"
            placeholder="密码">
            </el-input>
        </el-form-item>
        <el-form-item prop="identity">
          <el-select v-model="loginForm.identity"  placeholder="请选择身份" style="width:100%">
            <el-option label="用户" value="0"></el-option>
            <el-option label="管理员" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login()">登录</el-button>
          <el-button type="info" @click="resetLoginForm()">重置</el-button>
        </el-form-item>
        <!-- <router-link to="/index/signin" class="toSignIn">
            <el-link>没有账号？ 点击注册</el-link>
        </router-link> -->
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 背景图片
      backgroundImage: {
        backgroundImage: 'url(' + require('@/assets/image/reading.jpg') + ')',
        backgroundSize: '100% 100%'
      },
      // 登录表单数据
      loginForm: {
        userName: '',
        password: '',
        identity: ''
      },
      // 登录表单填写规则
      loginFormRules: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        identity: [
          { required: true, message: '请选择身份', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.loginForm.userName = 'test@test.com'
    this.loginForm.password = '123456'
    this.getParams()
  },
  watch: {
    '$route': 'getParams'
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 接收注册传递过来的参数
    getParams () {
      const user = this.$route.query
      if (JSON.stringify(user) !== '{}') {
        this.loginForm.userName = user.userName
        this.loginForm.password = user.password
      }
    },
    // 登录
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('users/login', this.loginForm)
        if (res === 1) return this.$message.error('无此用户')
        if (res === 5) return this.$message.error('密码错误')
        else if (res === 4) return this.$message.error('身份错误')
        this.$message.success('登录成功')
        // 跳转到主页并将用户名和登录状态传递过去
        if (res === 2) {
          this.loginForm.isManager = false
          this.$router.replace('/index/home')
        }
        if (res === 3) {
          this.loginForm.isManager = true
          //this.$router.replace('/manage/book')
          this.$router.replace('/index/home')
        }
        window.sessionStorage.setItem('user', JSON.stringify(this.loginForm))
      })
    }
  }
}
</script>
<style scoped>
.login_container {
  /* background-color: #2b4b6b; */
  height: 100%;
}
.login_box {
  height: 350px;
  width: 450px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_box>.avatar_box {
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

.login_box>.avatar_box>img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
      background-color: #eee;
}

.btns {
  position: relative;
  width: 100%;
  left: calc(50% - 75px);
}
.login_form {
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
