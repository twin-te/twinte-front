import { initializeObject } from "~/utils";
import {
  BaseModule,
  Module,
  NormalDay,
  NormalTimetable,
  Period,
  SpecialDay,
  SpecialTimetable,
  VacationModule,
} from ".";

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

export const periods: Period[] = ["1", "2", "3", "4", "5", "6", "7", "8"];

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
