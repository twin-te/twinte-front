import type { TimetableEntity } from '~/api/@types'
import { UserLectureEntity } from '@/types/server'

export interface S {
  timeTables: TimetableEntity[]
  isLogin: boolean
}

export interface G {
  table: TimetableEntity[]
  isLogin: boolean
}
export interface RG {
  'api/table': G['table']
  'api/isLogin': G['isLogin']
}

export interface M {
  SET_TABLE: { periodDatas: TimetableEntity[] }

  LOGIN: null
  LOGOUT: null
}
export interface RM {
  'API/SET_TABLE': M['SET_TABLE']
  'API/LOGIN': M['LOGIN']
  'API/LOGOUT': M['LOGOUT']
}

export interface A {
  addTable: { lectureCodes: string[] }
  deleteTable: {
    table: TimetableEntity
    UserLecture: UserLectureEntity
  }
  fetch: null

  login: null
  logout: null
}
export interface RA {
  'api/addTable': A['addTable']
  'api/deleteTable': A['deleteTable']
  'api/fetch': A['fetch']
  'api/login': A['login']
  'api/logout': A['logout']
}
