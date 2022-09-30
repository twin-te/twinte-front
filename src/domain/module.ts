import { Dayjs } from "dayjs";
import { isContained } from "~/utils";

export type SpringModule = "SpringA" | "SpringB" | "SpringC";

export type FallModule = "FallA" | "FallB" | "FallC";

export type BaseModule = SpringModule | FallModule;

export type VacationModule = "SummerVacation" | "SpringVacation";

export type Module = BaseModule | VacationModule;

export type ModuleInformation = {
  year: number;
  module: Module;
  startDate: Dayjs;
  endDate: Dayjs;
};

export const springModules: SpringModule[] = ["SpringA", "SpringB", "SpringC"];

export const fallModules: FallModule[] = ["FallA", "FallB", "FallC"];

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

export const modules: Module[] = [
  "SpringA",
  "SpringB",
  "SpringC",
  "SummerVacation",
  "FallA",
  "FallB",
  "FallC",
  "SpringVacation",
];

export const isSpringModule = (module: unknown): module is SpringModule => {
  return isContained(module, springModules);
};

export const isFallModule = (module: unknown): module is FallModule => {
  return isContained(module, fallModules);
};

export const isBaseModule = (module: unknown): module is BaseModule => {
  return isContained(module, baseModules);
};

export const isModule = (module: unknown): module is Module => {
  return isContained(module, modules);
};
