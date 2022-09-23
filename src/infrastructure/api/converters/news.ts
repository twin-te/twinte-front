import dayjs from "dayjs";
import { News } from "~/domain/news";
import * as ApiType from "../aspida/@types";

export const apiToNews = ({
  id,
  title,
  content,
  publishedAt,
  read,
}: ApiType.Information): News => {
  return {
    id,
    title,
    content,
    publishedAt: dayjs(publishedAt),
    read: read ?? false,
  };
};
