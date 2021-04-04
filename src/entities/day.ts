import { Day } from "~/api/@types";

/**
 * weekday（平日）には土日を含まない。
 * 基本は、英語表記の型は Day を用いる。（他の英語表記の型を作るとややこしくなるため）
 */

// 通常
export type WeekDayJa = "月" | "火" | "水" | "木" | "金";
export type DayJa = "月" | "火" | "水" | "木" | "金" | "土" | "日";
export type NotWeekDay = "その他";
export type ScheduleDayJa = DayJa | NotWeekDay | "指定なし";

export const weekdays: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];
export const week: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const fullDays: Day[] = [
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

export const weekdayJaList: WeekDayJa[] = ["月", "火", "水", "木", "金"];
export const dayJaList: DayJa[] = ["月", "火", "水", "木", "金", "土", "日"];
export const scheduleDayJaList: ScheduleDayJa[] = [
  "月",
  "火",
  "水",
  "木",
  "金",
  "土",
  "日",
  "その他",
  "指定なし",
];

export const weekdayMap: { [key in Day]?: WeekDayJa } = {
  Mon: "月",
  Tue: "火",
  Wed: "水",
  Thu: "木",
  Fri: "金",
};
export const weekMap: { [key in Day]?: DayJa } = {
  Mon: "月",
  Tue: "火",
  Wed: "水",
  Thu: "木",
  Fri: "金",
  Sat: "土",
  Sun: "日",
};

export const weekdayNum = (day: Day): number => weekdays.indexOf(day);
export const weekNum = (day: Day): number => week.indexOf(day);

export const weekDayToJa = (day: Day): WeekDayJa => weekdayMap[day] ?? "月";
export const dayToJa = (day: Day): DayJa => weekMap[day] ?? "月";

export const jaToDay = (ja: DayJa): Day =>
  week.find((key) => weekMap[key] === ja) ?? "Unknown";
export const scheduleJaToDay = (ja: ScheduleDayJa): Day =>
  week.find((key) => weekMap[key] === ja) ?? "Unknown";

// 特殊
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
