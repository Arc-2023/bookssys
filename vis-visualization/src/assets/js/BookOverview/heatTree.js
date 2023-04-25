/*
 * @Author: Wuyi
 * @Date: 2021-05-31 19:01:43
 * @LastEditTime: 2021-06-02 14:43:26
 * @LastEditors: Wuyi
 * @Description: 热力图
 */
import * as d3 from 'd3'
var heatPadding = {
  left: 40,
  top: 5,
  bottom: 5,
  right: 5
}
var i = 0
var rootData // 树图数据
var allHeatData = [] // 热力图的所有的数据
var yRange = [] // y轴的值域 树图叶子节点的坐标
var yDomain = [] // y轴的定义域 每个省份的名称
var xDomain // x轴的定义域 日期
var xScale // x轴的比例尺
var yScale // y轴的比例尺
var presentData = [] // 热力图实时的数据
var mergeData = [] // 合并省份之后的数据含位置信息
var rectWidth
var duration = 750
var heatColor = [
  '#d0b24f', '#FDA7DF', '#12CBC4', '#f5cd79', '#63cdda', '#786fa6', '#78e08f', '#3498db',
  '#74add1', '#313695', '#4575b4', '#abd9e9', '#fee090', '#d73027', '#fdae61', '#f46d43'
]
// var heatColor = [
//     '#80FFDB', '#72EFDD',
//     '#64DFDF', '#56CFE1',
//     '#48BFE3', '#4EA8DE',
//     '#5390D9', '#5E60CE',
//     '#6930C3', '#7400B8'
// ];

var colorDomain = [] // 颜色的定义域 每省每日的舆情数值
var colorScale = function (d) {
  let index = parseInt(colorDomain.indexOf(d) + Math.random() * 16)
  // console.log(colorDomain.indexOf(d))
  // console.log(heatColor[index])
  return heatColor[index]
} // 热力图颜色的比例尺

function initChart () {
  let width = document.getElementById('readingPath').offsetWidth - heatPadding.left - heatPadding.right
  let height = document.getElementById('readingPath').offsetHeight - heatPadding.top - heatPadding.bottom
  d3.select('#readingPath')
    .append('svg')
    .attr('height', height + heatPadding.top + heatPadding.bottom)
    .attr('width', width + heatPadding.left + heatPadding.right)
    .attr('class', 'heat_svg')
    .attr('id', 'heat_svg')
    .append('g')
    .attr('transform', 'translate(' + heatPadding.left * 4 + ',' + heatPadding.top + ')')
    .attr('id', 'tree_g')
}
/**
 * 定义树图的布局及计算节点
 * @param {*} treeData 树图的原始数据
 * @param {*} width svg的宽
 * @param {*} height svg的高
 */
export function drawHeatMapTree (treeData, thisTree) {
  initChart()
  let width = document.getElementById('readingPath').offsetWidth - heatPadding.left - heatPadding.right
  let height = document.getElementById('readingPath').offsetHeight - heatPadding.top - heatPadding.bottom
  let tree = d3.tree()
    .size([height, width])

  let root = d3.hierarchy(treeData, function (d) {
    return d.children
  })
  rootData = tree(root)
  root._x = height / 2
  root._y = heatPadding.left
  updateTree(root, thisTree)
}

/**
 * 绘制、更新树图
 * @param {*} source 更新的数据
 */
function updateTree (source, thisTree) {
  let svg = d3.select('#tree_g')

  let nodes = rootData.descendants()
  let links = rootData.descendants().slice(1)

  nodes.forEach(function (d) {
    d.y = d.depth * 100
  })
  //  ***********节点绘制*********
  let node = svg.selectAll('g.node')
    .data(nodes, function (d) {
      return d.id || (d.id = ++i)
    })
  // ********新增加的节点*********
  let nodeEnter = node.enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', function (d) {
      return 'translate(' + source._y + ',' + source._x + ')'
    })
    .on('click', function (event, d) {
      click(event, d, thisTree)
    })

  nodeEnter.append('circle')
    .attr('class', 'node')
    .attr('r', function (d) {
      if (!d.children) {
        yRange.push(d.x)
        yDomain.push(d.data.name)
        return 3
      }
      return 5
    })
    .style('stroke', '#2980b9')
    .style('fill', function (d) {
      if (!d.children) {
        return '#2980b9'
      }
      return '#fff'
    })

  // 定义Y轴比例尺
  yScale = d3.scaleOrdinal()
    .domain(yDomain)
    .range(yRange)

  nodeEnter.append('text')
    // .attr('y', function (d) {
    //     return d.y;
    //     // return d.children || d._children ? -18 : 18;
    // })
    .attr('dy', '.35em')
    .attr('dx', function (d) {
      if (!d.children) return '1em'
      return '-1em'
    })
    .attr('text-anchor', function (d) {
      if (!d.children) return 'start'
      return 'end'
    })
    .text(function (d) {
      return d.data.name
    })
    .style('fill-opacity', 0.7)

  // ************新增节点动画过渡*********
  let nodeUpdate = nodeEnter.merge(node)

  nodeUpdate.transition()
    .duration(duration)
    .attr('transform', function (d) {
      return 'translate(' + d.y + ',' + d.x + ')'
    })

  nodeUpdate.select('node.circle')
    .style('fill', '#fff')
    .attr('r', function (d) {
      if (!d.children) return 3
      return 5
    })

  // ***********删除的节点********
  let nodeExit = node.exit().transition()
    .duration(duration)
    .attr('transform', function (d) {
      return 'translate(' + source.y + ',' + source.x + ')'
    })
    .remove()

  nodeExit.selectAll('node.circle')
    .attr('r', 1e-6)

  nodeExit.selectAll('node.text')
    .style('fill-opacity', 1e-6)

  //  ***********连线绘制*********
  let link = svg.selectAll('path.link')
    .data(links, function (d) {
      return d.id
    })
  // **************新增的连线************
  let linkEnter = link.enter().insert('path', 'g')
    .attr('class', 'link')
    .attr('d', function (d) {
      var o = {
        x: source._x,
        y: source._y
      }
      return diagonal(o, o)
    })
    .style('fill', 'none')
    .style('stroke', '#636e72')
    .style('stroke-width', 1)

  var linkUpdate = linkEnter.merge(link)
  // ***********连线动画过渡*******
  linkUpdate.transition()
    .duration(duration)
    .attr('d', function (d) {
      return diagonal(d, d.parent)
    })
  // ************删除的连线************
  link.exit().transition()
    .duration(duration)
    .attr('d', function (d) {
      var o = {
        x: source.x,
        y: source.y
      }
      return diagonal(o, o)
    })
    .remove()
  // ************保存当前节点的坐标***********
  nodes.forEach(function (d) {
    d._x = d.x
    d._y = d.y
  })
}
/**
 * 树图连线
 * @param {*} s
 * @param {*} d
 */
function diagonal (s, d) {
  let path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

  return path
}

/**
 * 树图点击进行收放
 * @param {*} d
 */
function click (event, d, thisTree) {
  let flag // false 合并 true 分开
  let heatData = []
  if (d.children) {
    flag = false
    copyData(d.children, heatData)
    d._children = d.children
    d.children = null
    thisTree.renderCluster(d.data.name)
  } else {
    flag = true
    d.children = d._children
    d._children = null
    copyData(d.children, heatData)
    thisTree.renderCluster('user')
  }
  updateTree(d, thisTree)
  updateHeat(heatData, flag)
}

/**
 * 定义热力图相关的比例尺、位置并绘制
 * @param {*} data 所需的数据
 */
export function drawHeatMapHeat (data, area, thisHeatMap) {
  for (let i = 0; i < data.length; ++i) {
    data[i]._date = deepCopy(data[i].date)
  }
  allHeatData = deepCopy(data)
  presentData = deepCopy(data)
  getMergeData(data, area)
  let marginLeft = document.getElementById('tree_g').getBoundingClientRect().top + heatPadding.left * 5

  // 热力图左侧边框距离
  let heatWidth = d3.select('#heat_svg').attr('width') - 1.3 * marginLeft

  // 定义X轴比例尺
  xDomain = []
  xDomain = getXDomain(data)

  xScale = d3.scaleBand()
    .domain(xDomain)
    .range([0, heatWidth])

  colorDomain = getcolorDomain(data)

  let newColorDomain = []
  for (let i = colorDomain.length - 1; i >= 0; --i) {
    if (newColorDomain.indexOf(colorDomain[i]) === -1) {
      newColorDomain.push(colorDomain[i])
    }
  }
  newColorDomain.sort(function (a, b) {
    return a - b
  })
  colorDomain = newColorDomain

  d3.select('.heat_svg')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + heatPadding.top + ')')
    .attr('id', 'heat_g')
    .attr('class', 'heat_g')

  drawHeat(data, thisHeatMap)
}

function drawHeat (data, thisHeatMap) {
  // 计算连续的两个矩形之间的距离
  xDomain = []
  xDomain = getXDomain(data)
  xScale.domain(xDomain)

  rectWidth = xScale(data[0].date[1].date) - xScale(data[0].date[0].date)
  rectWidth = rectWidth * 0.7

  d3.select('.heat_g').selectAll('g').remove()

  let province = d3.select('.heat_g').selectAll('.province')
    .data(data)
    .enter()
    .append('g')
    .attr('class', function (d) {
      return d.province
    })

  let group = province.selectAll('rect')
    .data(function (d) {
      for (let i = 0; i < d.date.length; ++i) {
        d.date[i].province = d.province
      }
      return d.date
    })

  let groupEnter = group.enter()
    .append('rect')
    .attr('class', function (d) {
      return d.date
    })
    .attr('x', function (d) {
      return heatPadding.left * 1.5 + xScale(d.date)
    })
    .attr('y', function (d) {
      for (let i = 0; i < mergeData.length; ++i) {
        if (d.province === mergeData[i].province) {
          return mergeData[i].yStart
        }
      }
      return yScale(d.province) - 3.5
    })
    .on('click', function (event, d) {
      thisHeatMap.renderGraph(d.date)
    })

  groupEnter.append('svg:title')
    .text(function (d) {
      return '书名：' + d.province + '\n' +
        '情感：' + d.date + '\n' +
        '频率：' + d.num + '\n' // +
      // 'color:' + colorScale(d.num)
    })

  let groupUpdate = groupEnter.merge(group)

  groupUpdate.transition()
    .duration(duration)
    .attr('x', function (d) {
      return heatPadding.left * 1.5 + xScale(d.date)
    })
    .attr('y', function (d) {
      for (let i = 0; i < mergeData.length; ++i) {
        if (d.province === mergeData[i].province) {
          return mergeData[i].yStart
        }
      }
      return yScale(d.province) - 3.5
    })
    .attr('width', rectWidth)
    .attr('height', function (d) {
      for (let i = 0; i < mergeData.length; ++i) {
        if (d.province === mergeData[i].province) {
          return mergeData[i].rectHeight
        }
      }
      return 7
    })
    .style('stroke', 'black')
    .style('stroke-opacity', 0.4)
    .style('stroke-width', 0.4)
    .style('fill', function (d) {
      if (d.num !== 0) {
        return colorScale(d.num)
      } else return 'white'
    })
}

/**
 * 合并或者分开某一地域的矩形
 * @param {*} data 更新的数据
 * @param {*} flag 判断合并或分来
 */
function updateHeat (data, flag) {
  getPresentHeatData(data, flag)
  drawHeat(presentData)
}

function getPresentHeatData (data, flag) {
  // 合并
  if (flag === false) {
    // 删除数据
    let delDataIndex = []
    for (let i = presentData.length - 1; i >= 0; i--) {
      for (let j = 0; j < data.length; ++j) {
        if (presentData[i].province === data[j].name) {
          presentData.splice(i, 1)
          delDataIndex.unshift(i)
          break
        }
      }
    }
    for (let i = 0; i < mergeData.length; ++i) {
      if (mergeData[i].province === data[0].parent) {
        presentData.splice(delDataIndex[0], 0, mergeData[i])
        break
      }
    }
  } else {
    // 分开
    let index = 0
    for (let i = presentData.length - 1; i >= 0; --i) {
      if (presentData[i].province === data[0].parent) {
        presentData.splice(i, 1)
        index = i
        break
      }
    }
    for (let i = 0; i < data.length; ++i) {
      for (let j = 0; j < allHeatData.length; ++j) {
        if (data[i].name === allHeatData[j].province) {
          presentData.splice(index, 0, allHeatData[j])
          index++
          break
        }
      }
    }
  }
  return presentData
}
/**
 * 获取颜色比例尺的定义域
 * @param {*} data
 */
function getcolorDomain (data) {
  let colorDomain = []
  for (let i = 0; i < data.length; ++i) {
    for (let j = 0; j < data[i].date.length; ++j) {
      colorDomain.push(data[i].date[j].num)
    }
  }
  return colorDomain
}
/**
 * 获取X轴的定义域
 * @param {*} data
 */
function getXDomain (data) {
  xDomain = []
  for (let i = 0; i < data.length; ++i) {
    let date = data[i].date
    for (let j = 0; j < date.length; ++j) {
      if (xDomain.indexOf(date[j].date) === -1) {
        xDomain.push(date[j].date)
      }
    }
  }
  return xDomain
}
/**
 * 复制数据 获取树图点击后收缩或者展开的省份数据
 * @param {*} oldData
 * @param {*} newData
 */
function copyData (oldData, newData) {
  for (let i = 0; i < oldData.length; ++i) {
    newData.push({
      name: oldData[i].data.name,
      parent: oldData[i].data.parent
    })
  }
}

function getMergeData (data, area) {
  mergeData = deepCopy(area)
  for (let i = 0; i < mergeData.length; ++i) {
    let selectedData = []
    for (let j = 0; j < data.length; ++j) {
      if (mergeData[i].province === data[j].parent) {
        selectedData.push(data[j])
      }
    }
    mergeData[i].rectHeight = (yScale(selectedData[selectedData.length - 1].province) - yScale(selectedData[0].province))
    mergeData[i].yStart = yScale(selectedData[0].province)
    mergeData[i]._date = deepCopy(mergeData[i].date)
  }
  return mergeData
}

function deepCopy (obj, cache = []) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  const hit = cache.filter(c => c.original === obj)[0]
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}

  cache.push({
    original: obj,
    copy
  })
  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}
