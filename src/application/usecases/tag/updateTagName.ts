import { Ports } from "~/application/ports";
import { Tag } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  NotFoundError,
  UnauthorizedError,
} from "~/domain/result";

export const updateTagName = ({ courseRepository }: Ports) => (
  id: string,
  name: string
): Promise<
  Tag | NotFoundError | UnauthorizedError | NetworkError | InternalServerError
> => {
  return courseRepository.updateTagName(id, name);
};
