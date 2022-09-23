import dayjs from "dayjs";
import { INewsRepository } from "~/application/ports/INewsRepository";
import {
  InternalServerError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { News } from "~/domain/news";
import news_json from "~/tests/data/news.json";
import { deepCopy } from "~/utils";

export class NewsRepositoryInMemory implements INewsRepository {
  #news_db: News[];

  constructor() {
    this.#news_db = news_json.map(({ id, title, content, publishedAt }) => ({
      id,
      title,
      content,
      publishedAt: dayjs(publishedAt),
      read: false,
    }));
  }

  async getNews(): Promise<News[] | NetworkError | InternalServerError> {
    return deepCopy(this.#news_db);
  }

  async updateRead(
    id: string,
    read: boolean
  ): Promise<null | UnauthorizedError | NetworkError | InternalServerError> {
    const news = this.#news_db.find((news) => news.id === id);
    if (news != undefined) news.read = read;
    return null;
  }
}
