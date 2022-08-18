import { News } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/result";

export interface INewsRepository {
  getNews(): Promise<News[] | NetworkError | InternalServerError>;

  updateRead(
    id: string,
    read: boolean
  ): Promise<null | UnauthorizedError | NetworkError | InternalServerError>;
}
