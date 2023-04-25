/*
 * @Author: Wuyi
 * @Date: 2021-06-01 17:14:03
 * @LastEditTime: 2021-06-01 21:11:36
 * @LastEditors: Wuyi
 * @Description: 关系图
 */
import * as d3 from 'd3'
import * as graphBook from '@/assets/js/BookOverview/graphBook.js'
export class GraphBook {
  color = d3.scaleOrdinal(d3.schemeCategory10)

  constructor (divId) {
    this.divId = divId
  }

  setData (data) {
    this.data = data
  }
  render () {
    graphBook.initGraph(this.divId, this.data)
  }
}
