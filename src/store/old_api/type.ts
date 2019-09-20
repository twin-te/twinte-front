export interface Table {
  classroom: string
  name: string
  number: string
  season: string
  teacher: string
  time: string
  attend: number
  absent: number
  memo: string
}
;[]
export type ResponseData = Table[][]

// state______________________________________________________
//
export interface S {
  data: Table[][][] | null
  list_number: string[][]
  moduleList: string[]
}
// getters______________________________________________________
//
export interface G {
  data: Table[][][] | null
  list_number: string[][] | null
  isLogin: boolean
}
export interface RG {
  'old_api/data': G['data']
  'old_api/list_number': G['list_number']
  'old_api/isLogin': G['isLogin']
}
// mutations
//
export interface M {
  updateTable: { module: string; data: Table[][] }
  pushNumber: { module: string; data: string[] }
  updateTableAll: { data: Table[][][] | null }
  pushNumberAll: { data: string[][] | null }
}
export interface RM {
  'old_api/updateTable': M['updateTable']
  'old_api/pushNumber': M['pushNumber']
  'old_api/updateTableAll': M['updateTableAll']
  'old_api/pushNumberAll': M['pushNumberAll']
}
// actions______________________________________________________
//
export interface A {
  /**
   * 番号での追加
   * @param module api基準 "haruA"
   */
  asyncNumber: { number: string[]; module: string }
  /**
   * CSVでの追加
   * @param module api基準 "haruA"
   */
  asyncCSV: { formData: any; config: any; module: string }
  /**
   * moduleNum学期に
   * attend: 0, absent: 0, memo: '' を追加
   */
  assignObj: { moduleNum: number }
  login: null
  logout: null
}
export interface RA {
  'old_api/asyncNumber': A['asyncNumber']
  'old_api/asyncCSV': A['asyncCSV']
  'old_api/assignObj': A['assignObj']
  'old_api/login': A['login']
  'old_api/logout': A['logout']
}
