/*
 * @Author: Wuyi
 * @Date: 2021-06-01 11:01:42
 * @LastEditTime: 2021-06-01 16:26:01
 * @LastEditors: Wuyi
 * @Description: 图书推荐
 */
import * as d3 from 'd3'
import * as bookRecom from '@/assets/js/BookOverview/bookRecom.js'
export class BookRecom {
  color = d3.scaleOrdinal(d3.schemeCategory10)

  constructor (divId) {
    this.divId = divId
  }

  setData (data) {
    this.data = data
  }
  render () {
    bookRecom.initChart(this.divId, this.data)
  }
}
