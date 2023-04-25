/*
 * @Author: Wuyi
 * @Date: 2021-05-30 21:34:58
 * @LastEditTime: 2021-06-02 14:44:51
 * @LastEditors: Wuyi
 * @Description: 情感词云
 */
import * as echarts from 'echarts'
import 'echarts-wordcloud/dist/echarts-wordcloud'
import 'echarts-wordcloud/dist/echarts-wordcloud.min'
export class WordsCloud {
    divId = ''
    data = []
    chart = {}
    i = 0
    constructor (divId) {
      this.divId = divId
    }

    draw (wordsData, thisWord) {
      let Colors = ['#74add1', '#313695', '#4575b4', '#abd9e9', '#fee090', '#d73027', '#fdae61', '#f46d43']
      let chartDom = document.getElementById(this.divId)
      let myChart = echarts.getInstanceByDom(chartDom)
      if (myChart == null) {
        myChart = echarts.init(chartDom)
      }

      let option = {
        title: {
          text: '情感词云',
          textStyle: {
            align: 'center'
          }
        },
        tooltip: {
          show: true,
          formatter: function (data) {
            let result = '<span>情感:</span><span>' + data.name + '</span><br/>'
            result += '<span>频率:</span><span>' + data.value + '</span><br/>'
            return result
          },
          backgroundColor: 'rgba(255,255,255,0)',
          textStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            color: '#e65457'
          }
        },
        series: [{
          type: 'wordCloud',
          gridSize: 15,
          sizeRange: [25, 75],
          rotationRange: [0, 0],
          shape: 'pentagon',
          drawOutOfBound: false,
          textStyle: {
            color: function (info) {
              return Colors[(info.dataIndex) % 8]
            },
            emphasis: {
              fontWeight: 'bolder',
              fontSize: 30,
              color: '#00467A'
            }
          },
          left: 'center',
          top: 'center',
          padding: 10,
          right: null,
          bottom: null,
          width: '90%',
          height: '100%',
          // top: 20,
          data: wordsData
        }]
      }
      myChart.clear()
      setTimeout(option && myChart.setOption(option), 500)
      window.addEventListener('resize', () => myChart.resize())
      myChart.on('click', function (params) {
        thisWord.renderGraph(params.name)
      })
    }
}
