import { Ports } from "~/adapter";
import { SchoolCalendarEvent } from "~/api/@types";
import { isValidStatus } from "~/usecases/api";
import { NetworkAccessError, NetworkError } from "~/usecases/error";

/**
 * APIからSchoolCalendarEventを取得する。
 */
export const getEvents = async ({
  api,
  dayjs,
}: Ports): Promise<SchoolCalendarEvent[]> => {
  const now = dayjs();
  const year = now.month() < 3 ? now.year() - 1 : now.year();
  const {
    body,
    status,
    originalResponse,
  } = await api.school_calendar.events
    .get({ query: { year } })
    .catch((error) => {
      console.error(error);
      throw new NetworkError();
    });
  if (isValidStatus(status)) {
    return body;
  } else if ((status as number) === 401) {
    return [];
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};
