import { Ports } from "~/application/ports";
import { InternalServerError, NetworkError } from "~/domain/error";
import { News } from "~/domain/news";

export const getNews = ({ newsRepository }: Ports) => (): Promise<
  News[] | NetworkError | InternalServerError
> => {
  return newsRepository.getNews();
};
