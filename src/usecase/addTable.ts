import { UseCase } from '.'
import { PortsPick } from '~/adapter'
import { YEAR } from '~/config'
import { UserLectureEntity } from '~/api/@types'

type R = PortsPick<'timeTable'>
type A = (UserLectureEntity | null)[]

export class AddTable implements UseCase<R, A> {
  /** @type TimetableEntity.lecture_code */
  lecture_codes: string[]
  year: number

  constructor(lecture_codes: string[], year = YEAR) {
    this.lecture_codes = lecture_codes
    this.year = year
  }

  async run({ timeTable }: R) {
    return await timeTable.postAllLectures(this.lecture_codes, this.year)
  }
}
