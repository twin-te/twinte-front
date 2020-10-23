import Swal from 'sweetalert2'
import union from 'lodash/union'

import { Period } from '../../types'
import { YEAR } from '../../config'

export enum Module {
  SpringA = '春A',
  SpringB = '春B',
  SpringC = '春C',
  FallA = '秋A',
  FallB = '秋B',
  FallC = '秋C',
  SummerVacation = '夏季休業中',
  SpringVacation = '春季休業中',
  Annual = '通年',
  Unknown = '不明',
}
export enum Day {
  Sun = '日',
  Mon = '月',
  Tue = '火',
  Wed = '水',
  Thu = '木',
  Fri = '金',
  Sat = '土',
  Unknown = '不明',
}

/**
 * 時間割取得
 * @param year
 */
async function getTimeTables(year = YEAR) {
  try {
    const data = await $nuxt.$api.timetables.$get({ query: { year } })
    return data
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return []
  }
}

/**
 * 講義を時間割に登録
 * @param lectureCode
 * @param year
 */
async function postLecture(lectureCode: string, year = YEAR) {
  try {
    const data = await $nuxt.$api.timetables.$post({
      body: { year, lectureCode },
    })

    return data
  } catch (error) {
    const { data } = error.response
    if (data?.msg === '重複する時限が存在します') {
      await Swal.fire(
        '重複する時限が存在します',
        `${lectureCode}と重複している授業がないか確認してください。`,
        'info'
      )
    }
    return null
  }
}

/**
 * @param lectureCodes 授業番号の配列
 * @returns 授業詳細配列
 */
async function postAllLectures(lectureCodes: string[], year = YEAR) {
  return await Promise.all(
    union(lectureCodes).map(async (lectureCode) => {
      return await postLecture(lectureCode, year)
    })
  )
}

/**
 * 講義を追加/更新
 */
async function updateLecture(lecture: Period) {
  try {
    const { year, module, day, period, user_lecture_id, room } = lecture
    const data = await $nuxt.$api.timetables
      ._year(year)
      ._module(module)
      ._day(day)
      ._period(period)
      .$put({
        body: {
          room,
          user_lecture_id,
        },
      })
    return data
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return null
  }
}

/**
 * 講義の削除
 * @param year
 * @param module
 * @param day
 * @param period
 */
async function deleteLecture(
  year: number,
  module: Module | string,
  day: Day | string,
  period: number
) {
  try {
    const data = await $nuxt.$api.timetables
      ._year(year)
      ._module(module)
      ._day(day)
      ._period(period)
      .$delete()
    return data
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return null
  }
}

export {
  getTimeTables,
  postLecture,
  postAllLectures,
  updateLecture,
  deleteLecture,
}
