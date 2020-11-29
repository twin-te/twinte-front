import type { UserLectureEntity, TimetableEntity } from '~/api/@types'
import type { Module } from '~/types'

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
  'pageState/module': G['module']
  'pageState/prevModule': G['prevModule']
  'pageState/nextModule': G['prevModule']
  'pageState/moduleNum': G['moduleNum']
  'pageState/looking': G['looking']
  'pageState/userData': G['userData']
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
  'pageState/setModule': M['setModule']
  'pageState/prevModule': M['prevModule']
  'pageState/nextModule': M['nextModule']
  'pageState/setLooking': M['setLooking']
  'pageState/setUserData': M['setUserData']
}

export interface A {
  setPeriod: { period: TimetableEntity }
  updatePeriod: { userData: UserLectureEntity }
}
export interface RA {
  'pageState/setPeriod': A['setPeriod']
  'pageState/updatePeriod': A['updatePeriod']
}
