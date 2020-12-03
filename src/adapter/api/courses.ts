import { YEAR } from '~/config'

export class Courses {
  async searchCourses() {
    try {
      const data = await $nuxt.$api.courses.search.$post()
      return data
    } catch (error) {
      return []
    }
  }

  async searchSpecifyCourse(code: string, year = YEAR) {
    try {
      const data = await $nuxt.$api.courses._year(year)._code(code).$get()
      return data
    } catch (error) {
      return null
    }
  }
}
