import { RegisteredCourse } from "~/domain";
import { Result } from "~/domain/result";
import { Ports } from "../ports";

export const getCourseListByYear = ({ courseRepository }: Ports) => (
  year: number
): Promise<Result<RegisteredCourse[]>> => {
  return courseRepository.getCourseListByYear(year);
};
