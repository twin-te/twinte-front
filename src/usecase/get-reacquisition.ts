import { Lecture } from '~/Infrastructure/lectures'
import { LazyUseCase } from './usecase'

type LectureFormat = 'Asynchronous' | 'Synchronous' | 'FaceToFace' | 'Others'

/** @type TimetableEntity.lecture_code */
type I = string
type O = LectureFormat[]
type E = never

type GetReacquisition = LazyUseCase<I, O, E>

export const getReacquision: GetReacquisition = async (
  lecture_code,
  lectureRepository: Lecture = new Lecture()
) => {
  const initialValue = await lectureRepository.searchLectures(lecture_code)
  return initialValue[0].formats
}
