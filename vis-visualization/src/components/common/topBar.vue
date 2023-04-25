<!--顶栏---->
<template>
  <div id="topBar">
    <span>VisCEB</span>
    <router-link to="/index/home">
      <el-link icon="el-icon-s-home">首页</el-link>
    </router-link>
    <router-link v-if="isNotLogIn" to="/index/login">
      <el-link icon="el-icon-user-solid">登录</el-link>
    </router-link>
    <div v-else>
      <router-link to="/index/login">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <span id="user_name" class="user_name">{{ userName }}</span>
      </router-link>
      <router-link v-if="isManager" to="/manage/book" style="position:relative;top:-14px">
        <el-link icon="el-icon-s-management">管理</el-link>
      </router-link>
      <el-link icon="el-icon-s-tools" style="position:relative;top:-14px" @click="logout()">退出</el-link>
    </div>
    <div class="timer">
      <h3 style="color: aliceblue;"><i class="el-icon-date" style="margin-right: 6px; font-size:large ;"></i>{{ newTime }}</h3>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isNotLogIn: {
      type: Boolean,
      default: true
    },
    userName: {
      type: String,
      default: ''
    },
    isManager: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      newTime:""

    }
  },
  mounted(){
    this.getNowTime();
        clearInterval(myTimeDisplay);
        var myTimeDisplay = setInterval(() => {
            this.getNowTime();
        }, 1000)
  },
  methods: {
   //时间获取
   getNowTime() {
            var date = new Date();
            var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + this.addZero(date.getMinutes()) + ':' + this.addZero(date.getSeconds());
            this.newTime = time;
        },
        addZero(s) {
            return s < 10 ? ('0' + s) : s;
        },
       

    saveAuthor() {
      const author = {
        authorName: 'zy'
      }
      this.$http.post('author/saveAuthor', author)
        .then(res => {
          console.log(res)
        })
    },
    logout() {
      this.$confirm('此操作将注销登陆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        // 清空用户信息
        window.sessionStorage.clear()
        this.$router.replace('/index/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>
<style scoped>
#topBar {
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: black;
}

.timer {
  background-color: rgb(0, 0, 0);
  position: relative;
  left: 50%;
  top:-11%
}
span {
  margin-left: 200px;
  color: white;
  line-height: 20px;
  margin-right: 15px;
  font-size: 24px;
}

.el-link {
  margin-left: 15px;
  margin-right: 15px;
  font-size: 20px;
  color: white;
}

.el-avatar {
  margin-top: 5px;
  margin-left: 15px;
  margin-right: 15px;
  font-size: 20px;
  color: white;
}
.user_name {
  margin-left: -10px;
  position: relative;
  top: -10px;
}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}</style>
