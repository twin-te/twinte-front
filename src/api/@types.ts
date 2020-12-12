/* eslint-disable */
export type Day =
  | '日'
  | '月'
  | '火'
  | '水'
  | '木'
  | '金'
  | '土'
  | '集中'
  | '不明'
export type Module =
  | '春A'
  | '春B'
  | '春C'
  | '秋A'
  | '秋B'
  | '秋C'
  | '夏季休業中'
  | '春季休業中'
  | '通年'
  | '不明'

export type OutputInformationData = {
  id: string
  title: string
  content: string
  date: string
}

export type UserLectureEntity = {
  user_lecture_id: string
  year: number
  attendance: number
  absence: number
  late: number
  memo: string
  lecture_name: string
  instructor: string
  credits: number
  formats: ('Asynchronous' | 'Synchronous' | 'FaceToFace' | 'Others')[]
}

export type Payment = {
  type: 'OneTime' | 'Subscription'
  id: string
  amount: number
  status: 'succeeded' | 'canceled' | 'pending'
}

export type User = {
  twinte_user_id: string
  twinte_username: string
  authentications: UserAuthentication[]
}

export type UserAuthentication = {
  id: number
  provider: 'twitter' | 'google' | 'apple'
  social_id: string
  social_username: string
  social_display_name: string
  access_token: string
  refresh_token: string
  user: User
}

export type PaymentUser = {
  payment_user_id: string
  user: User
}

export type Plan = {
  plan_id: string
  name: string
  amount: number
  interval: 'day' | 'week' | 'month' | 'year'
}

export type Subscription = {
  subscription_id: string
  paymentUser: PaymentUser
  plan: Plan[]
  status: 'active' | 'pending' | 'canceled'
  start_at: number
}

export type OutputSubstituteDay = {
  date: string
  change_to: '日' | '月' | '火' | '水' | '木' | '金' | '土' | '集中' | '不明'
}

export type OutputEvent = {
  description: string
  event_type: '休日' | '祝日' | '試験' | '振替授業日'

  metadata?: {}

  date: string
}

export type OutputSchoolCalender = {
  event?: OutputEvent
  substituteDay?: OutputSubstituteDay
  module?:
    | '春A'
    | '春B'
    | '春C'
    | '秋A'
    | '秋B'
    | '秋C'
    | '夏季休業中'
    | '春季休業中'
    | '通年'
    | '不明'
}

export type TimetableEntity = {
  lecture_name: string
  lecture_code?: string
  instructor: string
  formats: ('Asynchronous' | 'Synchronous' | 'FaceToFace' | 'Others')[]
  year: number
  module:
    | '春A'
    | '春B'
    | '春C'
    | '秋A'
    | '秋B'
    | '秋C'
    | '夏季休業中'
    | '春季休業中'
    | '通年'
    | '不明'
  day: '日' | '月' | '火' | '水' | '木' | '金' | '土' | '集中' | '不明'
  period: number
  room: string
  user_lecture_id: string
}

export type OutputPeriodData = {
  lecture_code: string
  lecture_name: string
  instructor: string
  year: number
  module:
    | '春A'
    | '春B'
    | '春C'
    | '秋A'
    | '秋B'
    | '秋C'
    | '夏季休業中'
    | '春季休業中'
    | '通年'
    | '不明'
  day: '日' | '月' | '火' | '水' | '木' | '金' | '土' | '集中' | '不明'
  period: number
  room: string
  user_lecture_id: string
}

export type UserEntity = {
  twinte_user_id: string
  twinte_username: string
}
