import { Ports } from "~/application/ports";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
} from "~/domain/error";
import { Tag } from "~/domain/tag";

export const getTagById = ({ courseRepository }: Ports) => (
  id: string
): Promise<
  Tag | NotFoundError | UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.getTagById(id);
};
