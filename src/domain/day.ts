import { isContained } from "~/utils";

export type NormalDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type SpecialDay = "Intensive" | "Appointment" | "AnyTime";

export type Day = NormalDay | SpecialDay;

export const normalDays: NormalDay[] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export const specialDays: SpecialDay[] = [
  "Intensive",
  "Appointment",
  "AnyTime",
];

export const days: Day[] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
  "Intensive",
  "Appointment",
  "AnyTime",
];

export const isNormalDay = (day: unknown): day is NormalDay => {
  return isContained(day, normalDays);
};

export const isSpecialDay = (day: unknown): day is SpecialDay => {
  return isContained(day, specialDays);
};

export const isDay = (day: unknown): day is Day => {
  return isContained(day, days);
};
