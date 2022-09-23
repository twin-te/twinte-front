import { NotSpecified } from "~/presentation/viewmodels/option";

export type DisplayNormalDay = "月" | "火" | "水" | "木" | "金" | "土" | "日";

export type DisplaySpecialDay = "集中" | "応談" | "随時";

export type DisplayDay = DisplayNormalDay | DisplaySpecialDay;

export type EditableNormalDay = DisplayNormalDay | NotSpecified;

export type EditableSpecialDay = DisplaySpecialDay | NotSpecified;

export type EditableDay = DisplayDay | NotSpecified;
