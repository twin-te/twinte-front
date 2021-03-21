import { CourseModule } from "~/api/@types";

export type ModuleJa = "春A" | "春B" | "春C" | "秋A" | "秋B" | "秋C";

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
export const moduleMap: { [key in string]: ModuleJa } = {
  SpringA: "春A",
  SpringB: "春B",
  SpringC: "春C",
  FallA: "秋A",
  FallB: "秋B",
  FallC: "秋C",
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

export const moduleFlgToDisplay = (modules: ModuleFlg): string[] => {
  const result = [] as string[];
  if (modules[0]) result.push("通年");
  if (modules.slice(1, 4).some((b) => b)) {
    result.push(
      modules.slice(1, 4).reduce((a, c, i) => {
        return modules[1 + i] ? a + ["A", "B", "C"][i] : a;
      }, "春")
    );
  }
  if (modules[4]) result.push("夏休");
  if (modules.slice(5, 8).some((b) => b)) {
    result.push(
      modules.slice(5, 8).reduce((a, c, i) => {
        return modules[5 + i] ? a + ["A", "B", "C"][i] : a;
      }, "秋")
    );
  }
  if (modules[8]) result.push("春休");

  return result;
};
