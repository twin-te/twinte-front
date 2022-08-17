import { Ports } from "~/application/ports";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
} from "~/domain/result";

export const dropRegisteredCourse = ({ courseRepository }: Ports) => (
  id: string
): Promise<
  null | NotFoundError | UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.dropRegisteredCourse(id);
};
