import type { TimetableEntity } from '~/api/@types'

export interface S {
  timeTables: TimetableEntity[]
  isLogin: boolean
}

export interface G {
  table: TimetableEntity[]
  isLogin: boolean
}
export interface RG {
  'tableData/table': G['table']
  'tableData/isLogin': G['isLogin']
}

export interface M {
  SET_TABLE: TimetableEntity[]
  LOGIN: null
  LOGOUT: null
}
export interface RM {
  'TABLE_DATA/SET_TABLE': M['SET_TABLE']
  'TABLE_DATA/LOGIN': M['LOGIN']
  'TABLE_DATA/LOGOUT': M['LOGOUT']
}

export interface A {
  setTable: TimetableEntity[]
  login: null
  logout: null
}
export interface RA {
  'tableData/setTable': A['setTable']
  'tableData/login': A['login']
  'tableData/logout': A['logout']
}
