/* eslint-disable */
import * as Types from '../@types'

export type Methods = {
  post: {
    status: 200
    resBody: Types.OutputInformationData

    reqBody: {
      title?: string
      content?: string
      date?: string
      tag?: string
    }
  }

  get: {
    query?: {
      limit?: number
      offset?: number
    }

    status: 200
    resBody: Types.OutputInformationData[]
  }
}
