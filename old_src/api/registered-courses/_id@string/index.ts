/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  get: {
    status: 200
    /** 成功 */
    resBody: Types.RegisteredCourse
  }

  put: {
    status: 200
    /** 成功 */
    resBody: Types.RegisteredCourse

    reqBody: {
      course: {
        id: string
      }
    } & Types.RegisteredCourseWithoutID
  }

  delete: {
    status: 204
  }
}
