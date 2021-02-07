/* eslint-disable */
import * as Types from '../../@types'

export type Methods = {
  get: {
    status: 200
    resBody: Types.RegisteredCourse
  }

  put: {
    status: 200
    resBody: Types.RegisteredCourse
    reqBody: Types.RegisteredCourseWithoutID
  }

  delete: {
    status: 204
  }
}
