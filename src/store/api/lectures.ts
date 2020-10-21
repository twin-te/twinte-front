import { YEAR } from '~/config'
import { UserLectureEntity } from '~/api/@types'

/**
 * 授業名、科目番号等から該当する授業を返す
 * @param maybeLecture 検索された授業名
 * @param year 年度
 */
async function searchLectures(
  q: string,
  year = YEAR
): Promise<UserLectureEntity[]> {
  try {
    const data = await $nuxt.$api.lectures.search.$get({ query: { q, year } })
    return data
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return []
  }
}

export { searchLectures }
