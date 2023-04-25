/*
 * @Description: 对比数据的各项属性
 * @Author: zy
 * @Date: 2020-12-23 18:28:59
 * @LastEditors: Wuyi
 * @LastEditTime: 2021-05-23 11:23:39
 */
import * as d3 from 'd3'
export class Comparsion {
  chart = {}
  level = 4
  maxValue = 5
  radius = 0
  color = d3.scaleOrdinal(d3.schemeCategory10)
  constructor (divId) {
    this.divId = divId
  }
  setData (data) {
    this.data = data
  }

  initChart () {
    this.chart.padding = {
      left: 20,
      right: 50,
      top: 20,
      bottom: 20
    }
    this.chart.divHeight = document.getElementById(this.divId).offsetHeight -
      this.chart.padding.top -
      this.chart.padding.bottom
    this.chart.divWidth = document.getElementById(this.divId).offsetWidth -
      this.chart.padding.left -
      this.chart.padding.right

    this.chart.svg = d3
      .select('#' + this.divId)
      .append('svg')
      .attr('viewBox', '0 0 ' + document.getElementById(this.divId).offsetWidth +
      ' ' + document.getElementById(this.divId).offsetHeight)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('class', 'svg_chart')
  }
  drawGrid () {
    this.maxValue = d3.max(this.data[0].data, d => { return d.value })
    let allAxis = this.data[0].data.map(d => d.axis)
    let total = allAxis.length
    this.radius = Math.min(this.chart.divHeight / 2, this.chart.divWidth / 2) * 0.8

    let angleSlice = Math.PI * 2 / total

    this.axisScale = {}
    for (let i = 0; i < allAxis.length; ++i) {
      this.axisScale[allAxis[i]] = -(angleSlice * i + Math.PI)
    }

    this.chart.rScale = d3.scaleLinear()
      .domain([0, this.maxValue])
      .range([0, this.radius])

    this.radarLine = d3.radialLine()
      .curve(d3.curveCatmullRomClosed)
      .radius(d => {
        return this.chart.rScale(d.value)
      })
      .angle(d => {
        return -this.axisScale[d.axis] - Math.PI
      })

    this.chart.g = this.chart.svg.append('g')
      .attr('transform', 'translate(' + this.chart.divWidth / 2 + ',' + this.chart.divHeight / 2 + ')')

    let axisGrid = this.chart.g.append('g')
      .attr('class', 'axisGrid')

    axisGrid.selectAll('.levels')
      .data(d3.range(1, this.level + 1).reverse())
      .enter()
      .append('circle')
      .attr('class', 'levels')
      .attr('r', 0)
      .style('fill', '#CDCDCD')
      .style('stroke', '#CDCDCD')
      .style('fill-opacity', 0.3)

    axisGrid.selectAll('circle')
      .transition()
      .duration(750)
      .attr('r', d => this.radius / this.level * d)

    let axis = axisGrid.selectAll('.axis')
      .data(allAxis)
      .enter()
      .append('g')
      .attr('class', 'axis')

    axis.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', 0)
      .style('stroke-width', 3)
      .style('stroke', 'white')

    axis.select('line')
      .transition()
      .duration(750)
      .attr('x2', d => Math.sin(this.axisScale[d]) * this.radius)
      .attr('y2', d => Math.cos(this.axisScale[d]) * this.radius)

    axis.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', 1e-6)
      .text(String)

    axis.select('text')
      .transition()
      .duration(750)
      .attr('font-size', 12)
      .attr('x', d => Math.sin(this.axisScale[d]) * this.radius * 1.2)
      .attr('y', d => Math.cos(this.axisScale[d]) * this.radius * 1.2)
  }

  render () {
    this.initChart()
    this.drawGrid()
    this.drawArea()
  }
  drawArea () {
    let area = this.chart.g.selectAll('.area')
      .data(this.data)

    let areaEnter = area.enter()
      .append('g')
      .attr('class', 'area')

    areaEnter.append('path')
      .attr('class', 'radarArea')
      .attr('d', d => {
        let init = []
        for (let i = 0; i < d.data.length; ++i) {
          init.push(JSON.parse(JSON.stringify(d.data[i])))
          init[init.length - 1].value = 0
        }
        return this.radarLine(init)
      })
      .style('fill', (d, i) => this.color(i))
      .style('fill-opacity', 0.6)

    areaEnter.selectAll('.dot')
      .data(d => d.data)
      .enter()
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 0)
      .style('fill', (d, i) => this.color(i))

    let areaUpdate = areaEnter.merge(area)

    areaUpdate.select('path')
      .transition()
      .duration(750)
      .attr('d', d => {
        return this.radarLine(d.data)
      })

    areaUpdate.selectAll('circle')
      .transition()
      .duration(750)
      .attr('cx', d => Math.sin(this.axisScale[d.axis]) * this.chart.rScale(d.value))
      .attr('cy', d => Math.cos(this.axisScale[d.axis]) * this.chart.rScale(d.value))
      .attr('r', 2)

    let areaExit = area.exit()
      .transition()
      .duration(750)
      .remove()

    areaExit.select('path')
      .attr('d', d => {
        let init = []
        for (let i = 0; i < d.length; ++i) {
          init.push(JSON.parse(JSON.stringify(d.data[i])))
          init[init.length - 1].value = 0
        }
        return this.radarLine(init)
      })

    areaExit.selectAll('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 0)
  }
}
