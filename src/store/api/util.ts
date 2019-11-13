import { getLectureById } from './lectures'
import union from 'lodash/union'

import { Lecture } from '../../types/index'

/**
 * @param data 授業番号の配列
 * @returns 授業詳細配列
 */
async function fetchLectures(
  data: string[],
  year: number
): Promise<(Lecture | null)[]> {
  const unionData = await Promise.all(
    union(data).map(async (id) => {
      return await getLectureById(id, year)
    })
  )
  return unionData.filter((d) => d)
}

export { fetchLectures }
