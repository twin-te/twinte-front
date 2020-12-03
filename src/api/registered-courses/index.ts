/* eslint-disable */
import * as Types from '../@types'

export type Methods = {
  get: {
    query: {
      year: number
    }

    status: 200
    resBody: Types.RegisteredCourse[]
  }

  post: {
    status: 200
    resBody: Types.RegisteredCourse

    reqBody:
      | {
          year: number
          code: string
        }
      | Types.RegisteredCourseWithoutID
  }
}
