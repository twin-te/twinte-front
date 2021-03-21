import { CourseModule } from "~/api/@types";

// 夏季休業中、春季休業中
export type vacationModule = "その他";
export type ModuleJa = "春A" | "春B" | "春C" | "秋A" | "秋B" | "秋C";
export type ScheduleModuleJa = ModuleJa | vacationModule;
export type ModuleMap = { [key in CourseModule]?: ModuleJa };

export const modules: CourseModule[] = [
  "SpringA",
  "SpringB",
  "SpringC",
  "FallA",
  "FallB",
  "FallC",
];
export const moduleJaList: ModuleJa[] = [
  "春A",
  "春B",
  "春C",
  "秋A",
  "秋B",
  "秋C",
];
export const scheduleModuleJaList: ScheduleModuleJa[] = [
  "春A",
  "春B",
  "春C",
  "秋A",
  "秋B",
  "秋C",
  "その他",
];
export const moduleMap: ModuleMap = {
  SpringA: "春A",
  SpringB: "春B",
  SpringC: "春C",
  FallA: "秋A",
  FallB: "秋B",
  FallC: "秋C",
};

export const moduleNum = (module: CourseModule): number =>
  modules.indexOf(module);
export const moduleToJa = (module: CourseModule): ModuleJa =>
  moduleMap[module] ?? "春A";
export const jaToModule = (module: string): CourseModule =>
  (Object.keys(moduleMap) as (keyof ModuleMap)[]).find(
    (key) => moduleMap[key] === module
  ) ?? "Unknown";
