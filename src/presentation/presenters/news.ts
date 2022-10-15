import { Dayjs } from "dayjs";

export const formatPublishedAt = (date: Dayjs): string => {
  return `${date.year()}.${date.month() + 1}.${date.date()}`;
};
