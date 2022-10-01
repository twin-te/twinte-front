/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  post: {
    status: 200
    /** 成功 */
    resBody: Types.Course[]

    /** 検索クエリ */
    reqBody: {
      year: number
      /** 検索モード Cover 指定した時限と講義の開講日時が一部でも被っていれば対象とみなす Contain 指定した時限に収まっている講義のみ対象とみなす デフォルトはCover */
      searchMode?: 'Cover' | 'Contain'
      keywords: string[]
      codes?: string[]
      limit?: number
      offset?: number
      timetable?: Types.SearchCourseTimetableQuery
    }
  }
}
