import { WeekDay } from "~/entities/entities";
import {
  WeekDayJa,
  WeekEndDayJa,
  NormalDayJa,
  SpecialDayJa,
  Day,
} from "~/src/viewmodels/day";

// export const normalDayJaListkdNormalDayJa[] = ["月", "火", "水", "木", "金", "土"];
export const dayJaList: DayJa[] = ["月", "火", "水", "木", "金", "土", "日"];
export const specialDayJaList: SpecialDayJa[] = ["集中", "応談", "随時"];
export const scheduleDayJaList: ScheduleDayJa[] = [
  "月",
  "火",
  "水",
  "木",
  "金",
  "土",
  "日",
  "集中",
  "応談",
  "随時",
  "指定なし",
];

export const weekdayMap: Record<WeekDay, WeekDayJa> = {
  Mon: "月",
  Tue: "火",
  Wed: "水",
  Thu: "木",
  Fri: "金",
  Sat: "土",
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
export const dayToSpecialDayJa = (day: SpecialDay) => specialDayMap[day];

export const jaToFullDay = (ja: FullDayJa): FullDay =>
  fullDays.find((key) => fullDayMap[key] === ja);
