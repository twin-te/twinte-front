import { Dayjs } from "dayjs";
import { NormalDay } from "./day";

export type NormalEventType = "PublicHoliday" | "Holiday" | "Exam" | "Other";

export type SubstituteEventType = "SubstituteDay";

export type EventType = NormalEventType | SubstituteEventType;

export type NormalEvent = {
  date: Dayjs;
  eventType: NormalEventType;
  description: string;
};

export type SubstituteEvent = {
  date: Dayjs;
  eventType: SubstituteEventType;
  description: string;
  changeTo: NormalDay;
};

export type Event = NormalEvent | SubstituteEvent;

export const eventTypes: EventType[] = [
  "PublicHoliday",
  "Holiday",
  "Exam",
  "SubstituteDay",
  "Other",
];

export const isNormalEventType = (
  eventType: unknown
): eventType is NormalEventType => {
  return eventType !== "SubstituteDay";
};

export const isSubstituteEventType = (
  eventType: unknown
): eventType is SubstituteEventType => {
  return eventType === "SubstituteDay";
};
