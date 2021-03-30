import { CourseModule } from "~/api/@types";

// 夏季休業中、春季休業中
export type vacationModule = "その他";
export type ScheduleModuleJa = ModuleJa | vacationModule | "指定なし";
export type ModuleMap = { [key in CourseModule]?: ModuleJa };
export type ModuleJa =
  | "通年"
  | "春A"
  | "春B"
  | "春C"
  | "夏季休業中"
  | "秋A"
  | "秋B"
  | "秋C"
  | "春季休業中";

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
  "指定なし",
];
export const fullModules: CourseModule[] = [
  "SpringA",
  "SpringB",
  "SpringC",
  "SummerVacation",
  "FallA",
  "FallB",
  "FallC",
  "SpringVacation",
  // "Annual", apispec側が非対応
];
export const moduleMap: {
  [key in Exclude<CourseModule, "Unknown">]: ModuleJa;
} = {
  Annual: "通年",
  SpringA: "春A",
  SpringB: "春B",
  SpringC: "春C",
  SummerVacation: "夏季休業中",
  FallA: "秋A",
  FallB: "秋B",
  FallC: "秋C",
  SpringVacation: "春季休業中",
};
export const courseModules: CourseModule[] = [
  "Annual",
  "SpringA",
  "SpringB",
  "SpringC",
  "SummerVacation",
  "FallA",
  "FallB",
  "FallC",
  "SpringVacation",
];

export const modulesNum = (module: CourseModule): number =>
  modules.indexOf(module);
export const courseModulesNum = (module: CourseModule) =>
  courseModules.indexOf(module);
export const moduleToJa = (module: CourseModule): ModuleJa =>
  moduleMap[module] ?? "春A";
export const moduleFromJa = (moduleJa: ModuleJa): CourseModule =>
  modules[moduleJaList.indexOf(moduleJa)];
export const jaToModule = (module: string): CourseModule =>
  (Object.keys(moduleMap) as (keyof ModuleMap)[]).find(
    (key) => moduleMap[key] === module
  ) ?? "Unknown";

/** CourseModulesに対応 */
export type ModuleFlg = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean
];

export const moduleFlgToDisplay = (moduleFlg: ModuleFlg): string[] => {
  const result = [] as string[];
  if (moduleFlg[0]) result.push("通年");
  if (moduleFlg.slice(1, 4).some((b) => b)) {
    result.push(
      moduleFlg.slice(1, 4).reduce((a, _, i) => {
        return moduleFlg[1 + i] ? a + ["A", "B", "C"][i] : a;
      }, "春")
    );
  }
  if (moduleFlg[4]) result.push("夏休");
  if (moduleFlg.slice(5, 8).some((b) => b)) {
    result.push(
      moduleFlg.slice(5, 8).reduce((a, _, i) => {
        return moduleFlg[5 + i] ? a + ["A", "B", "C"][i] : a;
      }, "秋")
    );
  }
  if (moduleFlg[8]) result.push("春休");

  return result;
};
