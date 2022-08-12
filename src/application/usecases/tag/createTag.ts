import { Ports } from "~/application/ports";
import { Tag } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export const createTag = ({ courseRepository }: Ports) => (
  name: string
): PromiseResult<
  Tag,
  UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.createTag(name);
};
