import { CourseModule, CourseSchedule, Day } from "~/api/@types";
import { dayToJa, jaToDay, ScheduleDayJa } from "./day";
import { jaToModule, moduleToJa, ScheduleModuleJa } from "./module";
import { SchedulePeriod } from "./period";

export type Schedule = {
  module: ScheduleModuleJa;
  day: ScheduleDayJa;
  period: SchedulePeriod;
};

const defaultValue = "指定なし";

export const apiToDisplaySchedule = (api: CourseSchedule[]): Schedule[] =>
  api.map(({ day, module, period }) => ({
    day: dayToJa(day),
    module: moduleToJa(module),
    period: period === 0 ? defaultValue : (String(period) as SchedulePeriod),
  }));

export const scheduleToApi = (schedules: Schedule[]): CourseSchedule[] =>
  schedules.map((schedule) => ({
    day: jaToDay(schedule.day),
    module: jaToModule(schedule.module),
    period: Number(schedule.period),
    room: "",
  }));

export const fullModulesMap: Record<
  Exclude<CourseModule, "Annual" | "Unknown">,
  ScheduleModuleJa[]
> = {
  SpringA: ["春A", "指定なし"],
  SpringB: ["春B", "指定なし"],
  SpringC: ["春C", "指定なし"],
  SummerVacation: ["その他", "指定なし"],
  FallA: ["秋A", "指定なし"],
  FallB: ["秋B", "指定なし"],
  FallC: ["秋C", "指定なし"],
  SpringVacation: ["その他", "指定なし"],
  // Annual: ["その他", "指定なし"],  apispec 側が対応するのを待つ
};

export const fullWeekMap: Record<Exclude<Day, "Unknown">, ScheduleDayJa[]> = {
  Sun: ["日", "指定なし"],
  Mon: ["月", "指定なし"],
  Tue: ["火", "指定なし"],
  Wed: ["水", "指定なし"],
  Thu: ["木", "指定なし"],
  Fri: ["金", "指定なし"],
  Sat: ["土", "指定なし"],
  Intensive: ["その他", "指定なし"],
  Appointment: ["その他", "指定なし"],
  AnyTime: ["その他", "指定なし"],
};

export const fullPeriodMap: Record<string, SchedulePeriod[]> = {
  "0": ["その他", "指定なし"],
  "1": ["1", "指定なし"],
  "2": ["2", "指定なし"],
  "3": ["3", "指定なし"],
  "4": ["4", "指定なし"],
  "5": ["5", "指定なし"],
  "6": ["6", "指定なし"],
  "7": ["7", "指定なし"],
  "8": ["8", "指定なし"],
};
