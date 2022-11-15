import { Dayjs, isDayjs } from "dayjs";
import { hasProperty, isContained } from "~/utils";
import { isNormalDay, NormalDay } from "./day";

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
  return isContained(eventType, eventTypes) && eventType !== "SubstituteDay";
};

export const isSubstituteEventType = (
  eventType: unknown
): eventType is SubstituteEventType => {
  return eventType === "SubstituteDay";
};

export const isNormalEvent = (event: object): event is NormalEvent => {
  return (
    hasProperty(event, "date", isDayjs) &&
    hasProperty(event, "eventType", isNormalEventType) &&
    hasProperty(
      event,
      "description",
      (v: unknown): v is string => typeof v === "string"
    )
  );
};

export const isSubstituteEvent = (event: object): event is SubstituteEvent => {
  return (
    hasProperty(event, "date", isDayjs) &&
    hasProperty(event, "eventType", isSubstituteEventType) &&
    hasProperty(
      event,
      "description",
      (v: unknown): v is string => typeof v === "string"
    ) &&
    hasProperty(event, "changeTo", isNormalDay)
  );
};
