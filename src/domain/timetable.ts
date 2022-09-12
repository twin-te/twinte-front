import { initializeObject } from "~/utils";
import { NormalDay, normalDays, SpecialDay, specialDays } from "./day";
import { Module, modules } from "./module";
import { Period, periods } from "./period";
import {
  isNormalSchedule,
  isSpecialSchedule,
  NormalSchedule,
  Schedule,
  SpecialSchedule,
} from "./schedule";

export type NormalTimetable<M extends Module, V> = Record<
  M,
  Record<NormalDay, Record<Period, V>>
>;

export type SpecialTimetable<M extends Module, V> = Record<
  M,
  Record<SpecialDay, V>
>;

export type Timetable<M extends Module, V> = {
  normal: NormalTimetable<M, V>;
  special: SpecialTimetable<M, V>;
};

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

export const initializeTimetable = <M extends Module, V>(
  modules: M[],
  initValue: V
): Timetable<M, V> => {
  return {
    normal: initializeNormalTimetable(modules, initValue),
    special: initializeSpecialTimetable(modules, initValue),
  };
};

export const normalSchedulesToNormalTimetable = (
  schedules: NormalSchedule[]
): NormalTimetable<Module, boolean> => {
  const timetable: NormalTimetable<Module, boolean> = initializeNormalTimetable(
    modules,
    false
  );

  schedules.forEach(({ module, day, period }) => {
    timetable[module][day][period] = true;
  });

  return timetable;
};

export const specialSchedulesToSpecialTimetable = (
  schedules: SpecialSchedule[]
): SpecialTimetable<Module, boolean> => {
  const timetable: SpecialTimetable<
    Module,
    boolean
  > = initializeSpecialTimetable(modules, false);

  schedules.forEach(({ module, day }) => {
    timetable[module][day] = true;
  });

  return timetable;
};

export const schedulesToTimetable = (
  schedules: Schedule[]
): Timetable<Module, boolean> => {
  const normalSchedules: NormalSchedule[] = schedules.filter(isNormalSchedule);
  const specialSchedules: SpecialSchedule[] = schedules.filter(
    isSpecialSchedule
  );

  const timetable: Timetable<Module, boolean> = {
    normal: normalSchedulesToNormalTimetable(normalSchedules),
    special: specialSchedulesToSpecialTimetable(specialSchedules),
  };

  return timetable;
};
