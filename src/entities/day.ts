import { Day } from "~/api/@types";

export type DayJa = "月" | "火" | "水" | "木" | "金";

export const dayJaList: DayJa[] = ["月", "火", "水", "木", "金"];
export const weeks: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];
export const weeksMap: { [key in Day]?: DayJa } = {
  Mon: "月",
  Tue: "火",
  Wed: "水",
  Thu: "水",
  Fri: "金",
};
export type SpecialDay = "Intensive" | "Appointment" | "AnyTime";
export type SpecialDayJa = "集中" | "応談" | "随時";
export const specialDays: SpecialDay[] = [
  "Intensive",
  "Appointment",
  "AnyTime",
];
export const specialDayMap: { [key in SpecialDay]: SpecialDayJa } = {
  Intensive: "集中",
  Appointment: "応談",
  AnyTime: "随時",
};

export const weeksNum = (day: Day): number => weeks.indexOf(day);
export const dayToJa = (day: Day): DayJa => weeksMap[day] ?? "月";
