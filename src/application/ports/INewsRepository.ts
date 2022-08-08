import { News } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export interface INewsRepository {
  getNews(): PromiseResult<
    News[],
    UnauthorizedError | NetworkError | InternalServerError
  >;
}
