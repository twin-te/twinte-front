import { Ports } from "~/application/ports";
import { Tag } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export const updateTagName = ({ courseRepository }: Ports) => (
  id: string,
  name: string
): PromiseResult<
  Tag,
  NotFoundError | UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.updateTagName(id, name);
};
