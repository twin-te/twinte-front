import { Ports } from "~/application/ports";
import { RegisteredCourse } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
} from "~/domain/result";

export const addCoursesByCodes = ({ courseRepository }: Ports) => (
  inputData: { year: number; code: string }[]
): Promise<
  | RegisteredCourse[]
  | NotFoundError
  | UnauthorizedError
  | NetworkError
  | InternalServerError
> => {
  return courseRepository.addCoursesByCodes(inputData);
};
