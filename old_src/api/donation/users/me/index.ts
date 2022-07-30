/* eslint-disable */
import type * as Types from '../../../@types'

export type Methods = {
  get: {
    status: 200
    /** 成功 */
    resBody: Types.PaymentUser
  }

  patch: {
    status: 200
    /** 成功 */
    resBody: Types.PaymentUser

    reqBody: {
      displayName: string
      link: string
    }
  }
}
