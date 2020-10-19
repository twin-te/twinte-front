/* eslint-disable */
import * as Types from '../@types'

export type Methods = {
  get: {
    query?: {
      limit?: number
      offset?: number
    }

    status: 200
    resBody: Types.OutputInformationData[]
  }
}
