/*
 * @Description: 每一个阶段种各个情感的最具有代表性的书籍展示
 * @Author: zy
 * @Date: 2020-12-18 15:02:24
 * @LastEditors: Wuyi
 * @LastEditTime: 2021-06-02 16:11:28
 */
import * as d3 from 'd3'
import axios from 'axios'
import {Related} from '@/assets/js/BookOverview/related.js'
import {ComFunction} from '@/assets/js/BookOverview/commonFun.js'
axios.defaults.baseURL = 'http://localhost:8080/'
export class Grade {
  constructor (divId) {
    this.divId = divId
    this.initChart()
  }
  initChart () {
    this.color = [
      '#f3a683', '#f7d794', '#778beb', '#e77f67', '#cf6a87', '#f19066', '#f5cd79', '#546de5',
      '#e15f41', '#e15f41', '#4575b4', '#abd9e9', '#fee090', '#d73027', '#fdae61', '#f46d43'
    ]
    this.olorScale = function (d) {
      let index = parseInt(d)
      // console.log(colorDomain.indexOf(d))
      // console.log(heatColor[index])
      return this.color[index]
    }
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
    const height = this.chart.divHeight / this.data.length
    this.chart.itemHeight = height
    this.chart.rectHeight = height * 0.95
    this.chart.rectPadding = height * 0.1
  }

  render (bookThis) {
    this.computeLayOut()
    let books = this.chart.svg.selectAll('.book')
      .data(this.data)

    let bookEnter = books.enter()
      .append('g')
      .attr('class', 'book')
      .attr('transform', 'translate(10)')
      .on('click', async (event, d) => {
        console.log(d)
        let {data: books} = await axios.get('/book/searchByBookName', {
          params: {
            bookName: d.bookName
          }
        })
        console.log(books)
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

    bookEnter.append('rect')
      .attr('x', this.chart.padding.left)
      .attr('y', (_, i) => this.chart.padding.top + i * this.chart.itemHeight)
      .attr('width', this.chart.divWidth * 0.95)
      .attr('height', this.chart.rectHeight)
      .attr('fill', (_, i) => this.olorScale(i))
      .style('stroke', (_, i) => this.olorScale(i))
      .style('stroke-width', 1)

    bookEnter.append('text')
      .attr('x', this.chart.padding.left + 5)
      .attr('y', (_, i) => this.chart.padding.top + i * this.chart.itemHeight + this.chart.rectHeight * 0.7)
      .text(d => d.bookName)
      .attr('font-size', 15)
  }
}
