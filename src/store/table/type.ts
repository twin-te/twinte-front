import type { UserLectureEntity, TimetableEntity } from '~/api/@types'

export type Module =
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

export interface S {
  moduleList: Module[]
  module: Module
  looking: TimetableEntity | null
  userData: UserLectureEntity | null
}

export interface G {
  /**
   * 現在の学期を返す
   * @returns Module.SpringA etc...
   */
  module: Module
  /**
   * 前の学期を返す
   */
  prevModule: Module
  /**
   * 次の学期を返す
   */
  nextModule: Module
  /**
   * 現在の学期の配列番号を返す、空の場合は0を返す
   */
  moduleNum: number
  /**
   * 直前にクリックした授業の座標を保持する
   */
  looking: TimetableEntity | null
  userData: UserLectureEntity | null
}
export interface RG {
  'table/module': G['module']
  'table/prevModule': G['prevModule']
  'table/nextModule': G['prevModule']
  'table/moduleNum': G['moduleNum']
  'table/looking': G['looking']
  'table/userData': G['userData']
}
export interface M {
  setModule: { module: Module }
  /**
   * @description 前の学期を返す
   */
  prevModule: void
  /**
   * @description 次の学期を返す
   */
  nextModule: void
  /**
   * 直前にクリックした授業の内容を更新
   */
  setLooking: { period: TimetableEntity | null }
  setUserData: { userData: UserLectureEntity | null }
}
export interface RM {
  'table/setModule': M['setModule']
  'table/prevModule': M['prevModule']
  'table/nextModule': M['nextModule']
  'table/setLooking': M['setLooking']
  'table/setUserData': M['setUserData']
}

export interface A {
  setPeriod: { period: TimetableEntity }
  updatePeriod: { userData: UserLectureEntity }
}
export interface RA {
  'table/setPeriod': A['setPeriod']
  'table/updatePeriod': A['updatePeriod']
}
