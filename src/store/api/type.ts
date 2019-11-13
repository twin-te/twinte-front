import { TimeTables, Lecture } from '../../types/index'

export interface S {
  timeTables: TimeTables
  isLogin: boolean
}

export interface G {
  table: TimeTables
  isLogin: boolean
}
export interface RG {
}

export interface M {
  CREATE_TABLE: { lectures: TimeTables }
  DELETE_TABLE: { lecture: Lecture }

  LOGIN: null
  LOGOUT: null
}
export interface RM {
}

export interface A {
  addTable: { lectureId: string[] }
  deleteTable: { lectureId: string }
  asyncCSV: { fileData: any }

  login: null
  logout: null
}
export interface RA {
}
