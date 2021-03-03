import { Day } from "~/api/@types";
import { weeksNum } from "./day";

/**
 * x=5, y=6の配列で情報を持つ
 */

export const tableConstructor = <T = unknown>(value: T) =>
  Array.from({ length: 6 }).map(() =>
    Array.from({ length: 5 }).map(() => value)
  );

export const getValue = <T = unknown>(
  target: T[][],
  day: Day,
  peirod: number
) => target[weeksNum(day)][peirod];
