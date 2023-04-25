/*
 * @Author: Wuyi
 * @Date: 2021-06-01 10:59:19
 * @LastEditTime: 2021-06-01 17:10:25
 * @LastEditors: Wuyi
 * @Description: 图书推荐
 */
import * as echarts from 'echarts'
export function initChart (divID, data) {
  var chartDom = document.getElementById(divID)
  var myChart = echarts.init(chartDom)
  var option

  option = {
    title: {
      text: '图书推荐',
      textStyle: {
        align: 'center'
      }
    },
    tooltip: {
      show: true,
      formatter: function (data) {
        let result = '<span>' + data.name + '</span><br/>'
        return result
      },
      backgroundColor: 'rgba(255,255,255,0)',
      textStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#e65457'
      }
    },
    series: {
      type: 'sunburst',
      data: data,
      radius: [0, '95%'],
      sort: null,
      emphasis: {
        focus: 'ancestor'
      },
      levels: [{}, {
        r0: '15%',
        r: '35%',
        itemStyle: {
          borderWidth: 2
        },
        label: {
          rotate: 'tangential'
        }
      }, {
        r0: '35%',
        r: '70%',
        label: {
          align: 'right'
        }
      }, {
        r0: '70%',
        r: '72%',
        label: {
          position: 'outside',
          padding: 3,
          silent: false
        },
        itemStyle: {
          borderWidth: 3
        }
      }]
    }
  }
  myChart.clear()
  setTimeout(option && myChart.setOption(option), 500)
  window.addEventListener('resize', () => myChart.resize())
}
