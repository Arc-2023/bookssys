/* eslint-disable no-array-constructor */
/*
 * @Description: 每一个阶段种各个情感的最具有代表性的书籍展示
 * @Author: zy
 * @Date: 2020-12-18 15:02:24
 * @LastEditors: Wuyi
 * @LastEditTime: 2021-06-02 15:49:16
 */
import * as d3 from 'd3'
export class ReadPath {
  color = d3.scaleOrdinal(d3.schemeCategory10)

  constructor (divId) {
    this.divId = divId
    this.initChart()
  }

  initChart () {
    this.chart = {}
    this.chart.padding = {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10
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

  setData (data) {
    this.data = data
  }

  computeLayOut () {
    const height = this.chart.divHeight * 0.85
    const width = this.chart.divWidth / 3
    this.chart.itemWidth = width
    this.chart.centroY = height
    this.chart.r = width * 0.5
    this.chart.centroX = width * 0.5
    this.chart.fontSize = width / 24

    const startAngle = -Math.PI * 0.95
    const endAngle = -Math.PI * 0.05
    this.chart.r = Math.min(this.chart.itemWidth * 0.5, height) * 0.9

    this.chart.angleScale = d3.scaleLinear().range([startAngle, endAngle])

    this.simulation = d3.forceSimulation(this.data.nodes)
      .force('link', d3.forceLink(this.data.links))
  }

  render (book, grade, thisVue) {
    this.computeLayOut()
    this.renderGrade()
    this.renderBook(book, grade, thisVue)
  }

  renderGrade () {
    let rect = this.chart.svg.selectAll('.grades')
      .data(this.data.nodes)

    let rectEnter = rect.enter()
      .append('g')
      .attr('class', 'grades')
      .attr('id', function (d, i) {
        return d.name.split(' ')[0] + d.name.split(' ')[1].replace('-', '')
      })
      .on('click', (event, d) => {
        // console.log(d3.select('#' + this.divId).select('#grade12').remove())
      })

    rectEnter.append('circle')
      .attr('cx', (d, i) => {
        d.x = this.chart.centroX + this.chart.itemWidth * i
        d.y = this.chart.centroY
        return d.x
      })
      .attr('cy', d => d.y)
      .attr('r', 20)
      .attr('fill', (_, i) => this.color(i))
      .style('stroke', (_, i) => this.color(i))
      .style('stroke-width', 1)

    rectEnter.append('text')
      .attr('x', (d, i) => {
        return d.x - this.chart.fontSize * d.name.length * 0.3
      })
      .attr('y', d => d.y + 40)
      .text(d => d.name)
      .attr('font-size', this.chart.fontSize)

    let link = this.chart.svg.selectAll('path')
      .data(this.data.links)

    let linkEnter = link.enter()
      .append('g')
      .attr('class', 'links')

    linkEnter.append('path')
      .attr('d', d => {
        let path = `M ${d.source.x + 20} ${d.source.y}
        L ${d.target.x - 20} ${d.target.y}`
        return path
      })
      .attr('marker-end', 'url(#marker)')
      .style('stroke-width', 3)
      .style('stroke', 'black')
      .style('opacity', 0.8)

    this.chart.svg.append('marker')
      .attr('id', 'marker')
      .attr('markerUnits', 'userSpaceOnUse')
      .attr('viewBox', '0 -5 10 10')// 坐标系的区域
      .attr('refX', 10)// 箭头坐标
      .attr('refY', 0)
      .attr('markerWidth', 12)// 标识的大小
      .attr('markerHeight', 12)
      .attr('orient', 'auto')// 绘制方向，可设定为：auto（自动确认方向）和 角度值
      .attr('stroke-width', 2)// 箭头宽度
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')// 箭头的路径
      .attr('fill', '#000000')// 箭头颜色
  }

  renderBook (books, grade, thisVue) {
    let exitT = d3.transition()
      .duration(1000)

    let t = d3.transition(exitT)

    let enterT = d3.transition(t)

    let centroX = this.chart.centroX
    if (grade.indexOf('34') !== -1) {
      centroX += this.chart.itemWidth
    } else if (grade.indexOf('56') !== -1) {
      centroX += this.chart.itemWidth * 2
    }

    let g = this.chart.svg.select('#' + grade)

    books = books.map((d, i) => {
      d.index = i
      return d
    })
    let angleScale = this.chart.angleScale
    angleScale.domain(d3.extent(books.map(d => d.index)))

    let gbooks = g.selectAll('.book')
      .data(books, function (d) {
        return d.bookName
      })

    gbooks.select('path')
      .transition(t)
      .attrTween('d', d => {
        let centroY = this.chart.centroY
        let chart = this.chart
        let i = d3.interpolate(0, chart.r)
        let j = d3.interpolate(d.index - 1, d.index)
        return function (t) {
          let x = centroX + (i(t) - 5) * Math.cos(angleScale(j(t)))
          let y = centroY + (i(t) - 5) * Math.sin(angleScale(j(t)))
          let path = `M ${centroX} ${centroY}
            Q ${(centroX + x) * 0.5} ${(centroY + y) * 0.4},
            ${x} ${y}`
          return path
        }
      })

    gbooks.select('circle')
      .transition(t)
      .attr('cx', d => centroX + (this.chart.r + 5) * Math.cos(angleScale(d.index)))
      .attr('cy', d => this.chart.centroY + (this.chart.r + 5) * Math.sin(angleScale(d.index)))

    let bookEnter = gbooks.enter()
      .append('g')
      .attr('class', 'book')
      .on('click', function (event, thisNode) {
        let thisGrade = d3.select(this.parentNode).attr('id')
        let index = books.indexOf(thisNode)
        thisVue.index = index
        thisVue.deletbooks = books
        thisVue.deletGrade = thisGrade
        thisVue.dialogVisible = true
      })

    bookEnter.append('path')
      .attr('d', d => {
        let path = `M ${centroX} ${this.chart.centroY}
        ${centroX} ${this.chart.centroY}`
        return path
      })
      .attr('marker-end', 'url(#marker)')
      .style('stroke-width', 2)
      .style('stroke', 'red')
      .style('fill', 'none')
      .style('opacity', 0.4)

    bookEnter.select('path')
      .transition(enterT)
      .attrTween('d', d => {
        let centroY = this.chart.centroY
        let chart = this.chart
        let i = d3.interpolate(0, chart.r)
        let j = d3.interpolate(d.index - 1, d.index)
        return function (t) {
          let x = centroX + (i(t) - 5) * Math.cos(angleScale(j(t)))
          let y = centroY + (i(t) - 5) * Math.sin(angleScale(j(t)))
          let path = `M ${centroX} ${centroY}
            Q ${(centroX + x) * 0.5} ${(centroY + y) * 0.4},
            ${x} ${y}`
          return path
        }
      })
      .attr('marker-end', 'url(#marker)')
      .style('stroke-width', 2)
      .style('stroke', 'red')
      .style('fill', 'none')
      .style('opacity', 0.4)

    bookEnter.append('circle')
      .attr('cx', centroX)
      .attr('cy', this.chart.centroY)
      .attr('r', 0)
      .attr('fill', (_, i) => this.color(i))
      .style('stroke', (_, i) => this.color(i))
      .style('stroke-width', 1)
      .style('opacity', 1)
      .append('title')
      .text(d => d.bookName)

    bookEnter.select('circle')
      .transition(enterT)
      .attr('cx', d => centroX + (this.chart.r + 5) * Math.cos(angleScale(d.index)))
      .attr('cy', d => this.chart.centroY + (this.chart.r + 5) * Math.sin(angleScale(d.index)))
      .attr('r', 10)
      .attr('fill', (_, i) => this.color(i))
      .style('stroke', (_, i) => this.color(i))
      .style('stroke-width', 1)
      .style('opacity', 1)

    gbooks.exit()
      .transition(exitT)
      .remove()
  }
}
