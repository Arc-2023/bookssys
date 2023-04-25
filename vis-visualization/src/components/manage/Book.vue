<!--
 * @Description: 管理员的书籍管理页面，书籍的增删查改
 * @Author: tyq
 * @Date: 2021-02-21 15:56:47
 * @LastEditors: zy
 * @LastEditTime: 2021-03-07 14:12:51
-->
<template>
    <div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="书籍概览" name="totalBook"><totalBook></totalBook></el-tab-pane>
          <el-tab-pane label="添加书籍" name="addBook"><addBook></addBook></el-tab-pane>
          <el-tab-pane label="删除书籍" name="deleBook"><deleBook></deleBook></el-tab-pane>
          <el-tab-pane label="查询书籍" name="searchBook"><searchBook></searchBook></el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import totalBook from './Book/totalBook'
import addBook from './Book/addBook'
import deleBook from './Book/deleBook'
import searchBook from './Book/searchBook'

export default {
  name: 'Book',
  data () {
    return {
      activeName: 'totalBook'
    }
  },
  components: {
    'totalBook': totalBook,
    'addBook': addBook,
    'deleBook': deleBook,
    'searchBook': searchBook
  }
}
</script>
<style>
</style>
