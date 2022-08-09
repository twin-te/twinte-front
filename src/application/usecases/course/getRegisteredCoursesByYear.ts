import { Ports } from "~/application/ports";
import { RegisteredCourse } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export const getRegisteredCoursesByYear = ({ courseRepository }: Ports) => (
  year: number
): PromiseResult<
  RegisteredCourse[],
  UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.getRegisteredCoursesByYear(year);
};
