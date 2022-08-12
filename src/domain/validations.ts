import {
  BaseModule,
  Day,
  Module,
  NormalDay,
  NormalSchedule,
  Period,
  Schedule,
  SpecialSchedule,
} from ".";
import { baseModules, normalDays, periods } from "./utils";

export const isNormalDay = (day: Day): day is NormalDay => {
  return normalDays.includes(day as NormalDay);
};

export const isNormalSchedule = (
  schedule: Schedule
): schedule is NormalSchedule => {
  return "period" in schedule;
};

export const isSpecialSchedule = (
  schedule: Schedule
): schedule is SpecialSchedule => {
  return !isNormalSchedule(schedule);
};

export const isBaseModule = (module: Module): module is BaseModule => {
  return baseModules.includes(module as BaseModule);
};

export const isPeriod = (period: string): period is Period => {
  return periods.includes(period as Period);
};
