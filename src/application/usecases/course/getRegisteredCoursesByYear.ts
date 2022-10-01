import { Ports } from "~/application/ports";
import { RegisteredCourse } from "~/domain/course";
import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";

export const getRegisteredCoursesByYear = ({ courseRepository }: Ports) => (
  year: number
): Promise<
  RegisteredCourse[] | UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.getRegisteredCoursesByYear(year);
};
