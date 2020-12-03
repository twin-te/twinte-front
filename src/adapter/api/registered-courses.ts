import { RegisteredCourseWithoutID } from 'entity'
import { YEAR } from '~/config'

export class RegisteredCourses {
  /**
   * 時間割取得
   */
  async getRegisteredCourses(year = YEAR) {
    try {
      const data = await $nuxt.$api.registered_courses.$get({ query: { year } })
      return data
    } catch (error) {
      return []
    }
  }

  async getRegisteredCourse(id: string) {
    try {
      const data = await $nuxt.$api.registered_courses._id(id).$get()
      return data
    } catch (error) {
      return null
    }
  }

  /**
   * 講義を時間割に登録
   */
  async postRegisteredCourse(code: string, year = YEAR) {
    try {
      const data = await $nuxt.$api.registered_courses.$post({
        body: { year, code },
      })

      return data
    } catch (error) {
      return null
    }
  }

  /**
   * @param codes 授業番号の配列
   * @returns 授業詳細配列
   */
  async postRegisteredCourses(codes: string[], year = YEAR) {
    return await Promise.all(
      codes.map(async (code) => {
        return await this.postRegisteredCourse(code, year)
      })
    )
  }

  /**
   * 講義を追加/更新
   */
  async updateRegisteredCourse(
    id: string,
    registeredCources: RegisteredCourseWithoutID
  ) {
    try {
      const data = await $nuxt.$api.registered_courses
        ._id(id)
        .$put({ body: registeredCources })
      return data
    } catch (error) {
      return null
    }
  }

  /**
   * 講義の削除
   */
  async deleteRegisteredCourse(id: string) {
    try {
      const res = await $nuxt.$api.registered_courses._id(id).delete()
      return res.status === 204
    } catch (error) {
      return null
    }
  }
}
