import './shims-vuex-impl'
import './shims-vuex-type'

// twinte-parser
import { TimetableEntity } from './server'
import { Day, Module } from './parser'

/** 時間割 */
type TimeTables = TimetableEntity[]
type Period = TimetableEntity

type OutputSearchData = {
  lectureCode: string
  name: string
  credits: number
  overview: string
  remarks: string
  type: number
  details: {
    id: number
    module: Module
    day: Day
    period: number
    room: string
  }[]
  instructor: string
  twinte_lecture_id: string
  year: number
  standardYear: number[]
}[]

type SubjectSettings = {
  lecture_name: boolean
  lecture_code: boolean
  instructor: boolean
  room: boolean
  font_size: 'small' | 'medium' | 'large'
}

export { Day, Module, TimeTables, Period, OutputSearchData, SubjectSettings }
