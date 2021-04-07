import { CourseSchedule } from "~/api/@types";
import { dayToFullDayja, FullDay, jaToDay, ScheduleDayJa } from "./day";
import {
  ScheduleModuleJa,
  jaToModule,
  moduleToFullModuleJa,
  FullModule,
} from "./module";
import { SchedulePeriod } from "./period";

const defaultValue = "指定なし";

export type Schedule = {
  module: ScheduleModuleJa;
  day: ScheduleDayJa;
  period: SchedulePeriod;
};

export const apiToSchedule = (api: CourseSchedule[]): Schedule[] =>
  api.map(({ day, module, period }) => ({
    module: module === "Unknown" ? defaultValue : moduleToFullModuleJa(module),
    day: day === "Unknown" ? defaultValue : dayToFullDayja(day),
    period: period === 0 ? defaultValue : (String(period) as SchedulePeriod),
  }));

export const scheduleToApi = (
  schedules: Schedule[],
  room: string
): CourseSchedule[] =>
  schedules.map(({ day, module, period }) => ({
    module: module === defaultValue ? "Unknown" : jaToModule(module),
    day: day === defaultValue ? "Unknown" : jaToDay(day),
    period: period === defaultValue ? 0 : Number(period),
    room,
  }));

export const searchModuleMap: Record<FullModule, ScheduleModuleJa[]> = {
  SpringA: ["春A", "指定なし"],
  SpringB: ["春B", "指定なし"],
  SpringC: ["春C", "指定なし"],
  SummerVacation: ["夏休", "指定なし"],
  FallA: ["秋A", "指定なし"],
  FallB: ["秋B", "指定なし"],
  FallC: ["秋C", "指定なし"],
  SpringVacation: ["春休", "指定なし"],
};

export const searchWeekMap: Record<FullDay, ScheduleDayJa[]> = {
  Sun: ["日", "指定なし"],
  Mon: ["月", "指定なし"],
  Tue: ["火", "指定なし"],
  Wed: ["水", "指定なし"],
  Thu: ["木", "指定なし"],
  Fri: ["金", "指定なし"],
  Sat: ["土", "指定なし"],
  Intensive: ["集中", "指定なし"],
  Appointment: ["応談", "指定なし"],
  AnyTime: ["随時", "指定なし"],
};

export const searchPeriodMap: Record<string, SchedulePeriod[]> = {
  "0": ["指定なし"],
  "1": ["1", "指定なし"],
  "2": ["2", "指定なし"],
  "3": ["3", "指定なし"],
  "4": ["4", "指定なし"],
  "5": ["5", "指定なし"],
  "6": ["6", "指定なし"],
  "7": ["7", "指定なし"],
  "8": ["8", "指定なし"],
};
