/*
 * @Author: Wuyi
 * @Date: 2021-06-01 17:11:56
 * @LastEditTime: 2021-06-02 14:53:16
 * @LastEditors: Wuyi
 * @Description: 情感关系图
 */
import * as echarts from 'echarts'
export function initGraph (divId, webkitDep) {
  var chartDom = document.getElementById(divId)
  var myChart = echarts.init(chartDom)
  var pressList = []
  var option
  webkitDep.categories.map(function (d, i) {
    pressList[i] = d
  })
  option = {
    title: {
      text: '相关出版社',
      textStyle: {
        align: 'center'
      }
    },
    legend: {
      orient: 'vertical',
      data: pressList,
      right: 10,
      y: 'center'
    },
    series: [{
      type: 'graph',
      layout: 'force',
      animation: false,
      label: {
        position: 'right',
        formatter: function (data) {
          let result = data.name
          return result
        },
        backgroundColor: 'rgba(255,255,255,0)',
        textStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          color: '#e65457'
        }
      },
      draggable: true,
      data: webkitDep.nodes.map(function (node, idx) {
        node.id = idx
        node.symbolSize = node.value * 4 + 5
        return node
      }),
      categories: webkitDep.categories,
      force: {
        edgeLength: webkitDep.nodes.map(function (node, idx) {
          return node.symbolSize * 5
        }),
        repulsion: 30,
        gravity: 0.1
      },
      edges: webkitDep.links
    }]
  }
  myChart.setOption(option)

  option && myChart.setOption(option)
}
