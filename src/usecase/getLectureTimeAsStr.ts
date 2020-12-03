type Detail = {
  id: number
  module: string
  day: string
  period: number
  room: string
}

type Details = Detail[]

// 2次元配列を転置
const transpose = (matrix: string[][]) =>
  matrix[0].map((_, i) => matrix.map((r) => r[i]))

// string[][1]の重複した要素を取り除く
// Ex) [['月', '56'], ['火', '56']] -> [['月', ''], ['火', '56']]
const reduceArr = (arr: string[][]) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1][1] == arr[i][1]) {
      arr[i - 1][1] = ''
    }
  }
  return arr
}

// string[][]の要素を結合して文字列に変換する
// Ex) [['月', ''], ['火', '56']] -> '月火56'
const convArrToStr = (arr: string[][]) => {
  return arr.reduce((acc, cur) => {
    return acc + cur[0] + cur[1]
  }, '')
}

const genTreeStrucStr = (
  startIdx: number,
  endIdx: number,
  rows: string[][],
  level: number
): string => {
  if (level == 4) {
    return ''
  }
  const arr = rows[level]
  let letters = []
  let nextStart = startIdx
  for (let i = startIdx; i <= endIdx; i++) {
    if (i == endIdx || arr[i] != arr[i + 1]) {
      const s = genTreeStrucStr(nextStart, i, rows, level + 1)
      if (typeof s !== 'undefined') {
        letters.push([arr[i], s])
      } else {
        letters.push([arr[i], ''])
      }
      nextStart = i + 1
    }
  }
  const reducedArr = reduceArr(letters)
  const str = convArrToStr(reducedArr)
  return str
}

export const getLectureTimeAsStr = (details: Details): string => {
  if (details.length > 0) {
    const li = details.map((x: Detail): string[] => {
      // 0時限目は''と扱う
      const period = x.period === 0 ? '' : String(x.period)
      return [x.module[0], x.module[1], x.day, period]
    })
    const translocation = transpose(li)
    const txt = genTreeStrucStr(
      0,
      translocation[0].length - 1,
      translocation,
      0
    )
    return txt
  } else {
    return ''
  }
}
