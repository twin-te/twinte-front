import axios from 'axios'
import { BASE_URL } from '.'

const url = BASE_URL + '/lectures'

/**
 * 授業名（ `maybeLecture` ）から該当する授業を返す
 * @param maybeLecture 検索された授業名
 * @param year 年度（ default = 2019 ）
 */
async function searchLectures(maybeLecture: string, year: number = 2019) {
  const q = maybeLecture
  try {
    const { data } = await axios.get(`${url}/search`, {
      params: {
        q,
        year,
      },
    })
    return data
  } catch(error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return null
  }
}

/**
 * ID（ `maybeId` ）から授業を検索して返す
 * @param maybeId 検索されたID
 * @param year 年度（ default = 2019 ）
 */
async function getLectureById(maybeId: string, year: number = 2019) {
  try {
    const { data } = await axios.get(`${url}/${year}/${maybeId}`)
    return data
  } catch {
    return null
  }
}

export { searchLectures, getLectureById }
