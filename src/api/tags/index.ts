/* eslint-disable */
import * as Types from '../@types'

export type Methods = {
  get: {
    status: 200
    resBody: Types.Tag
  }

  post: {
    status: 200
    resBody: Types.Tag

    reqBody: {
      name: string
    }
  }
}
