<!--
 * @Author: Wuyi
 * @Date: 2021-05-30 16:49:48
 * @LastEditTime: 2021-06-02 23:37:13
 * @LastEditors: Wuyi
 * @Description: 推荐
-->
<template>
    <div id = "BookOverview">
        <el-col :span="24">
          <div id="readingPath"></div>
          <el-row id="assets">
            <el-col :span="8" id="cluster"></el-col>
            <el-col :span="8" id="graph"></el-col>
            <el-col :span="8" id="recommend"></el-col>
          </el-row>
        </el-col>
  </div>
</template>
<script>
// import * as d3 from 'd3'
import {GraphBook} from '@/assets/js/BookOverview/graph.js'
import {ComFunction} from '@/assets/js/BookOverview/commonFun.js'
import {HeatMap} from '@/assets/js/BookOverview/heatMap.js'
import {WordsCloud} from '@/assets/js/BookOverview/wordsCloud.js'
import {BookRecom} from '@/assets/js/BookOverview/recommend.js'
export default {
  data () {
    return {
      data: {},
      chart: {}
    }
  },
  created () {
    // this.getEmbeddings()
  },
  mounted () {
    this.renderCluster()
    this.renderSunBurst()
    this.renderHeatMap()
  },
  methods: {

    async renderCluster (grade) {
      this.category = []
      let grades = ['', 'grade12', 'grade34', 'grade56']
      let {data: emotionWords} = await this.$http.get('/userbook/getEmotionWords', {
        params: {
          username: document.getElementById('user_name').innerHTML
        }
      })
      let wordsData = []
      let index = grades.indexOf(grade)
      if (index === -1) {
        index = 0
      }
      for (let k in emotionWords[index]) {
        wordsData.push({
          'name': k,
          'value': emotionWords[index][k]
        })
      }
      let chart = new WordsCloud('cluster')
      this.chart.ClusterChart = chart
      chart.draw(wordsData, this)
    },

    async renderGraph (emotion) {
      let {data: books} = await this.$http.get('/book/GetLikeBooks', {
        params: {
          emotions: emotion
        }
      })
      let comFun = new ComFunction()
      let pressdata = comFun.pressData(books)
      let graphChart = new GraphBook('graph')
      graphChart.setData(pressdata)
      graphChart.render(this)
    },
    async renderHeatMap () {
      let thisUserName = document.getElementById('user_name').innerHTML
      let {data: userbook} = await this.$http.get('/userbook/getUserNameBooks', {
        params: {
          username: thisUserName
        }
      })
      let {data: useremotions} = await this.$http.get('/userbook/getUserNameEmotions', {
        params: {
          username: thisUserName
        }
      })
      let {data: mergeemotions} = await this.$http.get('/userbook/getMergeEmotions', {
        params: {
          username: thisUserName
        }
      })
      console.log(useremotions)
      console.log(mergeemotions)
      let comFun = new ComFunction()
      let heatMapChart = new HeatMap('readingPath')
      let userData = comFun.heatMapData(userbook)
      let emotionData = comFun.emotionData(useremotions)
      let mergenData = comFun.mergeData(mergeemotions)
      heatMapChart.setData(userData[0], emotionData, mergenData)
      heatMapChart.render(this)
    },
    async renderSunBurst () {
      let thisUserName = document.getElementById('user_name').innerHTML
      let {data: recomBook} = await this.$http.get('/userbook/GetRecomBooks', {
        params: {
          username: thisUserName
        }
      })
      let recommend = new BookRecom('recommend')
      let comFun = new ComFunction()
      let recomBookData = comFun.recomData(recomBook)
      recommend.setData(recomBookData)
      recommend.render()
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

.stage {
  width: 100%;
  height: 33%;
}

.input {
  width: 90%;
  padding: 5px;
}
.searchButton {
  display:block;
  margin:0 auto;
}
#readingPath {
  width: 100%;
  height: 55%;
  border: 1px solid black;
  border-left: 0px;
  border-top: 0px;
}

#assets {
  width: 100%;
  height: 45%;
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

#graph {
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
  border: 1px solid black;
  border-top: 0px;
  border-left: 0px;
}
</style>
