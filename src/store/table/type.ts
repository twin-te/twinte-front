import { Period } from '../../types'
import { UserLectureEntity } from '../../types/server'

export enum Module {
  SpringA = '春A',
  SpringB = '春B',
  SpringC = '春C',
  FallA = '秋A',
  FallB = '秋B',
  FallC = '秋C',
  SummerVacation = '夏季休業中',
  SpringVacation = '春季休業中',
  Annual = '通年',
  Unknown = '不明',
}

export interface S {
  moduleList: string[]
  module: string
  looking: Period | null
  userData: UserLectureEntity | null
}

export interface G {
  /**
   * 現在の学期を返す
   * @returns Module.SpringA etc...
   */
  module: string
  /**
   * 前の学期を返す
   */
  prevModule: string
  /**
   * 次の学期を返す
   */
  nextModule: string
  /**
   * 現在の学期の配列番号を返す、空の場合は0を返す
   */
  moduleNum: number
  /**
   * 直前にクリックした授業の座標を保持する
   */
  looking: Period | null
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
  setModule: { module: string }
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
  setLooking: { period: Period | null }
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
  setPeriod: { period: Period }
  updatePeriod: { userData: UserLectureEntity }
}
export interface RA {
  'table/setPeriod': A['setPeriod']
  'table/updatePeriod': A['updatePeriod']
}
