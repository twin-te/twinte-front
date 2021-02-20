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
  "秋A",
  "秋B",
  "秋C",
];
export const moduleMap: { [key in CourseModule]?: ModuleJa } = {
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
