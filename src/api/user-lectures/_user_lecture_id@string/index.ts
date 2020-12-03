/* eslint-disable */
import * as Types from '../../@types'

export type Methods = {
  get: {
    status: 200
    resBody: Types.UserLectureEntity
  }

  put: {
    status: 200
    resBody: Types.UserLectureEntity
    reqBody: Types.UserLectureEntity
  }

  delete: {
    status: 204
  }
}
