<!--
 * @Description: 管理端登陆界面
 * @Author: tyq
 * @Date: 2021-02-16 21:29:56
 * @LastEditors: Wuyi
 * @LastEditTime: 2021-05-30 16:46:33
-->
<template>
  <div id="home">
     <topBar :isNotLogIn="isNotLogIn" :isManager="isManager" :userName="userName"></topBar>
      <el-container id="mainContainer">
        <el-aside width="200px" >
          <el-menu @select="menuClick">
            <el-menu-item index="/manage/book">
            <i class="el-icon-files"></i>书籍管理
            </el-menu-item>
            <el-menu-item index="/manage/user">
            <i class="el-icon-s-custom"></i>用户管理
            </el-menu-item>
            <!-- <el-menu-item index="/manage/power"
              ><i class="el-icon-menu"></i>权限管理</el-menu-item
            > -->
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <bottomBar></bottomBar>
  </div>
</template>
<script>
import topBar from '@/components/common/topBar'
import bottomBar from '@/components/common/bottomBar'
export default {
  components: {
    topBar,
    bottomBar
  },
  name: 'Manage',
  data () {
    return {
      isNotLogIn: true,
      userName: '',
      isManager: true
    }
  },
  created () {
    this.getParams()
  },
  watch: {
    '$route.path': 'getParams'
  },
  methods: {
    menuClick (index) {
      this.$router.push(index)
    },
    // 接收用户名和登录状态
    getParams () {
      const res = JSON.parse(window.sessionStorage.getItem('user'))
      if (res === null) return
      this.userName = res.userName
      this.isNotLogIn = false
      this.isManager = res.isManager
    }
  }
}
</script>
<style>
.header .userInfo {
  cursor: pointer;
}
.homeWelcome {
    text-align: center;
    font-size: 30px;
    padding-top: 50px;
}
#home {
    height: 100%;
    width: 100%;
}
#mainContainer {
  position: absolute;
  top: 50px;
  height: calc(100% - 100px);
  width: 100%;
}
</style>
