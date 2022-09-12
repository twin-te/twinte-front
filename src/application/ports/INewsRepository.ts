import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { News } from "~/domain/news";

export interface INewsRepository {
  getNews(): Promise<News[] | NetworkError | InternalServerError>;

  updateRead(
    id: string,
    read: boolean
  ): Promise<null | UnauthorizedError | NetworkError | InternalServerError>;
}
