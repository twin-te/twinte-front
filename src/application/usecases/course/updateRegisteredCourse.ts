import { Ports } from "~/application/ports";
import { RegisteredCourse } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export const updateRegisteredCourse = ({ courseRepository }: Ports) => (
  id: string,
  updatedData: Partial<Omit<RegisteredCourse, "id" | "year" | "code">>
): PromiseResult<
  RegisteredCourse,
  NotFoundError | UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.updateRegisteredCourse(id, updatedData);
};
