import dayjs from "dayjs";
import { SchoolCalendarEvent } from "~/api/@types";
import { weekMap, isDay } from "./day";
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
    return now.isSame(dayjs(event.date), "day");
  });
  return event == null
    ? "通常日課"
    : event.eventType === "SubstituteDay" &&
      event.changeTo != null &&
      isDay(event.changeTo)
    ? `${weekMap[event.changeTo]}曜日課`
    : EventMap[event.eventType];
};
