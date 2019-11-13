import { Lecture } from './server'

/** [module][x: day][y: period] */
export type LecturesAnual = Lecture[][][]
/** [x: day][y: period] */
export type LecturesModule = Lecture[][]
