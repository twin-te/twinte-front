import { UseCase } from '.'
import { PortsPick } from '~/adapter'
import { LectureFormat } from '~/types'

type R = PortsPick<'lecture'>
type A = LectureFormat[]

export class GetReacquision implements UseCase<R, A> {
  /** @type TimetableEntity.lecture_code */
  lecture_code: string

  constructor(lecture_code: string) {
    this.lecture_code = lecture_code
  }

  async run({ lecture }: R) {
    const initialValue = await lecture.searchLectures(this.lecture_code)
    return initialValue[0].formats
  }
}
