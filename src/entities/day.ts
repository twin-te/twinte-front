import { Day } from "~/api/@types";

// 集中、応談、随時
export type NotWeekDay = "その他";

export type WeekDayJa = "月" | "火" | "水" | "木" | "金";
export type ScheduleDayJa = WeekDayJa | "土" | "日" | NotWeekDay;

export const weekdayJaList: WeekDayJa[] = ["月", "火", "水", "木", "金"];
export const scheduleDayJaList: ScheduleDayJa[] = [
  "月",
  "火",
  "水",
  "木",
  "金",
  "土",
  "日",
  "その他",
];

export const weekdays: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];
export const weekdayMap: { [key in Day]?: WeekDayJa } = {
  Mon: "月",
  Tue: "火",
  Wed: "水",
  Thu: "水",
  Fri: "金",
};

export const weekdayNum = (day: Day): number => weekdays.indexOf(day);
export const dayToJa = (day: Day): WeekDayJa => weekdayMap[day] ?? "月";
