import { INewsRepository } from "~/application/ports/INewsRepository";
import { News } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  Ok,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";
import { Api } from "~/infrastructure/api";
import * as ApiType from "~/infrastructure/api/aspida/@types";
import { apiToNews } from "~/infrastructure/api/converters/news";

export class NewsRepository implements INewsRepository {
  #api: Api;
  #news: News[];

  constructor() {
    this.#api = Api.getInstance();
    this.#news = [];
  }

  async getNews(): PromiseResult<News[], NetworkError | InternalServerError> {
    if (this.#news.length !== 0) return new Ok(this.#news);

    return this.#api.call<ApiType.Information[], News[], 200, 400 | 500>(
      (client) => client.information.get({ query: { offset: 0, limit: 20 } }),
      (body) => {
        this.#news = body.map(apiToNews);
        return new Ok(this.#news);
      },
      [200],
      [400, 500]
    );
  }

  async updateRead(
    id: string,
    read: boolean
  ): PromiseResult<
    null,
    UnauthorizedError | NetworkError | InternalServerError
  > {
    return this.#api.call<void, null, 200, 400 | 401 | 500>(
      (client) => client.information._id(id).put({ body: { read } }),
      () => {
        const index = this.#news.findIndex((n) => n.id === id);
        if (index !== -1) this.#news[index].read = read;
        return new Ok(null);
      },
      [200],
      [400, 401, 500]
    );
  }
}
