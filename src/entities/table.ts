import { Day } from "~/api/@types";
import { weeksNum } from "./day";
import { State as CourseTileState } from "~/components/CourseTile.vue";

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
      { name: "", room: "", state: "none" },
    ],
    [
      { name: "", room: "", state: "none" },
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
      { name: "", room: "", state: "none" },
    ],
    [
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
      { name: "", room: "", state: "none" },
    ],
  ],
};
