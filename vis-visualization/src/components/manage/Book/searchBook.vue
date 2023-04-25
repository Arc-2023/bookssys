<!--
 * @Description: 查找书籍
 * @Author: tyq
 * @Date: 2021-02-25 21:08:19
 * @LastEditors: Wuyi
 * @LastEditTime: 2021-05-19 10:50:52
-->
<template>
  <div>
    <div>
      <el-input v-model="inputname" size="small" class="searchInput" placeholder="请输入要查询的书籍" suffix-icon="el-icon-search"
        @keydown.enter.native="searchBook">
      </el-input>
      <el-button size="small" icon="el-icon-search" type="primary" @click="searchBook">查询</el-button>
    </div>
    <div class="searchMain">
      <el-table :data="bookinfo" stripe style="width: 100%">
        <el-table-column prop="bookName" label="书名" width="180">
        </el-table-column>
        <el-table-column prop="bookPicture" label="作者" width="180">
        </el-table-column>
        <el-table-column prop="bookEmotion" label="情感词" width="180">
        </el-table-column>
        <el-table-column prop="bookIntro" label="介绍" width="700">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "searchBook",
  data() {
    return {
      name: "",
      bookinfo: [],
      inputname: "",
      pos: {
        name: "",
      },
      book: [],
      dialogVisible: false,
      updatePos: {
        name: "",
      },
      multipleSelection: [],
    };
  },
  mounted() {
    this.initBook();
  },
  methods: {
    initBook() {
      this.$http.get("book/initBook").then((resp) => {
        console.log("book");
        console.log(resp);
        if (resp) {
          this.book = resp.data;
        }
      });
    },
    searchBook() {
      this.$http
        .get("book/searchByBookName?bookName=" + this.inputname)
        .then((resp) => {
          console.log("shuji");
          this.bookinfo = resp.data;
          console.log("数据bookinfo", this.bookinfo);
          if(this.bookinfo.length==4){
            this.$message({
            message: '搜索成功',
            type: 'success'
          });
          }
          this.name = this.bookinfo.bookName;
        })
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

.updataBookInfo {
  width: 200px;
  margin-left: 8px;
}
</style>
