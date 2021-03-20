import { Ports } from "~/adapter";
import { SchoolCalendarEvent } from "~/api/@types";
import { Calendar } from "~/components/PageHeader.vue";
import { dayToJa } from "~/entities/day";
import { eventMap } from "~/entities/event";
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
  const schedule = getCalendarSchedule(ports, events);
  return {
    month,
    day,
    week,
    schedule,
  };
};

export const getCalendarSchedule = (
  { dayjs }: Ports,
  events: SchoolCalendarEvent[]
): string => {
  const now = dayjs();
  const event = events.find((event) => {
    return now.isSame(dayjs(event.date));
  });
  return event == null
    ? "通常日課"
    : event.eventType === "SubstituteDay" && event.changeTo != null
    ? `${dayToJa(event.changeTo)}曜授業`
    : eventMap[event.eventType];
};
