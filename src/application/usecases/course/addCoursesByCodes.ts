import { Ports } from "~/application/ports";
import { RegisteredCourse } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export const addCoursesByCodes = ({ courseRepository }: Ports) => (
  inputData: { year: number; code: string }[]
): PromiseResult<
  RegisteredCourse[],
  NotFoundError | UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.addCoursesByCodes(inputData);
};
