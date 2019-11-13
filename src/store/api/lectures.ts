import axios from 'axios'
import { Period, Lecture } from '../../types/index'

const BASE_URL = 'https://dev.api.twinte.net'
const url = BASE_URL + '/lectures'

/**
 * 授業名（ `maybeLecture` ）から該当する授業を返す
 * @param maybeLecture 検索された授業名
 * @param year 年度
 */
async function searchLectures(maybeLecture: string, year: number) {
  const q = maybeLecture
  try {
    const { data } = await axios.get<Period>(`${url}/search`, {
      params: {
        q,
        year,
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
 * ID（ `maybeId` ）から授業を検索して返す
 * @param maybeId 検索されたID
 * @param year 年度
 */
async function getLectureById(maybeId: string, year: number) {
  try {
    const { data } = await axios.get<Lecture>(`${url}/${year}/${maybeId}`)
    return data
  } catch {
    return null
  }
}

export { searchLectures, getLectureById }
