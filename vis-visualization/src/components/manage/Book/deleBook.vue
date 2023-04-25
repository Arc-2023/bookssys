
<template>
    <div>
      <!-- <el-radio-button size="small" style="margin-top: 10px" disabled>批量删除</el-radio-button> -->
        <div class="deleMain">
            <el-table
            border
            stripe
            size="small"
            :data="book"
            @selection-change="handleSelectionChange"
            style="width: 96%">
            <!-- <el-table-column
              type="selection"
              width="55">
            </el-table-column> -->
            <el-table-column
              prop="bookName"
              label="书名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="authorId"
              label="作者"
              width="150">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="bookIntro"
              label="介绍"
              width="900">
            </el-table-column>
            <el-table-column
              label="操作"
              width="80">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  plain
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
        bookName: '',
        authorId: '',
        bookIntro: ''
      },
      book: [],
      dialogVisible: false
    }
  },
  mounted () {
    this.initBook()
  },
  methods: {
    initBook () {
       this.$http.get('book/initBook').then(resp => {
        // console.log('book')
        // console.log(resp)
        if (resp) {
          this.book = resp.data
        }
      })
    },
    handleDelete (index, data) {
      this.$confirm('此操作将永久删除此书籍, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let name = {
          bookName: data.bookName
        }
        this.$http.post('book/deleteBook', name).then(resp => {
          if (resp) {
            console.log(resp)
          }
           this.initBook()
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
       
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
  .updataBookInfo{
    width: 200px;
    margin-left: 8px;
  }
  .el-tooltip__popper {
  max-width: 600px;
}
</style>
