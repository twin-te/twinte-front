/* eslint-disable */
export type CourseMethod = 'FaceToFace' | 'Synchronous' | 'Asynchronous' | 'Others'

export type CourseModule = 'SpringA' | 'SpringB' | 'SpringC' | 'SummerVacation' | 'FallA' | 'FallB' | 'FallC' | 'SpringVacation' | 'Unknown'

export type CourseSchedule = {
  module: CourseModule
  day: Day
  period: number
  room: string
}

export type Day = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Intensive' | 'Appointment' | 'AnyTime' | 'Unknown'

export type SchoolCalendarEvent = {
  date: string
  eventType: 'PublicHoliday' | 'Holiday' | 'Exam' | 'SubstituteDay' | 'Other'
  description: string
  changeTo?: Day
}

export type SchoolCalendarModule = {
  /** 年度 */
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
  userId: string
  course?: Course
} & RegisteredCourseWithoutID

export type SearchCourseTimetableQuery = {
  SpringA: SearchCourseTimetableQueryDays
  SpringB: SearchCourseTimetableQueryDays
  SpringC: SearchCourseTimetableQueryDays
  FallA: SearchCourseTimetableQueryDays
  FallB: SearchCourseTimetableQueryDays
  FallC: SearchCourseTimetableQueryDays
  SummerVacation: SearchCourseTimetableQueryDays
  SpringVacation: SearchCourseTimetableQueryDays
}

export type SearchCourseTimetableQueryDays = {
  Sun: SearchCourseTimetableQueryPeriods
  Mon: SearchCourseTimetableQueryPeriods
  Tue: SearchCourseTimetableQueryPeriods
  Wed: SearchCourseTimetableQueryPeriods
  Thu: SearchCourseTimetableQueryPeriods
  Fri: SearchCourseTimetableQueryPeriods
  Sat: SearchCourseTimetableQueryPeriods
  Intensive: SearchCourseTimetableQueryPeriods
  Appointment: SearchCourseTimetableQueryPeriods
  AntTime: SearchCourseTimetableQueryPeriods
}

/** 指定しなかった場合はfalseとみなされます */
export type SearchCourseTimetableQueryPeriods = {
  /** 時限が不明な授業は0になっているためそれらも検索したい場合はtrueに（集中授業に多い） */
  '0': boolean
  '1': boolean
  '2': boolean
  '3': boolean
  '4': boolean
  '5': boolean
  '6': boolean
  '7': boolean
  '8': boolean
}

export type RegisteredCourseWithoutID = {
  year: number
  name?: string
  instructor?: string
  credit?: number
  methods?: CourseMethod[]
  schedules?: CourseSchedule[]
  memo: string
  attendance: number
  absence: number
  late: number
  tags: TagIdOnly[]
}

export type Tag = {
  id: string
  userId: string
  name: string
}

export type TagIdOnly = {
  id: string
}

export type User = {
  id: string
  name: string
}

export type Payment = {
  id: string
  type: 'OneTime' | 'Subscription'
  status: 'Succeeded' | 'Canceled' | 'Pending'
  amount: number
  created: string
}

export type Subscription = {
  id: string
  status: 'Active' | 'Canceled'
  plans: {
    id: string
    name: string
    amount: number
  }[]
  created: string
}

export type PaymentUser = {
  paymentUserId: string
  twinteUserId: string
  displayName?: string
  link?: string
}

export type Information = {
  id: string
  title: string
  content: string
  publishedAt: string
}

export type Error = {
  message: string
}
