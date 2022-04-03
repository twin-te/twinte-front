import { ICourseRepository } from "~/src/applications/ports/ICourseRepository";
import { Result, RegisterdCourse } from "~/src/entities/entities";

export const getCourseListByYear = ({
  courseRepository,
}: {
  courseRepository: ICourseRepository;
}) => async (year: number): Promise<Result<RegisteredCourse[]>> =>
  courseRepository.getCourseListByYear(year);
