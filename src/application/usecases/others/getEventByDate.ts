import { Dayjs } from "dayjs";
import { Ports } from "~/application/ports";
import { Event } from "~/domain";
import {
  InternalServerError,
  isError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/result";

export const getEventByDate = ({ calendarRepository }: Ports) => async (
  date: Dayjs
): Promise<
  Event | null | UnauthorizedError | NetworkError | InternalServerError
> => {
  const year = date.month() < 3 ? date.year() - 1 : date.year();
  const result = await calendarRepository.getEventsByYear(year);
  if (isError(result)) return result;

  const event = result.find((event) => event.date.isSame(date, "day")) ?? null;
  return event;
};
