import Swal from 'sweetalert2'
import union from 'lodash/union'

import { TimetableEntity } from '~/api/@types'
import { YEAR } from '~/config'

export class TimeTable {
  /**
   * 時間割取得
   * @param year
   */
  async getTimeTables(year = YEAR) {
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
  async postLecture(lectureCode: string, year = YEAR) {
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
  async postAllLectures(lectureCodes: string[], year = YEAR) {
    return await Promise.all(
      union(lectureCodes).map(async (lectureCode) => {
        return await this.postLecture(lectureCode, year)
      })
    )
  }

  /**
   * 講義を追加/更新
   */
  async updateLecture(lecture: TimetableEntity) {
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
   */
  async deleteLecture(year: number, timeTable: TimetableEntity) {
    try {
      const data = await $nuxt.$api.timetables
        ._year(year)
        ._module(timeTable.module)
        ._day(timeTable.day)
        ._period(timeTable.period)
        .$delete()
      return data
    } catch (error) {
      const { status, statusText } = error.response
      console.log(`Error! HTTP Status: ${status} ${statusText}`)
      return null
    }
  }
}
