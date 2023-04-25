<template>
  <div id="BookOverview">
    <el-row style="height: 100%; width: 100%">
      <el-col :span="3">
        <div id="params">
          <el-input id="searchInput" placeholder="请输入要查询的书籍" @keydown.enter.native="searchBook" v-model="inputname"
            class="input"></el-input>
          <el-button icon="el-icon-search" type="primary" @click="searchBook" class="searchButton">查询</el-button>
        </div>
        <div id="grade">
          <div id="grade-12" class="stage"></div>
          <div id="grade-34" class="stage"></div>
          <div id="grade-56" class="stage"></div>
        </div>
      </el-col>
      <el-col :span="21">
        <div id="readingPath"></div>
        <el-row id="assets">
          <el-col :span="10" id="cluster"></el-col>
          <el-col :span="8" id="related"></el-col>
          <el-col :span="6">
            <div id='bookMassage'>
              <el-table :data="bookinfo" height="100%" style="width: 100%">
                <el-table-column prop="bookIntro" label="图书简介"></el-table-column>
              </el-table>
            </div>
            <div id="comparison">
              <el-table :data="bookinfo" height="40%" style="width: 100%">
                <el-table-column prop="bookName" label="图书名"></el-table-column>
                <el-table-column prop="bookPicture" label="作者姓名"></el-table-column>

                <!-- <el-table-column prop="typeId" label="出版社名"></el-table-column>  -->
              </el-table>

              <el-table :data="bookinfo" height="40%" style="width: 100%">
                <el-table-column prop="bookEmotion" label="情感"></el-table-column>
                <el-table-column prop="isRecom" label="推荐年级"></el-table-column>
                <!-- <el-table-column prop="typeId" label="出版社名"></el-table-column>  -->
              </el-table>

              <el-button type="primary" @click="getReadPathData()">保存成长路径</el-button>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>请选择删除、添加节点</span>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="modifyNode()">修 改</el-button> -->
        <el-button type="primary" @click="deletNode()">删 除</el-button>
        <el-button type="primary" @click="addNode()">添 加</el-button>
      </span>
      <div style="margin-top: 10px;">
      <el-form  label-width="80px" style="width: 300px;">
        <el-form-item label="图书名字">
          <el-input placeholder="请输入要添加书籍的名字" v-model="inputbookname" ></el-input>
        </el-form-item>
      </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as d3 from 'd3'
import { Grade } from '@/assets/js/BookOverview/grade.js'
import { Related } from '@/assets/js/BookOverview/related.js'
import { Cluster } from '@/assets/js/BookOverview/cluster.js'
// import {Comparsion} from '@/assets/js/BookOverview/comparison.js'
import { ReadPath } from '@/assets/js/BookOverview/readingPath.js'
import { ComFunction } from '@/assets/js/BookOverview/commonFun.js'
export default {
  name: 'searchBook',
  data() {
    return {
      inputname: "",
      inputbookname: "",
      bookinfo: [],
      // input: {
      //   bookName: '',
      //   authorName: '',
      //   pressName: '',
      //   emotion: ''
      // },
      BookMassage: [{
        bookIntro: ''
      }],
      NewBookMassage: [{
        bookIntro: ''
      }],
      NewBookMassage2: [{

      }],
      data: {},
      chart: {},
      dialogVisible: false,
      dialogComfirm: false,
      dialogDelect: false,
      index: '',
      modifyBooks: {},
      deletbooks: {},
      deletGrade: ''
    }
  },
  created() {
    // this.getEmbeddings()
  },
  mounted() {
    const grades = ['12', '34', '56']
    this.chart.gradeCharts = []
    for (let i = 0; i < 3; ++i) {
      this.renderGrades(grades[i])
    }
    this.renderCluster()
    this.renderRelated()
    //this.getMassage()
    //this.getNewMassage()
    this.renderReadingPath(6)
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },

    async renderGrades(grade) {
      this.data.GradeData = []
      let { data: res } = await this.$http.get('/book/findByGrade', {
        params: {
          grade: grade
        }
      })
      res = res.slice(10, 18)
      let chart = new Grade('grade-' + grade)
      this.chart.gradeCharts.push(chart)
      chart.setData(res)
      chart.render(this)
    },

    setCategory() {
      this.category = []
      let cateNum = Math.random() * 5 + 2
      for (let i = 0; i < cateNum; ++i) {
        this.category.push('cate-' + (i + 1))
      }
    },

    async renderCluster() {
      this.category = []
      let { data: res } = await this.$http.get('/embeddings/getAll')
      this.data.ClusterData = []
      res.forEach(d => {
        this.data.ClusterData.push({
          'x': d.embeddingX,
          'y': d.embeddingY,
          'category': d.category,
          'book_isbn': d.book_isbn
        })
        if (this.category.indexOf(d.category) === -1) {
          this.category.push(d.category)
        }
      })
      let chart = new Cluster('cluster')
      this.chart.ClusterChart = chart
      chart.data = this.data.ClusterData
      chart.category = this.category
      chart.render(this)
    },

    async renderRelated() {
      let { data: book } = await this.$http.get('/book/searchByBookName', {
        params: {
          bookName: '七色花'
        }
      })
      let comFun = new ComFunction()
      let related = new Related('related')
      let data = comFun.relatedData(book)
      related.setData(data[0])
      related.draw(this)
    },

    async renderReadingPath(index) {
      let data = await d3.json('./static/data/ReadPath.json')
      let thisUserName = document.getElementById('user_name').innerHTML
      var chart = ''
      if (this.chart.readingPathChart === undefined) {
        chart = new ReadPath('readingPath')
        this.chart.readingPathChart = chart
      } else {
        chart = this.chart.readingPathChart
      }
      chart.setData(data)
      let { data: existsUser } = await this.$http.get('/userbook/findByUserName', {
        params: {
          username: thisUserName
        }
      })
      console.log(existsUser)
      if (existsUser) {
        this.getUserReadPathData(chart, thisUserName)
      } else {
        this.getNewReadPathData(chart, index)
      }
    },
    async getEmbeddings() {
      let { data: res } = await this.$http.get('/embeddings/getAll')
      console.log(res)
    },
    searchBook() {
      this.$http.get("book/searchByBookName?bookName=" + this.inputname)
        .then((resp) => {
          this.bookinfo = resp.data;
          console.log("数据bookinfo", this.bookinfo);
          console.log("书名", this.bookinfo.bookName);
        })
      // let {data: books} = await this.$http.get('/book/searchByBookName', {
      //   params: {
      //     bookName: document.getElementById('searchInput').value
      //   }
      // })
      // books[1] = books[1].slice(0, 10)
      // books[2] = books[2].slice(0, 10)
      // books[3] = books[3].slice(0, 10)
      let comFun = new ComFunction()
      let related = new Related('related')
      let data = comFun.relatedData(books)
      related.setData(data[0])
      related.draw()
      this.getMassage(books[0].bookName)
    },
    // async getMassage(bookName = '假面饭店') {
    //   let { data: books } = await this.$http.get('/book/searchByBookName', {
    //     params: {
    //       bookName: bookName
    //     }
    //   })
    //   this.BookMassage = books.slice(0, 1)
    // },
    // async getNewMassage(bookName = '假面饭店') {
    //   let { data: books } = await this.$http.get('/book/searchByBookName', {
    //     params: {
    //       bookName: bookName
    //     }
    //   })
    //   console.log(books)
    //   this.NewBookMassage = books.slice(0, 1)
    //   this.NewBookMassage2 = books.slice(0, 1)
    // },
    async getMassage(bookName = this.inputbookname) {
      // this.$http.get("book/searchByBookName?bookName=" + this.inputbookname)
      //   .then((resp) => {
      //     //this.bookinfo = resp.data;
      //     console.log("resp", resp);
      //     console.log("resp.data", resp.data);
      //   })
      console.log('bookName',bookName);
      let { data: books } = await this.$http.get('/book/searchByBookName', {
        params: {
          bookName: bookName
        }
      })
      console.log('123456', books);
      this.BookMassage = books.slice(0, 1)
      console.log('this.BookMassage',this.BookMassage);
    },
    async getNewMassage(bookName = this.inputbookname) {
      let { data: books } = await this.$http.get('/book/searchByBookName', {
        params: {
          bookName: bookName
        }
      })
      console.log(books)
      this.NewBookMassage = books.slice(0, 1)
      this.NewBookMassage2 = books.slice(0, 1)
    },
    deletNode() {
      this.deletbooks.splice(this.index, 1)
      this.changeNode()
    },
    async modifyNode() {
      let { data: book } = await this.$http.get('/book/searchBookByIsbn', {
        params: {
          isbn: this.NewBookMassage2[0].book_isbn
        }
      })
      this.deletbooks.splice(this.index, 1, book)
      this.changeNode()
    },
    async addNode() {
      console.log('this.inputbookname',this.inputbookname)
      //console.log('book',book);
      let {data : newbook}=await this.$http.get('/book/searchByBookName', {
          params:{
            bookName:this.inputbookname
          }
      })
      console.log('newbook',newbook);
      // let { data: book } = await this.$http.get('/book/searchBookByIsbn', {
      //   params: {
      //     isbn: this.NewBookMassage2[0].book_isbn
      //   }
      // })
      this.deletbooks.push(newbook[0])
      console.log('this.deletbooks',this.deletbooks);
      this.changeNode()
    },
    changeNode() {
      this.dialogVisible = false
      this.dialogDelect = true
      var chart = ''
      if (this.chart.readingPathChart === undefined) {
        chart = new ReadPath('readingPath')
        this.chart.readingPathChart = chart
      } else {
        chart = this.chart.readingPathChart
      }

      chart.render(this.deletbooks, this.deletGrade, this)
    },
    async getReadPathData() {
      let thisUserName = document.getElementById('user_name').innerHTML
      let readPathData12 = d3.select('#grade12').selectAll('.book').data()
      let readPathData34 = d3.select('#grade34').selectAll('.book').data()
      let readPathData56 = d3.select('#grade56').selectAll('.book').data()
      let readPathData = readPathData12.concat(readPathData34).concat(readPathData56)
      let bookData = []
      for (let i = 0; i < readPathData.length; i++) {
        let stepData = []
        stepData = {
          'userName': thisUserName,
          'book_isbn': readPathData[i].book_isbn,
          'bookName': readPathData[i].bookName,
          'bookEmotion': readPathData[i].bookEmotion,
          'isRecom': readPathData[i].isRecom
        }
        bookData.push(stepData)
      }
      console.log(bookData)
      await this.$http.post('/userbook/saveUserBooks', bookData).then(resp => {
        this.$message.success('成长路径保存成功')
      })
    },
    async getNewReadPathData(chart, index) {
      let { data: books12 } = await this.$http.get('/book/findByGrade', {
        params: {
          grade: '12'
        }
      })
      let { data: books34 } = await this.$http.get('/book/findByGrade', {
        params: {
          grade: '34'
        }
      })
      let { data: books56 } = await this.$http.get('/book/findByGrade', {
        params: {
          grade: '56'
        }
      })
      books12 = books12.slice(0, index)
      chart.render(books12, 'grade12', this)
      books34 = books34.slice(0, index)
      chart.render(books34, 'grade34', this)
      books56 = books56.slice(0, index)
      chart.render(books56, 'grade56', this)
    },
    async getUserReadPathData(chart, username) {
      let { data: books12 } = await this.$http.get('/userbook/findByGrade', {
        params: {
          grade: '12',
          username: username
        }
      })
      let { data: books34 } = await this.$http.get('/userbook/findByGrade', {
        params: {
          grade: '34',
          username: username
        }
      })
      let { data: books56 } = await this.$http.get('/userbook/findByGrade', {
        params: {
          grade: '56',
          username: username
        }
      })
      chart.render(books12, 'grade12', this)
      chart.render(books34, 'grade34', this)
      chart.render(books56, 'grade56', this)
    }
  }
}
</script>
<style scoped>
#BookOverview {
  height: 100%;
  width: 100%;
}

.el-col {
  height: 100%;
}

#params {
  width: 100%;
  height: 15%;
  border: 1px solid black;
  border-top: 0px;
}

#grade {
  width: 100%;
  height: 85%;
  border: 1px solid black;
  border-top: 0px;
}

.stage {
  width: 100%;
  height: 33%;
}

.input {
  width: 90%;
  padding: 5px;
}

.searchButton {
  display: block;
  margin: 0 auto;
}

#readingPath {
  width: 100%;
  height: 30%;
  border: 1px solid black;
  border-left: 0px;
  border-top: 0px;
}

#assets {
  width: 100%;
  height: 70%;
  border: 1px solid black;
  border-left: 0px;
  border-top: 0px;
}

#cluster {
  float: left;
  height: 100%;
  border: 1px solid black;
  border-top: 0px;
  border-left: 0px;
}

#related {
  float: left;
  height: 100%;
  border: 1px solid black;
  border-top: 0px;
  border-left: 0px;
}

#comparison {
  float: left;
  height: 60%;
  width: 100%;
  text-align: center;
  border: 1px solid black;
  border-top: 0px;
  border-left: 0px;
}

#bookMassage {
  float: left;
  height: 40%;
  width: 100%;
  border: 1px solid black;
  border-top: 0px;
  border-left: 0px;
}
</style>
