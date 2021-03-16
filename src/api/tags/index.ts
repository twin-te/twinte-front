/* eslint-disable */
import type * as Types from '../@types'

export type Methods = {
  get: {
    status: 200
    /** 成功 */
    resBody: Types.Tag[]
  }

  post: {
    status: 200
    /** 成功 */
    resBody: Types.Tag

    reqBody: {
      name: string
    }
  }
}
