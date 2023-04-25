/* eslint-disable no-array-constructor */
/*
 * @Description: 根据情感聚类的散点图
 * @Author: zy
 * @Date: 2020-12-22 20:20:05
 * @LastEditors: Wuyi
 * @LastEditTime: 2021-06-02 16:20:08
 */
import * as d3 from 'd3'
import axios from 'axios'
import {Related} from '@/assets/js/BookOverview/related.js'
import {ComFunction} from '@/assets/js/BookOverview/commonFun.js'
axios.defaults.baseURL = 'http://localhost:8080/'
export class Cluster {
  data = []
  chart = {}
  color = d3.scaleOrdinal()
  constructor (divId) {
    this.divId = divId
    this.initChart()
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
      .attr('class', 'svg_chart')
      .attr('viewBox', '0 0 ' + document.getElementById(this.divId).offsetWidth +
      ' ' + document.getElementById(this.divId).offsetHeight)
      .attr('preserveAspectRatio', 'xMidYMid meet')
  }

  initAxis () {
    this.chart.xScale = d3.scaleLinear()
      .domain(d3.extent(this.data, function (d) {
        return +d.x
      }))
      .range([this.chart.padding.left, this.chart.divWidth])

    this.chart.yScale = d3.scaleLinear()
      .domain(d3.extent(this.data, function (d) {
        return +d.y
      }))
      .range([this.chart.divHeight, this.chart.padding.top])

    this.color.domain(this.category).range(d3.schemeCategory10)

    this.chart.xAxis = d3
      .axisBottom()
      .scale(this.chart.xScale)
      .ticks(this.data.length)
    this.chart.yAxis = d3.axisLeft().scale(this.chart.yScale)
  }

  render (bookThis) {
    this.initAxis()
    let scatter = this.chart.svg.selectAll('.scatter')
      .data(this.data)

    scatter.select('circle')
      .transition()
      .duration(750)
      .attr('cx', d => this.chart.xScale(d.x))
      .attr('cy', d => this.chart.yScale(d.y))

    let scatterEnter = scatter.enter()
      .append('g')
      .attr('class', 'scatter')

    scatterEnter.append('circle')
      .attr('cx', d => this.chart.xScale(d.x))
      .attr('cy', d => this.chart.yScale(d.y))
      .attr('r', 0)
      .style('fill', d => this.color(d.category))
      .style('stroke', 'black')
      .on('click', async (event, d) => {
        let {data: books} = await axios.get('/book/searchBooksByIsbn', {
          params: {
            isbn: d.book_isbn
          }
        })
        books[1] = books[1].slice(0, 10)
        books[2] = books[2].slice(0, 10)
        books[3] = books[3].slice(0, 10)
        let comFun = new ComFunction()
        let relatedChart = new Related('related')
        let data = comFun.relatedData(books)
        relatedChart.setData(data[0])
        relatedChart.draw()
        bookThis.getMassage(books[0].bookName)
      })
      .transition()
      .duration(750)
      .attr('r', 5)

    let scatterExit = scatter.exit()
      .transition()
      .duration(750)
      .remove()

    scatterExit.select('circle')
      .attr('cr', 0)
    this.drawLegend()
  }

  drawLegend () {
    let category = ['0', '1', '2', '3', '全选']
    let that = this
    let legendWidth = 20
    let legendHeight = 20
    let legends = this.chart.svg
      .selectAll('.legend')
      .data(category)

    let legendEnter = legends.enter()
      .append('g')
      .attr('class', 'legend')
      .on('click', function (event, o) {
        if (o !== '全选') {
          that.chart.svg.selectAll('.legend')
            .style('opacity', 0.4)
          d3.select(this).style('opacity', 1)
          that.chart.svg.selectAll('.scatter')
            .style('opacity', 1)
          that.chart.svg.selectAll('.scatter')
            .filter(d => {
              return d.category !== parseInt(o)
            })
            .style('opacity', 0.1)
        } else {
          that.chart.svg.selectAll('.legend')
            .style('opacity', 1)
          that.chart.svg.selectAll('.scatter')
            .style('opacity', 1)
        }
      })

    legendEnter.append('rect')
      .attr('x', this.chart.divWidth - legendWidth * 2 - 5)
      .attr('y', (d, i) => this.chart.padding.top + legendHeight * i)
      .attr('width', 0)
      .attr('height', legendHeight - 5)
      .style('fill', d => this.color(d))

    legendEnter.append('text')
      .attr('x', this.chart.divWidth - legendWidth)
      .attr('y', (d, i) => this.chart.padding.top + legendHeight * i + legendHeight / 2)
      .text(d => {
        if (d !== '全选') {
          return 'category' + d
        }
        return d
      })
      .style('font-size', 15)

    let legendUpdate = legendEnter.merge(legends)

    legendUpdate.select('rect')
      .transition()
      .duration(750)
      .attr('width', legendWidth)

    legendUpdate.select('text')
      .transition()
      .duration(750)
      .style('font-size', 10)

    let legendExit = legends.exit()
      .transition()
      .duration(750)
      .remove()

    legendExit.select('rect')
      .attr('width', 0)

    legendExit.select('text')
      .style('stroke-opacity', 1e-6)
  }
}
