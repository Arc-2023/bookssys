<template>
    <div>
      <!-- <el-radio-button size="small" style="margin-top: 10px" disabled>批量删除</el-radio-button> -->
        <div class="deleMain">
            <el-table
            border
            strip
            size="small"
            :data="users"
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <!-- <el-table-column
              type="selection"
              width="55">
            </el-table-column> -->
            <el-table-column
              prop="userName"
              label="用户名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="realName"
              label="真实姓名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="userGender"
              label="性别"
              width="150">
            </el-table-column>
            <el-table-column
              prop="userAge"
              label="年龄"
              width="150">
            </el-table-column>
            <el-table-column
              prop="identity"
              label="作者"
              width="150">
            </el-table-column>
            <el-table-column
              prop="userGrade"
              label="年级"
              width="150">
            </el-table-column>
            <el-table-column
              label="操作"
              width="80">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
    </div>
</template>
<script>
export default {
  name: 'deleBook',
  data () {
    return {
      pos: {
        userName: ' ',
        realName: ' ',
        userGender: ' ',
        userAge: ' ',
        userGrade: ' ',
        identity: ' ',
        passWord: ' '
      },
      users: [],
      dialogVisible: false
    }
  },
  mounted () {
    this.initUser()
  },
  methods: {
    initUser () {
      this.$http.get('users/initUser').then(resp => {
          console.log("获取到的数据是",resp)
        if (resp) {
          this.users = resp.data
        }
      })
    },
    handleDelete (index, data) {
      this.$confirm('此操作将永久删除此用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let name = {
          userName: data.userName
        }
        this.$http.post('users/deleteUser', name).then(resp => {
          console.log("delete请求")
          if (resp) {
            console.log(resp)
          }
          this.initUser()
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        //this.initUser()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
        
    }
  }
}
</script>
<style>
  .deleMain{
    margin-top: 20px;
  }
  .updataUserInfo{
    width: 200px;
    margin-left: 8px;
  }
  .el-tooltip__popper {
  max-width: 600px;
}
</style>
