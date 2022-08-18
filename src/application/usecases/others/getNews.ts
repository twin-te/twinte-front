import { Ports } from "~/application/ports";
import { News } from "~/domain";
import { InternalServerError, NetworkError } from "~/domain/result";

export const getNews = ({ newsRepository }: Ports) => (): Promise<
  News[] | NetworkError | InternalServerError
> => {
  return newsRepository.getNews();
};
