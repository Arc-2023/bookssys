<template>
  <div>
    <div>
      <el-input size="small" class="searchInput" placeholder="请输入要查询的用户" suffix-icon="el-icon-search"
        @keydown.enter.native="searchUser" v-model="inputname">
      </el-input>
      <el-button size="small" icon="el-icon-search" type="primary" @click="searchUser">查询</el-button>
    </div>
    <div class="searchMain">
      <el-table border stripe size="small" :data="userinfo" style="width: 96%">
        <el-table-column prop="userName" label="用户名" width="150"></el-table-column>
        <el-table-column prop="realName" label="真实姓名" width="150"></el-table-column>
        <el-table-column prop="userGender" label="性别"></el-table-column>
        <el-table-column prop="userAge" label="年龄"></el-table-column>
        <el-table-column prop="userGrade" label="年级"></el-table-column>
        <el-table-column prop="identity" label="身份(用户:0 管理员:1 )"></el-table-column>
        <el-table-column prop="passWord" label="密码"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'searchUser',
  data() {
    return {
      name: "",
      userinfo: [],
      inputname: "",
      pos: {
        name: "",
      },
      users: [],
      dialogVisible: false,
      updatePos: {
        name: "",
      },
      multipleSelection: [],
    };
  },
  mounted() {
    this.initUser();
  },
  methods: {
    initUser() {
      this.$http.get("users/initUser").then((resp) => {
        console.log("users");
        console.log(resp);
        if (resp) {
          this.users = resp.data;
        }
      });
    },
    searchUser() {
      this.$http
        .get("users/searchByUserName?userName=" + this.inputname)
        .then((resp) => {
          this.userinfo = resp.data;
          console.log("shuji", resp);
          console.log("数据userinfo", this.userinfo);
          let length = this.userinfo.length
          if (length == 0) {
            this.$message({
              type: 'warning',
              message: '搜索的用户不存在'
            })
          }
        });
    },
    showEditView(index, data) {
      // 数据拷贝
      Object.assign(this.updatePos, data);
      // this.updatePos.createDate = ''  22 9:57
      this.dialogVisible = true;
    },
  },
};
</script>
<style>
.searchInput {
  width: 300px;
  margin-right: 8px;
}

.searchMain {
  margin-top: 20px;
}

.updataUserInfo {
  width: 200px;
  margin-left: 8px;
}
</style>
