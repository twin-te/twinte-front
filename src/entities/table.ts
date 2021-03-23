import { Day } from "~/api/@types";
import { SpecialDay, weeksNum } from "./day";

export const getValue = <T = unknown>(
  target: T[][],
  day: Day,
  peirod: number
) => target[weeksNum(day)][peirod];

export type CourseState = {
  name: string;
  room: string;
  courseId: string;
};

export type SpecialCourse = {
  id: string;
  name: string;
  module: string[];
  room: string;
};

/**
 * ```
 * table
 *   [曜日]
 *   [時限 0~5]
 *   [該当する科目は一つとは限らないので配列（重複しなければ0番目に目的の CourseState が入っている）]
 * ```
 */
export type Table = CourseState[][][];

export type SpecialTable = {
  [key in SpecialDay]: SpecialCourse[];
};
