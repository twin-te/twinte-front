import { Ports } from "~/application/ports";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export const deleteTag = ({ courseRepository }: Ports) => (
  id: string
): PromiseResult<
  null,
  NotFoundError | UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.deleteTag(id);
};
