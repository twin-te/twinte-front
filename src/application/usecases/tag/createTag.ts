import { Ports } from "~/application/ports";
import { Tag } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/result";

export const createTag = ({ courseRepository }: Ports) => (
  name: string
): Promise<Tag | UnauthorizedError | NetworkError | InternalServerError> => {
  return courseRepository.createTag(name);
};
