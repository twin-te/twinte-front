import { Auth } from './api/auth'
import { Information } from './api/information'
import { Lecture } from './api/lectures'
import { SchoolCalendar } from './api/school-calendar'
import { TimeTable } from './api/timetables'
import { UserLectures } from './api/user-lectures'

export { Auth, Information, Lecture, SchoolCalendar, TimeTable, UserLectures }

export interface Ports {
  auth: Auth
  information: Information
  lecture: Lecture
  schoolCalendar: SchoolCalendar
  timeTable: TimeTable
  userLectures: UserLectures
}

export type PortsPick<T extends keyof Ports> = Pick<Ports, T>
