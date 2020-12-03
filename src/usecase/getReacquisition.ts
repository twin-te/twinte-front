import { UseCase } from '.'
import { PortsPick } from '~/adapter'
import { CourseMethods } from 'entity'

type R = PortsPick<'courses'>
type A = CourseMethods

export class GetReacquision implements UseCase<R, A> {
  code: string

  constructor(code: string) {
    this.code = code
  }

  async run({ courses }: R) {
    const initialValue = await courses.searchSpecifyCourse(this.code)

    return initialValue?.methods ?? []
  }
}
