import { News } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export interface INewsRepository {
  getNews(): PromiseResult<News[], NetworkError | InternalServerError>;

  updateRead(
    id: string,
    read: boolean
  ): PromiseResult<
    null,
    UnauthorizedError | NetworkError | InternalServerError
  >;
}
