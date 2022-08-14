import { Ports } from "~/application/ports";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export const updateNewsRead = ({ newsRepository }: Ports) => (
  id: string,
  read: boolean
): PromiseResult<
  null,
  UnauthorizedError | NetworkError | InternalServerError
> => {
  return newsRepository.updateRead(id, read);
};
