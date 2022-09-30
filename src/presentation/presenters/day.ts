import {
  Day,
  NormalDay,
  normalDays,
  SpecialDay,
  specialDays,
} from "~/domain/day";
import { isContained } from "~/utils";
import {
  DisplayDay,
  DisplayNormalDay,
  DisplaySpecialDay,
  EditableDay,
  EditableNormalDay,
  EditableSpecialDay,
} from "../viewmodels/day";
import { isNotSpecified } from "../viewmodels/option";

export const displayNormalDays: DisplayNormalDay[] = [
  "月",
  "火",
  "水",
  "木",
  "金",
  "土",
  "日",
];

export const displaySpecialDays: DisplaySpecialDay[] = ["集中", "応談", "随時"];

export const editableNormalDays: EditableNormalDay[] = [
  "月",
  "火",
  "水",
  "木",
  "金",
  "土",
  "日",
  "指定なし",
];

export const editableSpecialDays: EditableSpecialDay[] = [
  "集中",
  "応談",
  "随時",
  "指定なし",
];

export const editableDays: EditableDay[] = [
  "月",
  "火",
  "水",
  "木",
  "金",
  "土",
  "日",
  "集中",
  "応談",
  "随時",
  "指定なし",
];

export const normalDayMap: Record<NormalDay, DisplayNormalDay> = {
  Mon: "月",
  Tue: "火",
  Wed: "水",
  Thu: "木",
  Fri: "金",
  Sat: "土",
  Sun: "日",
};

export const specialDayMap: Record<SpecialDay, DisplaySpecialDay> = {
  Intensive: "集中",
  Appointment: "応談",
  AnyTime: "随時",
};

export const dayMap: Record<Day, DisplayDay> = {
  Mon: "月",
  Tue: "火",
  Wed: "水",
  Thu: "木",
  Fri: "金",
  Sat: "土",
  Sun: "日",
  Intensive: "集中",
  Appointment: "応談",
  AnyTime: "随時",
};

export const isDisplayNormalDay = (day: unknown): day is DisplayNormalDay => {
  return isContained(day, displayNormalDays);
};

export const isDisplaySpecialDay = (day: unknown): day is DisplaySpecialDay => {
  return isContained(day, displaySpecialDays);
};

export const isDisplayDay = (day: unknown): day is DisplayDay => {
  return isDisplayNormalDay(day) || isDisplaySpecialDay(day);
};

export const isEditableNormalDay = (day: unknown): day is EditableNormalDay => {
  return isContained(day, editableNormalDays);
};

export const isEditableSpecialDay = (
  day: unknown
): day is EditableSpecialDay => {
  return isContained(day, editableSpecialDays);
};

export const isEditableDay = (day: unknown): day is EditableDay => {
  return isDisplayDay(day) || isNotSpecified(day);
};

export const displayToNormalDay = (displayDay: DisplayNormalDay): NormalDay => {
  return normalDays.find(
    (day) => normalDayMap[day] === displayDay
  ) as NormalDay;
};

export const displayToSpecialDay = (
  displayDay: DisplaySpecialDay
): SpecialDay => {
  return specialDays.find(
    (day) => specialDayMap[day] === displayDay
  ) as SpecialDay;
};
