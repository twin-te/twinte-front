import { Ports } from "~/application/ports";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
} from "~/domain/error";
import { Tag } from "~/domain/tag";

export const updateTagName = ({ courseRepository }: Ports) => (
  id: string,
  name: string
): Promise<
  Tag | NotFoundError | UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.updateTagName(id, name);
};
