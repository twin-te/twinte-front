import axios from 'axios'
import { Module, Day, Period } from '../../types'

const BASE_URL = 'https://dev.api.twinte.net'
const url = BASE_URL + '/timetables'

/**
 * 今日の時間割を取得
 */
async function getToday() {
  try {
    const { data } = await axios.post<Period[]>(`${url}/today`)
    return data
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return []
  }
}

/**
 * 特定の学期の時間割取得
 * @param module
 * @param year
 */
async function getTable(module: Module, year: number) {
  try {
    const { data } = await axios.post<Period[]>(`${url}/${year}/${module}`)
    return data
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return []
  }
}

/**
 * 全学期の時間割取得
 * @param year
 */
async function getTableAll(year: number) {
  try {
    const { data } = await axios.post<Period[]>(`${url}/${year}`)
    return data
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return []
  }
}

/**
 * 講義を時間割に登録
 * @param lectureID
 * @param year
 */
async function postLecture(lectureID: string, year: number) {
  try {
    const { data } = await axios.post<string>(`${url}/${year}`, {
      lectureID,
    })
    return data
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return "error"
  }
}

/** 作成するときの任意の時間割情報 */
interface CustomLecture {
  lectureID: string
  name: string
  instructor: string
  room: string
}

/**
 * 講義の作成/更新
 * @param year
 * @param module
 * @param day
 * @param period
 * @param body
 * {
 *   lectureID: string
 *   name: string
 *   instructor: string
 *   room: string
 * }
 */
async function createLecture(
  year: number,
  module: Module,
  day: Day,
  period: Period,
  body: CustomLecture
) {
  try {
    const { data } = await axios.post(
      `${url}/${year}/${module}/${day}/${period}`,
      {
        lectureID: body.lectureID,
        name: body.name,
        instructor: body.instructor,
        room: body.room,
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
  module: Module,
  day: Day,
  period: Period
) {
  try {
    const { data } = await axios.post(
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
  getToday,
  getTable,
  getTableAll,
  postLecture,
  createLecture,
  deleteLecture,
}
