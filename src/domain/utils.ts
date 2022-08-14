import { Dayjs } from "dayjs";
import { initializeObject } from "~/utils";
import {
  BaseModule,
  Day,
  EventType,
  Module,
  NormalDay,
  NormalTimetable,
  Period,
  Room,
  Schedule,
  Setting,
  SpecialDay,
  SpecialTimetable,
  UndefinedTagOrder,
  VacationModule,
} from ".";
import { isNormalSchedule, isSpecialSchedule } from "./validations";

export const undefinedTagOrder: UndefinedTagOrder = -1;

export const baseModules: BaseModule[] = [
  "SpringA",
  "SpringB",
  "SpringC",
  "FallA",
  "FallB",
  "FallC",
];

export const vacationModules: VacationModule[] = [
  "SummerVacation",
  "SpringVacation",
];

export const modules: Module[] = [...baseModules, ...vacationModules];

export const normalDays: NormalDay[] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export const specialDays: SpecialDay[] = [
  "Intensive",
  "Appointment",
  "AnyTime",
];

export const days: Day[] = [...normalDays, ...specialDays];

export const periods: Period[] = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const eventTypes: EventType[] = [
  "PublicHoliday",
  "Holiday",
  "Exam",
  "SubstituteDay",
  "Other",
];

export const settingProps: (keyof Setting)[] = [
  "darkMode",
  "saturdayCourseMode",
  "nightPeriodMode",
  "timeLabelMode",
  "displayYear",
];

export const initializeNormalTimetable = <M extends Module, V>(
  modules: M[],
  initValue: V
): NormalTimetable<M, V> => {
  return initializeObject(
    modules,
    initializeObject(normalDays, initializeObject(periods, initValue))
  );
};

export const initializeSpecialTimetable = <M extends Module, V>(
  modules: M[],
  initValue: V
): SpecialTimetable<M, V> => {
  return initializeObject(modules, initializeObject(specialDays, initValue));
};

export const getRoomsFromSchedule = (
  rooms: Room[],
  targetSchedule: Schedule
): Room[] => {
  return rooms.filter(({ schedules }) =>
    schedules.some((schedule) => {
      if (isNormalSchedule(schedule) && isSpecialSchedule(targetSchedule))
        return false;
      if (isSpecialSchedule(schedule) && isNormalSchedule(targetSchedule))
        return false;
      if (
        schedule.module !== targetSchedule.module ||
        schedule.day !== targetSchedule.day
      )
        return false;
      if (isNormalSchedule(schedule) && isNormalSchedule(targetSchedule))
        schedule.period === targetSchedule.period;
      else return true;
    })
  );
};

export const getAcademicYear = (date: Dayjs) => {
  return date.month() < 3 ? date.year() - 1 : date.year();
};
