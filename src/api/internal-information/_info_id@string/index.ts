/* eslint-disable */
import * as Types from '../../@types'

export type Methods = {
  put: {
    status: 200
    resBody: Types.OutputInformationData

    reqBody: {
      title?: string
      content?: string
      date?: string
      tag?: string
    }
  }

  delete: {
    status: 204
  }
}
