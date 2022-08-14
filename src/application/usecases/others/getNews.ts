import { Ports } from "~/application/ports";
import { News } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
} from "~/domain/result";

export const getNews = ({ newsRepository }: Ports) => (): PromiseResult<
  News[],
  NetworkError | InternalServerError
> => {
  return newsRepository.getNews();
};
