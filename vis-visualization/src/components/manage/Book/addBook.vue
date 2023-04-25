
<template>
<div class="box">
  <div class="addBox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="书名" prop="bookName">
            <el-input v-model="ruleForm.bookName" placeholder="请输入书籍名字"></el-input>
        </el-form-item>
        <el-form-item label="作者id" prop="authorId">
            <el-input v-model="ruleForm.authorId" placeholder="需输入一串数字"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="bookIntro" >
            <el-input v-model="ruleForm.bookIntro" placeholder="书籍简介"></el-input>
        </el-form-item>
        <el-form-item label="书号" prop="book_isbn" >
            <el-input v-model="ruleForm.book_isbn" placeholder="需输入一串数字"></el-input>
        </el-form-item>
        <el-form-item label="推荐年级"  prop="bisRecom" >
            <el-input v-model="ruleForm.isRecom" placeholder="(1,2或3,4或5,6)"></el-input>
        </el-form-item>
        <el-form-item label="类型id"  prop="typeId">
            <el-input v-model="ruleForm.typeId" placeholder="需输入一串数字"></el-input>
        </el-form-item>
        <el-form-item class="sure">
          <el-button type="primary" @click="addBook">确认</el-button>
        </el-form-item>
      </el-form>
  </div>
</div>
</template>
<script>
export default {
  name: 'addBook',
  data () {
    return {
      ruleForm: {
        bookName: '',
        authorId: '',
        bookIntro: '',
        book_isbn: '',
        isRecom: '',
        typeId: ''
      }
    }
  },
  methods: {
    addBook () {
      this.$http.post('book/addBook', this.ruleForm).then(resp => {
        console.log('book')
        console.log(resp)
        if (resp) {
          console.log(resp)
        }
        this.$message.success('添加书籍成功')
        this.ruleForm.bookName = null
        this.ruleForm.authorId = null
        this.ruleForm.book_isbn = null
        this.ruleForm.bookIntro = null
        this.ruleForm.isRecom = null
        this.ruleForm.typeId = null
      })
    }
  }
}
</script>
<style scoped>
.addBox {
    margin-top: 10px;
    height: 450px;
    width: 400px;
    left: 50%;
}
.sure {
    position: absolute;
    left: 200px
}
</style>
