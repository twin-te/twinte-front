/* eslint-disable */
import * as Types from '../../../../../@types'

export type Methods = {
  get: {
    status: 200
    resBody: Types.OutputPeriodData
  }

  put: {
    status: 200
    resBody: Types.OutputPeriodData

    reqBody: {
      room?: string
      user_lecture_id?: string
    }
  }

  delete: {
    status: 200
  }
}
