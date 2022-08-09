import { Ports } from "~/application/ports";
import { News } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export const getNews = ({ newsRepository }: Ports) => (): PromiseResult<
  News[],
  UnauthorizedError | NetworkError | InternalServerError
> => {
  return newsRepository.getNews();
};
