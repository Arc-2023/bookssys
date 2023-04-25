<template>
    <div>
        <div class="addMain">
            <el-table border stripe size="small" :data="users.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 96%">
            <el-table-column prop="userName" label="账户名" width="120"></el-table-column>
            <el-table-column prop="realName" label="真实姓名" width="120"></el-table-column>
            <el-table-column prop="userGender" label="性别" width="120"></el-table-column>
            <el-table-column prop="userAge" label="年龄" width="120"></el-table-column>
            <el-table-column prop="userGrade" label="年级" width="120"></el-table-column>
            <el-table-column prop="identity" label="身份类型(管理员:1 用户:0)" width="170"></el-table-column>
            <el-table-column prop="passWord" label="密码" width="150"></el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" plain @click="showEditView(scope.$index, scope.row)">编辑</el-button>
              </template>
            </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <div class="block" style="margin-top:15px;">
              <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5,10,15,20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="users.length">
              </el-pagination>
            </div>
        </div>
        <el-dialog title="编辑账户" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <span>
            <div>
              <el-tag>账户名</el-tag>
            </div>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: 'totalUser',
  data () {
    return {
      pos: {
        userName: '',
        realName: '',
        userGender: '',
        userAge: '',
        userGrade: '',
        identity: '',
        passWord: ''
      },
      users: [],
      currentPage: 1, // 当前页码
      total: '', // 总条数
      pageSize: 15 // 每页的数据条数
    }
  },
  mounted () {
    this.initUser()
  },
  methods: {
    initUser () {
      this.$http.get('users/initUser').then(resp => {
        console.log(this.users)
        console.log(resp)
        if (resp) {
          this.users = resp.data
        }
      })
    },
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.currentPage = 1
      this.pageSize = val
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
    }
    // dialogVisible ( ) {
    // },
    // doUpdate ( ) {
    // }
  }
}
</script>
<style>
  .totalMain{
    margin-top: 20px;
  }
.el-tooltip__popper {
  max-width: 600px;
}
</style>
