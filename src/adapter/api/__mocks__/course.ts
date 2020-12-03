import { YEAR } from '~/config'
import { Users } from '../users'

export class Courses {
  async searchCourses() {
    if (await new Users().isLogin()) {
      return [
        {
          courceID: 'string1',
          year: 2020,
          code: 'string1',
          name: 'string1',
          instructor: 'string1',
          credit: 1,
          overview: 'string1',
          remarks: 'string1',
          recommendedGrades: [],
          methods: '不明',
          schedules: [],
        },
        {
          courceID: 'string2',
          year: 2020,
          code: 'string2',
          name: 'string2',
          instructor: 'string2',
          credit: 2,
          overview: 'string2',
          remarks: 'string2',
          recommendedGrades: [],
          methods: '不明',
          schedules: [],
        },
      ]
    } else {
      return []
    }
  }

  async searchSpecifyCourse(code: string, year = YEAR) {
    if (await new Users().isLogin()) {
      return {
        courceID: 'string',
        year,
        code,
        name: 'string',
        instructor: 'string',
        credit: 1,
        overview: 'string',
        remarks: 'string',
        recommendedGrades: [],
        methods: '不明',
        schedules: [],
      }
    } else {
      return null
    }
  }
}
