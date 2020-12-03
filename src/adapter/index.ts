import Vuex from 'vuex'
import { Users } from './api/users'
import { Courses } from './api/courses'
import { RegisteredCourses } from './api/registered-courses'
import { SchoolCalendar } from './api/school-calendar'
import { Tags } from './api/tags'

export { Courses, RegisteredCourses, Users, SchoolCalendar }

export interface Ports {
  users: Users
  courses: Courses
  registeredCourses: RegisteredCourses
  schoolCalendar: SchoolCalendar
  tags: Tags
  store: Vuex.ExStore
}

export type PortsPick<T extends keyof Ports> = Pick<Ports, T>
