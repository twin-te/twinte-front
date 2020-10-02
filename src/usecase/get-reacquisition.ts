import { searchLectures } from '~/store/api/lectures'
import { LectureFormat } from '~/types/server'
import { LazyUseCase } from './usecase'

/** @type TimetableEntity.lecture_code */
type I = string
type O = LectureFormat[]
type E = never

type GetReacquisition = LazyUseCase<I, O, E>

export const getReacquision: GetReacquisition = async (lecture_code) => {
  const initialValue = await searchLectures(lecture_code)
  return initialValue[0].formats
}
