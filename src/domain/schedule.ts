import { hasProperty } from "~/utils";
import { isNormalDay, isSpecialDay, NormalDay, SpecialDay } from "./day";
import { isModule, Module } from "./module";
import { isPeriod, Period } from "./period";

export type NormalSchedule = {
  module: Module;
  day: NormalDay;
  period: Period;
};

export type SpecialSchedule = {
  module: Module;
  day: SpecialDay;
};

export type Schedule = NormalSchedule | SpecialSchedule;

export const isNormalSchedule = (schedule: object): schedule is NormalSchedule => {
  return (
    hasProperty(schedule, "module", isModule) &&
    hasProperty(schedule, "day", isNormalDay) &&
    hasProperty(schedule, "period", isPeriod)
  );
};

export const isSpecialSchedule = (schedule: object): schedule is SpecialSchedule => {
  return hasProperty(schedule, "module", isModule) && hasProperty(schedule, "day", isSpecialDay);
};

export const isSchedule = (schedule: object): schedule is Schedule => {
  return isNormalSchedule(schedule) || isSpecialSchedule(schedule);
};

export const isEqualSchedule = (scheduleA: Schedule, scheduleB: Schedule): boolean => {
  if (isNormalSchedule(scheduleA) && isNormalSchedule(scheduleB)) {
    return (
      scheduleA.module === scheduleB.module && scheduleA.day === scheduleB.day && scheduleA.period === scheduleB.period
    );
  }

  if (isSpecialSchedule(scheduleA) && isSpecialSchedule(scheduleB)) {
    return scheduleA.module === scheduleB.module && scheduleA.day === scheduleB.day;
  }

  return false;
};
