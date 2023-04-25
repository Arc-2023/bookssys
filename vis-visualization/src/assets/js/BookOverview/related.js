/*
 * @Author: Wuyi
 * @Date: 2021-05-03 17:11:01
 * @LastEditTime: 2021-06-02 16:06:02
 * @LastEditors: Wuyi
 * @Description: 关系图
 */
import * as echarts from 'echarts'
export class Related {
    divId = ''
    data = []
    chart = {}
    i = 0
    constructor (divId) {
      this.divId = divId
    }

    setData (data) {
      this.data = data
    }
    draw (newBook) {
      let chartDom = document.getElementById(this.divId)
      let myChart = echarts.getInstanceByDom(chartDom)
      if (myChart == null) {
        myChart = echarts.init(chartDom)
      }
      let option

      option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            data: [this.data],
            top: '1%',
            left: '5%',
            bottom: '1%',
            right: '40%',
            symbolSize: 10,
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'left',
              fontSize: 15
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            emphasis: {
              focus: 'descendant'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      }
      myChart.clear()
      setTimeout(option && myChart.setOption(option), 500)
      window.onresize = function () {
        myChart.resize()
      }
      myChart.on('click', function (params) {
        let name = params.data.name
        let nameArr = Object.keys(params.data)
        if (nameArr.length === 1) {
          newBook.getNewMassage(name)
        }
      })
    }
}
