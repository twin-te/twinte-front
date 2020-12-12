import type { Module, TimetableEntity, UserLectureEntity } from '~/api/@types'

export interface S {
  timeTables: TimetableEntity[]
  isLogin: boolean
  moduleList: Module[]
  module: Module
  looking: TimetableEntity | null
  userData: UserLectureEntity | null
}

export interface G {
  table: TimetableEntity[]
  isLogin: boolean
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
  'tableData/table': G['table']
  'tableData/isLogin': G['isLogin']
  'tableData/module': G['module']
  'tableData/prevModule': G['prevModule']
  'tableData/nextModule': G['prevModule']
  'tableData/moduleNum': G['moduleNum']
  'tableData/looking': G['looking']
  'tableData/userData': G['userData']
}

export interface M {
  SET_TABLE: TimetableEntity[]
  LOGIN: null
  LOGOUT: null
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
  'TABLE_DATA/SET_TABLE': M['SET_TABLE']
  'TABLE_DATA/LOGIN': M['LOGIN']
  'TABLE_DATA/LOGOUT': M['LOGOUT']
  'tableData/setModule': M['setModule']
  'tableData/prevModule': M['prevModule']
  'tableData/nextModule': M['nextModule']
  'tableData/setLooking': M['setLooking']
  'tableData/setUserData': M['setUserData']
}

export interface A {
  setTable: TimetableEntity[]
  login: null
  logout: null
  setPeriod: { period: TimetableEntity }
  updatePeriod: { userData: UserLectureEntity }
}
export interface RA {
  'tableData/setTable': A['setTable']
  'tableData/login': A['login']
  'tableData/logout': A['logout']
  'tableData/setPeriod': A['setPeriod']
  'tableData/updatePeriod': A['updatePeriod']
}
