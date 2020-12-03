import { UseCase } from '.'
import { PortsPick } from '~/adapter'
import { FetchLatestData } from './fetchLatestData'
import { RegisteredCourse } from 'entity'

type R = PortsPick<'registeredCourses' | 'store'>
type A = RegisteredCourse[]

export class DeleteTable implements UseCase<R, A> {
  id: string

  constructor(id: string) {
    this.id = id
  }

  async run({ registeredCourses, store }: R) {
    await registeredCourses.deleteRegisteredCourse(this.id)
    return new FetchLatestData().run({
      registeredCourses: registeredCourses,
      store: store,
    })
  }
}
