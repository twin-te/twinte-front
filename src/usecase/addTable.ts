import { UseCase } from '.'
import { PortsPick } from '~/adapter'
import { YEAR } from '~/config'
import { RegisteredCourse } from 'entity'
import { FetchLatestData } from './fetchLatestData'

type R = PortsPick<'registeredCourses' | 'store'>
type A = (RegisteredCourse | null)[]

export class AddTable implements UseCase<R, A> {
  codes: string[]
  year: number

  constructor(codes: string[], year = YEAR) {
    this.codes = codes
    this.year = year
  }

  async run({ registeredCourses, store }: R) {
    await registeredCourses.postRegisteredCourses(this.codes, this.year)
    return new FetchLatestData().run({
      registeredCourses: registeredCourses,
      store: store,
    })
  }
}
