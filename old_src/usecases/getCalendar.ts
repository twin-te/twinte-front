import { Ports } from "~/adapter";
import { Calendar, getSchoolCalendarEventJa } from "~/entities/calendar";
import { getEvents } from "./getEvents";

/**
 * カレンダーを返す
 */
export const getCalendar = async (ports: Ports): Promise<Calendar> => {
  const { dayjs } = ports;
  const now = dayjs();
  const month = now.month() + 1;
  const day = now.date();
  const week = ["日", "月", "火", "水", "木", "金", "土"][now.day()];
  const events = await getEvents(ports);
  const schedule = getSchoolCalendarEventJa(events);
  return {
    month,
    day,
    week,
    schedule,
  };
};
