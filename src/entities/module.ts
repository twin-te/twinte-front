import { CourseModule } from "~/api/@types";

export type BaseModule = Exclude<
  CourseModule,
  "SummerVacation" | "SpringVacation" | "Unknown"
>;
export type FullModule = Exclude<CourseModule, "Unknown">;

export type ModuleJa = "春A" | "春B" | "春C" | "秋A" | "秋B" | "秋C";
export type VacationModuleJa = "夏休" | "春休";
export type FullModuleJa = ModuleJa | VacationModuleJa;
export type ScheduleModuleJa = FullModuleJa | "指定なし";

export const modules: BaseModule[] = [
  "SpringA",
  "SpringB",
  "SpringC",
  "FallA",
  "FallB",
  "FallC",
];
export const fullModules: FullModule[] = [
  "SpringA",
  "SpringB",
  "SpringC",
  "SummerVacation",
  "FallA",
  "FallB",
  "FallC",
  "SpringVacation",
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
  "夏休",
  "秋A",
  "秋B",
  "秋C",
  "春休",
  "指定なし",
];

export const moduleMap: Record<BaseModule, ModuleJa> = {
  SpringA: "春A",
  SpringB: "春B",
  SpringC: "春C",
  FallA: "秋A",
  FallB: "秋B",
  FallC: "秋C",
};
export const fullModuleMap: Record<FullModule, FullModuleJa> = {
  SpringA: "春A",
  SpringB: "春B",
  SpringC: "春C",
  SummerVacation: "夏休",
  FallA: "秋A",
  FallB: "秋B",
  FallC: "秋C",
  SpringVacation: "春休",
};

export const modulesNum = (module: BaseModule): number =>
  modules.indexOf(module);
export const fullModulesNum = (module: FullModule): number =>
  fullModules.indexOf(module);

export const moduleToJa = (module: BaseModule): ModuleJa => moduleMap[module];
export const moduleToFullModuleJa = (module: FullModule): FullModuleJa =>
  fullModuleMap[module];

export const jaToFullModule = (ja: FullModuleJa): CourseModule =>
  fullModules.find((key) => fullModuleMap[key] === ja) ?? "Unknown";
export const jaToBaseModule = (ja: ModuleJa): BaseModule =>
  modules.find((m) => moduleMap[m] === ja) ?? "SpringA";

/** fullModulesに対応 */
export type ModuleFlg = [
  boolean, // 春A
  boolean, // 春B
  boolean, // 春C
  boolean, // 夏休
  boolean, // 秋A
  boolean, // 秋B
  boolean, // 秋C
  boolean // 春休
];

export const moduleFlgToDisplay = (moduleFlg: ModuleFlg): string[] => {
  const result = [] as string[];
  if (moduleFlg.slice(0, 3).some((b) => b)) {
    result.push("春" + ["A", "B", "C"].filter((_, i) => moduleFlg[i]).join(""));
  }
  if (moduleFlg[3]) result.push("夏休");
  if (moduleFlg.slice(4, 7).some((b) => b)) {
    result.push(
      "秋" + ["A", "B", "C"].filter((_, i) => moduleFlg[4 + i]).join("")
    );
  }
  if (moduleFlg[7]) result.push("春休");

  return result;
};
