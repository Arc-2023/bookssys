<!--
 * @Author: Wuyi
 * @Date: 2021-05-30 16:43:54
 * @LastEditTime: 2021-05-30 16:48:37
 * @LastEditors: Wuyi
 * @Description: 个性化推荐主页
-->
<template>
    <div id="home">
      <topBar :isNotLogIn="isNotLogIn" :isManager="isManager" :userName="userName"></topBar>
      <div id="mainContainer">
          <router-view></router-view>
      </div>
      <bottomBar></bottomBar>
    </div>
</template>
<script>
import topBar from '@/components/common/topBar'
import bottomBar from '@/components/common/bottomBar'
export default {
  data () {
    return {
      isNotLogIn: true,
      userName: '',
      isManager: false
    }
  },
  created () {
    this.getParams()
  },
  watch: {
    '$route.path': 'getParams'
  },
  methods: {
    // 接收用户名和登录状态
    getParams () {
      const res = JSON.parse(window.sessionStorage.getItem('user'))
      if (res === null) return
      this.userName = res.userName
      this.isNotLogIn = false
      this.isManager = res.isManager
    }
  },
  components: {
    topBar,
    bottomBar
  }
}
</script>
<style scoped>
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
