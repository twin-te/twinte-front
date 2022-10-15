import { Ports } from "~/application/ports";
import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { Tag } from "~/domain/tag";

export const createTag = ({ courseRepository }: Ports) => (
  name: string
): Promise<Tag | UnauthorizedError | NetworkError | InternalServerError> => {
  return courseRepository.createTag(name);
};
