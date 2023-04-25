/* eslint-disable no-array-constructor */
/*
 * @Author: Wuyi
 * @Date: 2021-05-23 15:06:26
 * @LastEditTime: 2021-06-02 16:00:21
 * @LastEditors: Wuyi
 * @Description: 常用函数
 */
export class ComFunction {
  relatedData (books) {
    let category = ['123']
    category.push(books[0].bookPicture)
    category.push(books[0].bookEmotion)
    category.push(books[0].typeId)
    let data = new Array()
    let stempData = new Array()
    for (let i = 1; i < books.length; i++) {
      let newData = new Array()
      for (let j = 0; j < books[i].length; j++) {
        newData.push({
          'name': books[i][j].bookName
        })
      }
      stempData.push({
        'name': category[i],
        'children': newData
      })
    }
    data.push({
      'name': books[0].bookName,
      'children': stempData
    })
    return data
  }

  heatMapData (books) {
    let category = ['grade12', 'grade34', 'grade56']
    let data = []
    let stempData = []
    for (let i = 0; i < books.length; i++) {
      let newData = []
      for (let j = 0; j < books[i].length; j++) {
        newData.push({
          'name': books[i][j].bookName,
          'parent': category[i]
        })
      }
      stempData.push({
        'name': category[i],
        'children': newData,
        'parent': books[0][0].userName
      })
    }
    data.push({
      'name': books[0][0].userName,
      'children': stempData,
      'parent': 'null'
    })
    return data
  }

  emotionData (emotion) {
    console.log(emotion)
    let category = ['grade12', 'grade34', 'grade56']
    let province
    let parent
    let stempData = []
    for (let i = 0; i < emotion.length; i++) {
      for (let j = 0; j < emotion[i].length; j++) {
        let stemp = []
        for (let k in emotion[i][j]) {
          if (emotion[i][j][k] === -1) {
            province = k
            parent = category[i]
          } else {
            stemp.push({
              'date': k,
              'num': emotion[i][j][k]
            })
          }
        }
        stempData.push({
          'province': province,
          'parent': parent,
          'date': stemp
        })
      }
    }
    // for (let i = 0; i < stempData.length; i++) {
    //   stempData[i].date = stempData[i].date.slice(10, 70)
    // }
    return stempData
  }

  mergeData (mergedata) {
    let stempData = []
    let province
    for (let i = 0; i < mergedata.length; i++) {
      let stemp = []
      for (let k in mergedata[i]) {
        if (mergedata[i][k] === -1) {
          province = k
        } else {
          stemp.push({
            'date': k,
            'num': mergedata[i][k]
          })
        }
      }
      stempData.push({
        'province': province,
        'date': stemp
      })
    }
    // for (let i = 0; i < stempData.length; i++) {
    //   stempData[i].date = stempData[i].date.slice(10, 70)
    // }
    return stempData
  }

  recomData (recomdata) {
    let grade = ['grade12', 'grade34', 'grade56']
    let grades = ['12', '34', '56']
    let Colors = [
      '#d0b24f', '#FDA7DF', '#12CBC4', '#f5cd79', '#63cdda', '#786fa6', '#78e08f', '#3498db',
      '#74add1', '#313695', '#4575b4', '#abd9e9', '#fee090', '#d73027', '#fdae61', '#f46d43']
    let count = 0
    let stemp = []
    for (let k = 0; k < 3; k++) {
      let stemp2 = []
      for (let i = 1; i < recomdata.length; i += 2) {
        let stemp1 = []
        let flag = 0
        for (let j = 0; j < recomdata[i].length; j++) {
          if (recomdata[i][j].isRecom === grades[k]) {
            flag++
            stemp1.push({
              'name': recomdata[i][j].bookName,
              'value': 1,
              'itemStyle': {
                color: Colors[count % 16]
              }
            })
            count++
          }
        }
        stemp1 = stemp1.slice(0, 10)
        if (flag !== 0) {
          stemp2.push({
            'name': recomdata[i - 1],
            'itemStyle': {
              color: Colors[count % 16]
            },
            'children': stemp1
          })
        }
      }
      stemp2 = stemp2.slice(0, 10)
      stemp.push({
        'name': grade[k],
        'itemStyle': {
          color: Colors[count % 16]
        },
        'children': stemp2
      })
    }
    return stemp
  }

  pressData (pressdata) {
    let result = []
    let categories = []
    let obj = {}
    let pressName = []
    let nodes = []
    let links = []
    for (let i = 0; i < pressdata.length; i++) {
      categories.push(pressdata[i].bookPicture)
    }
    for (let i = 0; i < categories.length; i++) {
      if (obj[categories[i]]) {
        obj[categories[i]]++
      } else {
        obj[categories[i]] = 1
      }
    }
    let list = Object.keys(obj).sort((a, b) => {
      return obj[b] - obj[a]
    })
    list = list.slice(0, 10)
    for (let i = 0; i < list.length; i++) {
      let count = 0
      for (let j = 0; j < pressdata.length; j++) {
        if (list[i] === pressdata[j].bookPicture) {
          count++
          nodes.push({
            'name': pressdata[j].bookName,
            'value': 1,
            'category': i
          })
        }
      }
      nodes.push({
        'name': list[i],
        'value': count,
        'category': i
      })
    }
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        if (list[i] === nodes[j].name) {
          for (let k = 0; k < nodes.length; k++) {
            if (nodes[j].category === nodes[k].category && nodes[k].value === 1) {
              links.push({
                'source': j,
                'target': k
              })
            }
          }
        }
      }
    }
    for (let i = 0; i < list.length; i++) {
      pressName.push({
        'name': list[i],
        'keyword': {},
        'base': list[i]
      })
    }
    result.push({
      'nodes': nodes,
      'links': links,
      'categories': pressName
    })
    return result[0]
  }
}
