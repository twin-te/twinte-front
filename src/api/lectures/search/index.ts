/* eslint-disable */
import * as Types from '../../@types'

export type Methods = {
  get: {
    query: {
      q: string
      year: number
    }

    status: 200
    resBody: Types.UserLectureEntity[]
  }
}
