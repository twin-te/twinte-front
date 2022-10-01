import { NotSpecified } from "./option";

export type DisplayBaseModule = "春A" | "春B" | "春C" | "秋A" | "秋B" | "秋C";

export type DisplayVacationModule = "夏休" | "春休";

export type DisplayModule = DisplayBaseModule | DisplayVacationModule;

export type EditableModule = DisplayModule | NotSpecified;
