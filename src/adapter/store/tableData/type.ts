import type { CourseModule, RegisteredCourse } from 'entity'

export interface S {
  timeTables: RegisteredCourse[]
  isLogin: boolean
  moduleList: CourseModule[]
  module: CourseModule
  looking: RegisteredCourse | null
}

export interface G {
  table: RegisteredCourse[]
  isLogin: boolean
  /**
   * 現在の学期を返す
   * @returns Module.SpringA etc...
   */
  module: CourseModule
  /**
   * 前の学期を返す
   */
  prevModule: CourseModule
  /**
   * 次の学期を返す
   */
  nextModule: CourseModule
  /**
   * 現在の学期の配列番号を返す、空の場合は0を返す
   */
  moduleNum: number
  /**
   * 直前にクリックした授業の座標を保持する
   */
  looking: RegisteredCourse | null
}
export interface RG {
  'tableData/table': G['table']
  'tableData/isLogin': G['isLogin']
  'tableData/module': G['module']
  'tableData/prevModule': G['prevModule']
  'tableData/nextModule': G['prevModule']
  'tableData/moduleNum': G['moduleNum']
  'tableData/looking': G['looking']
}

export interface M {
  SET_TABLE: RegisteredCourse[]
  LOGIN: null
  LOGOUT: null
  setModule: { module: CourseModule }
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
  setLooking: { period: RegisteredCourse | null }
}
export interface RM {
  'TABLE_DATA/SET_TABLE': M['SET_TABLE']
  'TABLE_DATA/LOGIN': M['LOGIN']
  'TABLE_DATA/LOGOUT': M['LOGOUT']
  'tableData/setModule': M['setModule']
  'tableData/prevModule': M['prevModule']
  'tableData/nextModule': M['nextModule']
  'tableData/setLooking': M['setLooking']
}

export interface A {
  setTable: RegisteredCourse[]
  login: null
  logout: null
}
export interface RA {
  'tableData/setTable': A['setTable']
  'tableData/login': A['login']
  'tableData/logout': A['logout']
}
