import { initializeObject } from "~/utils";
import { NormalDay, normalDays, SpecialDay, specialDays } from "./day";
import { Module, modules } from "./module";
import { Period, periods } from "./period";
import { NormalSchedule } from "./schedule";

export type NormalTimetable<M extends Module, V> = Record<M, Record<NormalDay, Record<Period, V>>>;

export type SpecialTimetable<M extends Module, V> = Record<M, Record<SpecialDay, V>>;

export type Timetable<M extends Module, V> = {
  normal: NormalTimetable<M, V>;
  special: SpecialTimetable<M, V>;
};

export const initializeNormalTimetable = <M extends Module, V>(modules: M[], initValue: V): NormalTimetable<M, V> => {
  return initializeObject(modules, initializeObject(normalDays, initializeObject(periods, initValue)));
};

export const initializeSpecialTimetable = <M extends Module, V>(modules: M[], initValue: V): SpecialTimetable<M, V> => {
  return initializeObject(modules, initializeObject(specialDays, initValue));
};

export const initializeTimetable = <M extends Module, V>(modules: M[], initValue: V): Timetable<M, V> => {
  return {
    normal: initializeNormalTimetable(modules, initValue),
    special: initializeSpecialTimetable(modules, initValue),
  };
};

export const normalSchedulesToNormalTimetable = (schedules: NormalSchedule[]): NormalTimetable<Module, boolean> => {
  const timetable: NormalTimetable<Module, boolean> = initializeNormalTimetable(modules, false);

  schedules.forEach(({ module, day, period }) => {
    timetable[module][day][period] = true;
  });

  return timetable;
};
