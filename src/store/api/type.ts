import { TimeTables, Module, Day, Period } from '../../types/index'

export interface S {
  timeTables: TimeTables
  isLogin: boolean
}

export interface G {
  table: TimeTables
  isLogin: boolean
}
export interface RG {
  "api/table": G["table"];
  "api/isLogin": G["isLogin"];
}

export interface M {
  CREATE_TABLE: { periods: TimeTables }
  DELETE_TABLE: { period: Period }

  LOGIN: null
  LOGOUT: null
}
export interface RM {
  "API/CREATE_TABLE": M["CREATE_TABLE"];
  "API/DELETE_TABLE": M["DELETE_TABLE"];
  "API/LOGIN": M["LOGIN"];
  "API/LOGOUT": M["LOGOUT"];
}

export interface A {
  addTable: { lectureIds: string[] }
  deleteTable: { module: Module, day: Day, period: Period }
  asyncCSV: { fileData: any }

  login: null
  logout: null
}
export interface RA {
  "api/addTable": A["addTable"];
  "api/deleteTable": A["deleteTable"];
  "api/asyncCSV": A["asyncCSV"];
  "api/login": A["login"];
  "api/logout": A["logout"];
}
