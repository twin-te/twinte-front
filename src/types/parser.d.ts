export interface Lecture {
  lectureID: string
  name: string
  details: {
    module: Module
    day: Day
    period: number
    room: string
  }[]
  instructor: string
}

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

export enum Day {
  Sun = '日',
  Mon = '月',
  Tue = '火',
  Wed = '水',
  Thu = '木',
  Fri = '金',
  Sat = '土',
  Unknown = '不明',
}
