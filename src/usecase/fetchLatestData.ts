import { UseCase } from '.'
import { PortsPick } from 'adapter'
import { RegisteredCourse } from 'entity'

type R = PortsPick<'registeredCourses' | 'store'>
type A = RegisteredCourse[]

export class FetchLatestData implements UseCase<R, A> {
  async run({ registeredCourses, store }: R) {
    const courses = await registeredCourses.getRegisteredCourses()
    store.dispatch('tableData/setTable', courses)
    return courses
  }
}
