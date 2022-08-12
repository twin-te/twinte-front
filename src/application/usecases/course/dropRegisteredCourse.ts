import { Ports } from "~/application/ports";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export const dropRegisteredCourse = ({ courseRepository }: Ports) => (
  id: string
): PromiseResult<
  null,
  NotFoundError | UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.dropRegisteredCourse(id);
};
