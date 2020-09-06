import { OutputSearchData } from '../../types'

import { BASE_URL, axios, YEAR } from '../../common/config'
const url = BASE_URL + '/lectures'

/**
 * 授業名、科目番号等から該当する授業を返す
 * @param maybeLecture 検索された授業名
 * @param year 年度
 */
async function searchLectures(q: string, year = YEAR) {
  try {
    const { data } = await axios.get<OutputSearchData>(`${url}/search`, {
      params: {
        q,
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

export { searchLectures }
