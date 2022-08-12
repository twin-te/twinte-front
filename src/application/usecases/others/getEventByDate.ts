import { Dayjs } from "dayjs";
import { Ports } from "~/application/ports";
import { Event } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  Ok,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";

export const getEventByDate = ({ calendarRepository }: Ports) => async (
  date: Dayjs
): PromiseResult<
  Event | null,
  UnauthorizedError | NetworkError | InternalServerError
> => {
  const year = date.month() < 3 ? date.year() - 1 : date.year();
  const result = await calendarRepository.getEventsByYear(year);
  if (result.isErr()) return result;

  const event =
    result.value.find((event) => event.date.isSame(date, "day")) ?? null;
  return new Ok(event);
};
