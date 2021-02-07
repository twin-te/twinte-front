/* eslint-disable */
export type CourseMethod = 'FaceToFace' | 'Synchronous' | 'Asynchronous' | 'Others'

export type CourseModule = 'SpringA' | 'SpringB' | 'SpringC' | 'SummerVacation' | 'FallA' | 'FallB' | 'FallC' | 'SpringVacation' | 'Annual' | 'Unknown'

export type CourseSchedule = {
  module: CourseModule
  day: Day
  period: number
  room: string
}

export type Day = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Intensive' | 'Appointment' | 'AnyTime' | 'Unknown'

export type SchoolCalendarEvent = {
  date: string
  eventType: 'PublicHoliday' | 'Holiday' | 'Exam' | 'SubstituteDay'
  description: string
  changeTo?: Day
}

export type SchoolCalendarModule = {
  year: number
  module: 'SpringA' | 'SpringB' | 'SpringC' | 'SummerVacation' | 'FallA' | 'FallB' | 'FallC' | 'SpringVacation'
  start: string
  end: string
}

export type Course = {
  id: string
  year: number
  code: string
  name: string
  instructor: string
  credit: number
  overview: string
  remarks: string
  recommendedGrades: number[]
  methods: CourseMethod[]
  schedules: CourseSchedule[]
}

export type RegisteredCourse = {
  id: string
  userID: string
  course?: Course
} & RegisteredCourseWithoutID

export type RegisteredCourseWithoutID = {
  year: number
  name: string
  instructor: string
  credit: number
  methods: CourseMethod[]
  schedules: CourseSchedule[]
  memo: string
  attendance: number
  absence: number
  late: number
  tags: TagIdOnly[]
}

export type Tag = {
  id: string
  userID: string
  name: string
}

export type TagIdOnly = {
  id: string
}

export type User = {
  id: string
  name: string
}

export type Error = {
  message: string
}
