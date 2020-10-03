// https://github.com/twin-te/twinte-server/blob/develop/src/entity
import { Day, Module } from 'twinte-parser'

/**
 * 出欠などのユーザーデータ構造
 * カスタム時間割にはtwinte_lecture_idは存在しない
 * @post /user-lectures/
 * @get /user-lectures/{user_lecture_id}
 * @put /user-lectures/{user_lecture_id}
 * @post /timetables/
 */
export interface UserLectureEntity {
  twinte_lecture_id?: string
  user_lecture_id: string
  attendance: number
  absence: number
  late: number
  memo: string
  lecture_name: string
  instructor: string
  credits: number
  formats: LectureFormat[]
}

export interface PeriodEntity {
  year: number
  module: Module
  day: Day
  period: number
  room: string
  user_lecture_id: string
}

export type LectureFormat =
  | 'Asynchronous'
  | 'Synchronous'
  | 'FaceToFace'
  | 'Others'

/**
 * 授業データ構造
 * @get /timetables/
 * @get /timetables/{year}/{module}/{day}/{period}
 * @post /timetables​/{year}​/{module}​/{day}​/{period}
 */
export interface TimetableEntity extends PeriodEntity {
  lecture_name: string
  lecture_code?: string
  instructor: string
  formats: LectureFormat[]
}
