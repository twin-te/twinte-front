export interface Table {
  classroom: string
  name: string
  number: string
  season: string
  teacher: string
  time: string
}
/** [module][x][y] */
export type UserTableData = Table[][][]
/** [x][y] */
export type ModuleData = Table[][]
