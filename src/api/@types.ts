/* eslint-disable */
export type CourseMethods = ('対面' | 'オンライン' | 'オンデマンド' | '不明')[]

export type CourseModule =
  | '春A'
  | '春B'
  | '春C'
  | '夏季休業中'
  | '秋A'
  | '秋B'
  | '秋C'
  | '春季休業中'
  | '通年'
  | '不明'

export type CourseSchedule = {
  module: CourseModule
  day: Day
  period: number
  room: string
}

export type Day = '日' | '月' | '火' | '水' | '木' | '金' | '土'

export type SchoolCalendarEvent = {
  date: string
  eventType: '祝日' | '休日' | '試験' | '振替'
  description: string
  changeTo?: Day
}

export type SchoolCalendarModule = {
  year: number
  module:
    | '春A'
    | '春B'
    | '春C'
    | '夏季休業中'
    | '秋A'
    | '秋B'
    | '秋C'
    | '春季休業中'
  start: string
  end: string
}

export type Course = {
  courseID: string
  year: number
  code: string
  name: string
  instructor: string
  credit: number
  overview: string
  remarks: string
  recommendedGrades: number[]
  methods: CourseMethods
  schedules: CourseSchedule[]
}

export type RegisteredCourse = {
  registeredCourseID: string
  userID: string
  course?: Course
} & RegisteredCourseWithoutID

export type RegisteredCourseWithoutID = {
  year: number
  name: string
  instructor: string
  credit: number
  methods: CourseMethods
  schedules: CourseSchedule[]
  memo: string
  attendance: number
  absence: number
  late: number
  tags: Tag[]
}

export type Tag = {
  tagID: string
  userID: string
  name: string
}

export type User = {
  userID: string
  name: string
}
