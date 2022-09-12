import { isPeriod } from "~/domain/period";
import { notSpecified } from "../viewmodels/option";
import { EditablePeriod } from "../viewmodels/period";

export const editablePeriods: EditablePeriod[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "指定なし",
];

export const isEditablePeriod = (period: unknown): period is EditablePeriod => {
  return isPeriod(period) || period === notSpecified;
};
