import { Ports } from "~/application/ports";
import { Tag } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/result";

export const getAllTags = ({ courseRepository }: Ports) => (): Promise<
  Tag[] | UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.getAllTags();
};
