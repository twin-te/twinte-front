import { Ports } from "~/application/ports";
import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { Tag } from "~/domain/tag";

export const getAllTags = ({ courseRepository }: Ports) => (): Promise<
  Tag[] | UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.getAllTags();
};
