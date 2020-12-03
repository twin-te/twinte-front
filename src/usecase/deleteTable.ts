import { UseCase } from '.'
import { PortsPick } from '~/adapter'
import { YEAR } from '~/config'
import { TimetableEntity, UserLectureEntity } from '~/api/@types'

type R = PortsPick<'timeTable' | 'userLectures'>
type A = void

export class DeleteTable implements UseCase<R, A> {
  timeTable: TimetableEntity
  userLecture: UserLectureEntity
  year: number

  constructor(
    timeTable: TimetableEntity,
    userLecture: UserLectureEntity,
    year = YEAR
  ) {
    this.timeTable = timeTable
    this.userLecture = userLecture
    this.year = year
  }

  async run({ timeTable, userLectures }: R) {
    await timeTable.deleteLecture(this.year, this.timeTable)
    await userLectures.deleteUserData(this.userLecture.user_lecture_id)
  }
}
