import { Day } from "~/api/@types";
import { weeksNum } from "./day";
import { State as CourseTileState } from "~/components/CourseTile.vue";

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

export type CourseState = {
  name: string;
  room: string;
  state: CourseTileState;
};

export const dummyData: { table: CourseState[][] } = {
  table: [
    [
      { name: "節足動物学野外演習", room: "1A101", state: "default" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
    ],
    [
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
    ],
    [
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
    ],
    [
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
    ],
    [
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
    ],
    [
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
    ],
  ],
};
