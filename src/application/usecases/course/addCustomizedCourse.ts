import { Ports } from "~/application/ports";
import { RegisteredCourse } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export const addCustomizedCourse = ({ courseRepository }: Ports) => (
  course: Omit<RegisteredCourse, "id" | "code">
): PromiseResult<
  RegisteredCourse,
  UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.addCustomizedCourse(course);
};
