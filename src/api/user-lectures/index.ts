/* eslint-disable */
import * as Types from '../@types'

export type Methods = {
  post: {
    status: 200
    resBody: Types.UserLectureEntity

    reqBody: {
      year: number
      lecture_name: string
      instructor: string
      credits: number
      formats: ('Asynchronous' | 'Synchronous' | 'FaceToFace' | 'Others')[]
    }
  }

  get: {
    query?: {
      year?: number
    }

    status: 200
    resBody: Types.UserLectureEntity
  }
}
