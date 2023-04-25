<!--
 * @Description: 管理员管理用户信息
 * @Author: tyq
 * @Date: 2021-02-21 15:56:47
 * @LastEditors: zy
 * @LastEditTime: 2021-03-12 17:52:44
-->
<template>
    <div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="用户概览" name="totalUser"><totalUser></totalUser></el-tab-pane>
          <el-tab-pane label="添加用户" name="addUser"><addUser></addUser></el-tab-pane>
          <el-tab-pane label="删除用户" name="deleUser"><deleUser></deleUser></el-tab-pane>
          <el-tab-pane label="查询用户" name="searchUser"><searchUser></searchUser></el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import totalUser from './User/totalUser'
import addUser from './User/addUser'
import deleUser from './User/deleUser'
import searchUser from './User/searchUser'

export default {
  name: 'User',
  data () {
    return {
      activeName: 'totalUser'
    }
  },
  components: {
    'totalUser': totalUser,
    'addUser': addUser,
    'deleUser': deleUser,
    'searchUser': searchUser
  }
}
</script>
<style>
</style>
