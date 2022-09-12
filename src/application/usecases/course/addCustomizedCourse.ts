import { Ports } from "~/application/ports";
import { RegisteredCourse } from "~/domain/course";
import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";

export const addCustomizedCourse = ({ courseRepository }: Ports) => (
  course: Omit<RegisteredCourse, "id" | "code">
): Promise<
  RegisteredCourse | UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.addCustomizedCourse(course);
};
