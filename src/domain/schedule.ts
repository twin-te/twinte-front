import { hasProperty } from "~/utils";
import {
  isNormalDay,
  isSpecialDay,
  NormalDay,
  normalDays,
  SpecialDay,
  specialDays,
} from "./day";
import { isModule, Module, modules } from "./module";
import { isPeriod, Period, periods } from "./period";
import { schedulesToTimetable } from "./timetable";

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

export const isNormalSchedule = (
  schedule: object
): schedule is NormalSchedule => {
  return (
    hasProperty(schedule, "module", isModule) &&
    hasProperty(schedule, "day", isNormalDay) &&
    hasProperty(schedule, "period", isPeriod)
  );
};

export const isSpecialSchedule = (
  schedule: object
): schedule is SpecialSchedule => {
  return (
    hasProperty(schedule, "module", isModule) &&
    hasProperty(schedule, "day", isSpecialDay)
  );
};

export const isSchedule = (schedule: object): schedule is Schedule => {
  return isNormalSchedule(schedule) || isSpecialSchedule(schedule);
};

export const isEqualSchedule = (
  scheduleA: Schedule,
  scheduleB: Schedule
): boolean => {
  if (isNormalSchedule(scheduleA) && isNormalSchedule(scheduleB)) {
    return (
      scheduleA.module === scheduleB.module &&
      scheduleA.day === scheduleB.day &&
      scheduleA.period === scheduleB.period
    );
  }

  if (isSpecialSchedule(scheduleA) && isSpecialSchedule(scheduleB)) {
    return (
      scheduleA.module === scheduleB.module && scheduleA.day === scheduleB.day
    );
  }

  return false;
};

export const removeDuplicateSchedules = (schedules: Schedule[]) => {
  return schedules.reduce<Schedule[]>((ret, target) => {
    if (ret.every((schedule) => !isEqualSchedule(schedule, target))) {
      ret.push(target);
    }
    return ret;
  }, []);
};

export const sortSchedules = (schedules: Schedule[]): Schedule[] => {
  const timetable = schedulesToTimetable(schedules);
  const ret: Schedule[] = [];

  modules.forEach((module) => {
    normalDays.forEach((day) => {
      periods.forEach((period) => {
        if (timetable.normal[module][day][period]) {
          ret.push({ module, day, period });
        }
      });
    });

    specialDays.forEach((day) => {
      if (timetable.special[module][day]) {
        ret.push({ module, day });
      }
    });
  });

  return ret;
};
