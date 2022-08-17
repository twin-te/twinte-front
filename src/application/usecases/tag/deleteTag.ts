import { Ports } from "~/application/ports";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
} from "~/domain/result";

export const deleteTag = ({ courseRepository }: Ports) => (
  id: string
): Promise<
  null | NotFoundError | UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.deleteTag(id);
};
