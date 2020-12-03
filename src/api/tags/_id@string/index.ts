/* eslint-disable */
import * as Types from '../../@types'

export type Methods = {
  put: {
    status: 200
    resBody: Types.Tag

    reqBody: {
      name: string
    }
  }

  delete: {
    status: 204
  }
}
