import { RegisteredCourse, CourseSchedule } from "~/api/@types";
import { dayToJa } from "./day";
import { jaToDay } from "~/entities/day";
import { jaToModule } from "~/entities/module";
import { jaToMethod, MethodJa, methodToJa } from "./method";
import { moduleToJa } from "./module";
import {
  apiToDisplaySchedule,
  Schedule,
  scheduleToApi,
} from "~/entities/schedule";

export type DisplayCourse = {
  code: string;
  name: string;
  date: string;
  instructor: string;
  room: string;
  method: string;
  courseId: string;
  memo: string;
  attendance: number;
  absence: number;
  late: number;
  registeredCourse: RegisteredCourse;
  schedules: Schedule[];
};

export const displayCourseToApi = (
  displayedCourse: Partial<DisplayCourse> &
    Pick<DisplayCourse, "registeredCourse" | "absence" | "attendance" | "late">,
  methods: MethodJa[] = []
): RegisteredCourse => ({
  ...displayedCourse.registeredCourse,
  attendance: displayedCourse.attendance,
  absence: displayedCourse.absence,
  late: displayedCourse.late,
  memo: displayedCourse.memo ?? "",
  name: displayedCourse.name ?? "",
  instructor: displayedCourse.instructor ?? "",
  schedules: scheduleToApi(displayedCourse.schedules ?? []),
  methods: methods.map(jaToMethod),
});

const blankToChar = (value: string | undefined, char: string) =>
  value === undefined || value === "" ? char : value;

export const apiToDisplayCourse = (
  registeredCourse: RegisteredCourse,
  char: string
): DisplayCourse => ({
  code: blankToChar(registeredCourse.course?.code, char),
  name: blankToChar(
    registeredCourse.name ?? registeredCourse.course?.name,
    char
  ),
  date: blankToChar(
    getLectureTimeAsStr(
      registeredCourse?.schedules ?? registeredCourse.course?.schedules ?? []
    ),
    char
  ),
  instructor: blankToChar(
    registeredCourse.instructor ?? registeredCourse.course?.instructor,
    char
  ),
  room: blankToChar(
    Array.from(
      new Set(
        (
          registeredCourse?.schedules ??
          registeredCourse.course?.schedules ??
          []
        ).map((s) => s.room)
      )
    ).join(", "),
    char
  ),
  method: blankToChar(
    registeredCourse.methods?.map(methodToJa).join(", "),
    char
  ),
  courseId: registeredCourse.id,
  attendance: registeredCourse.attendance,
  absence: registeredCourse.absence,
  late: registeredCourse.late,
  memo: registeredCourse.memo,
  schedules: apiToDisplaySchedule(
    registeredCourse.schedules ?? registeredCourse.course?.schedules ?? []
  ),
  registeredCourse,
});

// getLectureTimeAsStr.ts

// 2次元配列を転置
const transpose = (matrix: string[][]) =>
  matrix[0].map((_, i) => matrix.map((r) => r[i]));

// 1. string[][1]の重複した要素を取り除く
// Ex) [['月', '56'], ['火', '56']] -> [['月', ''], ['火', '56']]
// 2. string[][]の要素を結合して文字列に変換する
// Ex) [['月', ''], ['火', '56']] -> '月火56'
const reduceArr = (arr: string[][]) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1][1] == arr[i][1]) {
      arr[i - 1][1] = "";
    }
  }
  return arr.reduce((acc, cur) => {
    return `${acc}${cur[0]}${cur[1]}`;
  }, "");
};

const genTreeStrucStr = (
  startIdx: number,
  endIdx: number,
  rows: string[][],
  level: number
): string => {
  if (level == 4) {
    return "";
  }
  const arr = rows[level];
  const letters: string[][] = [];
  let nextStart = startIdx;
  for (let i = startIdx; i <= endIdx; i++) {
    if (i == endIdx || arr[i] != arr[i + 1]) {
      const s = genTreeStrucStr(nextStart, i, rows, level + 1);
      if (typeof s !== "undefined") {
        letters.push([arr[i], s]);
      } else {
        letters.push([arr[i], ""]);
      }
      nextStart = i + 1;
    }
  }
  return reduceArr(letters);
};

const getLectureTimeAsStr = (schedules: CourseSchedule[]): string => {
  if (schedules.length > 0) {
    const li = schedules
      .map((x) => ({ ...x, module: moduleToJa(x.module), day: dayToJa(x.day) }))
      .map((x): string[] => {
        // 0時限目は''と扱う
        const period = x.period === 0 ? "" : String(x.period);
        return [x.module[0], x.module[1], x.day, period];
      });
    const translocation = transpose(li);
    const txt = genTreeStrucStr(
      0,
      translocation[0].length - 1,
      translocation,
      0
    );
    return txt;
  } else {
    return "";
  }
};

/**
 * 日本語の学期名などを api の形式に合うようにフォーマットする
 */
export const formatSchedule = (schedule: Schedule[]): CourseSchedule[] => {
  return schedule.map((v) => ({
    module: jaToModule(v.module),
    day: jaToDay(v.day),
    period: Number(v.period),
    room: "",
  }));
};
