import { Day, NormalDay, SpecialDay, WeekDay } from "~/domain";
import { DayJa, NormalDayJa, SpecialDayJa, WeekDayJa } from "../viewmodels/day";

export const weekdayMap: Record<WeekDay, WeekDayJa> = {
  Mon: "月",
  Tue: "火",
  Wed: "水",
  Thu: "木",
  Fri: "金",
  Sat: "土",
};

export const weekMap: Record<NormalDay, NormalDayJa> = {
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

export const dayMap: Record<Day, DayJa> = {
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
