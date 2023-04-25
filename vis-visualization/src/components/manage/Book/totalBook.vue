<!--
 * @Description: 书籍总览
 * @Author: tyq
 * @Date: 2021-02-25 21:07:49
 * @LastEditors: Wuyi
 * @LastEditTime: 2021-05-18 20:17:25
-->
<template>
    <div>
        <div class="addMain">
            <el-table border stripe size="small" :data="book.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 96%">
            <el-table-column prop="bookName" label="书名" width="300"></el-table-column>
            <el-table-column prop="authorId" label="作者" width="150"></el-table-column>
            <el-table-column prop="bookIntro" label="介绍" width="800" show-overflow-tooltip>
              <!-- <template slot-scope="scop">
                <div class="typeEnter">{{scop.row.bookIntro}}</div>
              </template> -->
            </el-table-column>
            <el-table-column label="操作" width="200">
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
              :total="book.length">
              </el-pagination>
            </div>
        </div>
        <el-dialog title="编辑书籍" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <span>
            <div>
              <el-tag>书籍名称</el-tag>
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
  name: 'totalBook',
  data () {
    return {
      pos: {
        bookName: '',
        authorId: '',
        bookIntro: ''
      },
      book: [],
      currentPage: 1, // 当前页码
      total: '', // 总条数
      pageSize: 15 // 每页的数据条数
    }
  },
  mounted () {
    this.initBook()
  },
  methods: {
    initBook () {
      this.$http.get('book/initBook').then(resp => {
        console.log('book')
        console.log(resp)
        if (resp) {
          this.book = resp.data
        }
      })
    },
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.currentPage = 1
      this.pageSize = val
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    }
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
