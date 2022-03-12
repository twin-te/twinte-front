import { CourseSchedule } from "~/api/@types";
import {
  dayToFullDayja,
  FullDay,
  jaToFullDay,
  ScheduleDayJa,
  SpecialDayJa,
  specialDayJaList,
} from "./day";
import {
  ScheduleModuleJa,
  jaToFullModule,
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

/**
 * `schedules` が有効であるかどうかを判定する。
 * 特殊授業の場合は時限が"指定なし"でもよい。
 * 同一の `Schedule` を指定することはできない。
 */
export const isValidSchedules = (schedules: Schedule[]) => {
  return (
    !schedules.some(
      (schedule) =>
        schedule.module === "指定なし" ||
        schedule.day === "指定なし" ||
        (!specialDayJaList.includes(schedule.day as SpecialDayJa) &&
          schedule.period === "指定なし")
    ) &&
    new Set(schedules.map((s) => s.module + s.day + s.period)).size ===
      schedules.length
  );
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
    module: module === defaultValue ? "Unknown" : jaToFullModule(module),
    day: day === defaultValue ? "Unknown" : jaToFullDay(day),
    period: period === defaultValue ? 0 : Number(period),
    room,
  }));

export const createBlankSchedule = (): Schedule => ({
  module: "指定なし",
  day: "指定なし",
  period: "指定なし",
});

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
