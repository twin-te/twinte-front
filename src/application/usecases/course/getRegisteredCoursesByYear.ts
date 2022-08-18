import { Ports } from "~/application/ports";
import { RegisteredCourse } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/result";

export const getRegisteredCoursesByYear = ({ courseRepository }: Ports) => (
  year: number
): Promise<
  RegisteredCourse[] | UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.getRegisteredCoursesByYear(year);
};
