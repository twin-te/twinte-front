/* eslint-disable */
import * as Types from '../@types'

export type Methods = {
  post: {
    status: 200
    resBody: Types.UserLectureEntity

    reqBody: {
      year?: number
      lectureCode?: string
    }
  }

  get: {
    query?: {
      year?: number
      module?:
        | '春A'
        | '春B'
        | '春C'
        | '秋A'
        | '秋B'
        | '秋C'
        | '夏季休業中'
        | '春季休業中'
        | '通年'
        | '不明'
      day?: '日' | '月' | '火' | '水' | '木' | '金' | '土' | '集中' | '不明'
      date?: string
    }

    status: 200
    resBody: Types.TimetableEntity[]
  }
}
