import { News } from "~/domain";
import { PromiseResult } from "~/domain/result";

export interface INewsRepository {
  getNews(): PromiseResult<News[]>;
}
