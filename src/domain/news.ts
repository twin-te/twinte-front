import { Dayjs } from "dayjs";

export type News = {
  id: string;
  title: string;
  content: string;
  publishedAt: Dayjs;
  read: boolean;
};
