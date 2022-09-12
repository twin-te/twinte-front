import { Dayjs } from "dayjs";
import { Ports } from "~/application/ports";
import {
  InternalServerError,
  isResultError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { Event } from "~/domain/event";
import { getAcademicYear } from "~/domain/year";

export const getEventByDate = ({ calendarRepository }: Ports) => async (
  date: Dayjs
): Promise<
  Event | null | UnauthorizedError | NetworkError | InternalServerError
> => {
  const year = getAcademicYear(date);
  const result = await calendarRepository.getEventsByYear(year);
  if (isResultError(result)) return result;

  const event = result.find((event) => event.date.isSame(date, "day")) ?? null;
  return event;
};
