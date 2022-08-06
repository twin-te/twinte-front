import { RegisteredCourse } from "~/domain";
import { PromiseResult } from "~/domain/result";
import { Ports } from "../ports";

export const getCourseListByYear = ({ courseRepository }: Ports) => (
  year: number
): PromiseResult<RegisteredCourse[]> => {
  return courseRepository.getCourseListByYear(year);
};
