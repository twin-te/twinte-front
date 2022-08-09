import { Ports } from "~/application/ports";
import { Tag } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export const getTagById = ({ courseRepository }: Ports) => (
  id: string
): PromiseResult<
  Tag,
  NotFoundError | UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.getTagById(id);
};
