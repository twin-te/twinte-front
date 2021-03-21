import { Ports } from "~/adapter";
import { SchoolCalendarEvent } from "~/api/@types";

/**
 * APIからSchoolCalendarEventを取得する。
 */
export const getEvents = async ({
  api,
  dayjs,
}: Ports): Promise<SchoolCalendarEvent[]> => {
  try {
    const now = dayjs();
    const year = now.month() < 3 ? now.year() - 1 : now.year();
    const events = await api.school_calendar.events.$get({ query: { year } });
    return events;
  } catch (error) {
    console.error(error);
    return [] as SchoolCalendarEvent[];
  }
};
