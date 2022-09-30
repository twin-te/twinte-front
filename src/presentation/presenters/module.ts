import { BaseModule, baseModules, Module, modules } from "~/domain/module";
import { isContained } from "~/utils";
import {
  DisplayBaseModule,
  DisplayModule,
  EditableModule,
} from "../viewmodels/module";
import { notSpecified } from "../viewmodels/option";

export const displayModules: DisplayModule[] = [
  "春A",
  "春B",
  "春C",
  "夏休",
  "秋A",
  "秋B",
  "秋C",
  "春休",
];

export const editableModules: EditableModule[] = [
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

export const baseModuleMap: Record<BaseModule, DisplayBaseModule> = {
  SpringA: "春A",
  SpringB: "春B",
  SpringC: "春C",
  FallA: "秋A",
  FallB: "秋B",
  FallC: "秋C",
};

export const moduleMap: Record<Module, DisplayModule> = {
  SpringA: "春A",
  SpringB: "春B",
  SpringC: "春C",
  SummerVacation: "夏休",
  FallA: "秋A",
  FallB: "秋B",
  FallC: "秋C",
  SpringVacation: "春休",
};

export const displayToBaseModule = (display: DisplayBaseModule): BaseModule => {
  return baseModules.find(
    (module) => baseModuleMap[module] === display
  ) as BaseModule;
};

export const displayToModule = (display: DisplayModule): Module => {
  return modules.find((module) => moduleMap[module] === display) as Module;
};

export const isDisplayModule = (module: unknown): module is DisplayModule => {
  return isContained(module, displayModules);
};

export const isEditableModule = (module: unknown): module is EditableModule => {
  return isDisplayModule(module) || module === notSpecified;
};
