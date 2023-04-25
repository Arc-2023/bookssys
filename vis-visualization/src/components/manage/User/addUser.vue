<!--
 * @Description: 添加用户信息
 * @Author: tyq
 * @Date: 2021-03-08 16:18:07
 * @LastEditors: zy
 * @LastEditTime: 2021-03-08 16:18:07
-->
<template>
<div class="box">
  <div class="addBox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账户" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
            <el-input v-model="ruleForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="userGender">
            <el-input v-model="ruleForm.userGender"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="userAge">
            <el-input v-model="ruleForm.userAge"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="userGrade">
            <el-input v-model="ruleForm.userGrade"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="identity">
            <el-input v-model="ruleForm.identity"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
            <el-input v-model="ruleForm.passWord"></el-input>
        </el-form-item>
        <el-form-item class="sure">
          <el-button type="primary" @click="addUser">确认创建</el-button>
        </el-form-item>
      </el-form>
  </div>
</div>
</template>
<script>
export default {
  name: 'addUser',
  data () {
    return {
      ruleForm: {
        userName: 'z',
        realName: 'zz',
        userGender: '男',
        userAge: '12',
        userGrade: '2',
        identity: '1',
        passWord: '123456'
      },
      rules: {
      }
    }
  },
  methods: {
    test(){
     console.log("调用成功")
    },
    addUser () {
      this.$http.post('users/addUser', this.ruleForm).then(resp => {
        if (resp) {
          console.log(resp)
        }
        this.$message.success('添加用户成功')
      }).finaly(
        console.log("使用"),
       
      )
      
    }
  }
}
</script>
<style scoped>
.addBox {
    margin-top: 10px;
    height: 600px;
    width: 400px;
    left: 50%;
}
.sure {
    position: absolute;
    left: 200px
}
</style>
