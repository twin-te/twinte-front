import { CourseModule, Day, RegisteredCourse } from 'entity'
import { UseCase } from '.'
import { PortsPick, RegisteredCourses } from '~/adapter'

type R = PortsPick<'store'>
type A = RegisteredCourse[]

export class GetCourse implements UseCase<R, A> {
  module: string
  day: string
  period: number

  constructor(module: CourseModule, day: Day, period: number) {
    this.module = module
    this.day = day
    this.period = period
  }

  async run({ store }: R) {
    const courses = store.getters['tableData/table']

    return courses.filter((course) => {
      const target = course.schedules.find(
        (schedule) =>
          schedule.day === this.day &&
          schedule.module === this.module &&
          schedule.period === this.period
      )
      return target instanceof RegisteredCourses
    })
  }
}
