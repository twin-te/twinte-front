import { News } from "~/domain";
import { Result } from "~/domain/result";

export interface INewsRepository {
  getNews(): Promise<Result<News[]>>;
}
