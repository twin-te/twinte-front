import { Ports } from "~/application/ports";
import { Tag } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export const getAllTags = ({ courseRepository }: Ports) => (): PromiseResult<
  Tag[],
  UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.getAllTags();
};
