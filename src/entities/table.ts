import { Day } from "~/api/@types";
import { weekdayNum } from "./day";

export const getValue = <T = unknown>(
  target: T[][],
  day: Day,
  peirod: number
) => target[weekdayNum(day)][peirod];

export type CourseState = {
  name: string;
  room: string;
  courseId: string;
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

export const dummyData: { table: Table } = {
  table: [
    [
      [{ name: "節足動物学野外演習", room: "1A101", courseId: "gb11514" }],
      [
        { name: "節足動物学野外演習", room: "1A101", courseId: "gb11514" },
        { name: "重複科目", room: "1A102", courseId: "gb11451" },
      ],
      [],
      [],
      [],
      [],
    ],
    [[], [], [], [], [], []],
    [[], [], [], [], [], []],
    [[], [], [], [], [], []],
    [[], [], [], [], [], []],
  ],
};
