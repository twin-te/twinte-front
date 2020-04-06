import { Period } from '../../types'
import { BASE_URL, axios, YEAR } from '../../common/config'
const url = BASE_URL + '/timetables'
import union from 'lodash/union'

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
    const { data } = await axios.get<Period[]>(`${url}`, {
      params: {
        year,
      },
    })
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
    const { data } = await axios.post<any>(`${url}`, {
      year,
      lectureCode,
    })
    return data // 利用する予定はない
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return null
  }
}

/**
 * @param lectureCodes 授業番号の配列
 * @returns 授業詳細配列
 */
async function postAllLectures(
  lectureCodes: string[],
  year = YEAR
): Promise<void> {
  await Promise.all(
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
    const { data } = await axios.put(
      `${url}/${year}/${module}/${day}/${period}`,
      {
        room,
        user_lecture_id,
      }
    )
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
    const { data } = await axios.delete(
      `${url}/${year}/${module}/${day}/${period}`
    )
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
