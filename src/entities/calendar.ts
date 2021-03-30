import dayjs from "dayjs";
import { SchoolCalendarEvent } from "~/api/@types";
import { dayToJa } from "./day";
import { EventMap } from "./event";

export type Calendar = {
  schedule: string;
  month: number;
  day: number;
  week: string;
};

export const getSchoolCalendarEventJa = (
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
    : EventMap[event.eventType];
};
