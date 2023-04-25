/*
 * @Author: Wuyi
 * @Date: 2021-05-31 13:20:52
 * @LastEditTime: 2021-06-02 14:40:20
 * @LastEditors: Wuyi
 * @Description: 热力图
 */
import * as d3 from 'd3'
import * as heatTree from '@/assets/js/BookOverview/heatTree.js'
export class HeatMap {
  color = d3.scaleOrdinal(d3.schemeCategory10)

  constructor (divId) {
    this.divId = divId
  }

  setData (treeData, bookData, gradeData) {
    this.treeData = treeData
    this.bookData = bookData
    this.gradeData = gradeData
  }
  render (thisHeatMap) {
    heatTree.drawHeatMapTree(this.treeData, thisHeatMap)
    heatTree.drawHeatMapHeat(this.bookData, this.gradeData, thisHeatMap)
  }
}
