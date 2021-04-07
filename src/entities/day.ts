import { CourseDay } from "~/api/@types";

export type WeekDay = Extract<CourseDay, "Mon" | "Tue" | "Wed" | "Thu" | "Fri">;
export type Day = Extract<
  CourseDay,
  "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"
>;
export type SpecialDay = Extract<
  CourseDay,
  "Intensive" | "Appointment" | "AnyTime"
>;
export type FullDay = Day | SpecialDay;

export type WeekDayJa = "月" | "火" | "水" | "木" | "金";
export type DayJa = "月" | "火" | "水" | "木" | "金" | "土" | "日";
export type SpecialDayJa = "集中" | "応談" | "随時";
export type FullDayJa = DayJa | SpecialDayJa;
export type NotWeekDay = "その他";
export type ScheduleDayJa = DayJa | NotWeekDay | "指定なし";

export const weekdays: WeekDay[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];
export const week: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const specialDays: SpecialDay[] = [
  "Intensive",
  "Appointment",
  "AnyTime",
];
export const fullDays: FullDay[] = [
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

export const weekdayMap: Record<WeekDay, WeekDayJa> = {
  Mon: "月",
  Tue: "火",
  Wed: "水",
  Thu: "木",
  Fri: "金",
};
export const weekMap: Record<Day, DayJa> = {
  Mon: "月",
  Tue: "火",
  Wed: "水",
  Thu: "木",
  Fri: "金",
  Sat: "土",
  Sun: "日",
};
export const specialDayMap: Record<SpecialDay, SpecialDayJa> = {
  Intensive: "集中",
  Appointment: "応談",
  AnyTime: "随時",
};
export const fullDayMap: Record<FullDay, FullDayJa> = {
  Mon: "月",
  Tue: "火",
  Wed: "水",
  Thu: "木",
  Fri: "金",
  Sat: "土",
  Sun: "日",
  Intensive: "集中",
  Appointment: "応談",
  AnyTime: "随時",
};

export const weekdayNum = (day: WeekDay): number => weekdays.indexOf(day);
export const weekNum = (day: Day): number => week.indexOf(day);

// 消したい
export const dayToWeekJa = (day: WeekDay): WeekDayJa => weekdayMap[day];
export const dayToJa = (day: Day): DayJa => weekMap[day];
export const dayToFullDayja = (day: FullDay): FullDayJa => fullDayMap[day];

/** 任意の値をCourseDayに変換できるように */
export const jaToDay = (ja: string): CourseDay =>
  fullDays.find((key) => fullDayMap[key] === ja) ?? "Unknown";
