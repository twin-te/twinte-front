import { CourseSchedule, RegisteredCourse } from "~/api/@types";
import { isWeekDay, WeekDay, weekdayNum, weekdays } from "~/entities/day";
import { BaseModule, isBaseModule, modules } from "~/entities/module";
import { Period } from "~/entities/period";
import { Table } from "~/entities/table";

/**
 * n次元配列を作成する.
 * @param ndims n次元配列の形状
 * @param initVal 要素の初期値
 * @returns n次元配列
 */
export const createNdarray = (
  ndims: number[],
  initVal: any = undefined
): any[] => {
  const ret = new Array(ndims[0]);

  if (ndims.length === 1) ret.fill(initVal);
  else {
    for (let i = 0; i < ndims[0]; i++) {
      ret[i] = createNdarray(ndims.slice(1), initVal);
    }
  }

  return ret;
};

type OrdinarySchedule = CourseSchedule & {
  module: BaseModule;
  day: WeekDay;
  period: Period;
};

const isOrdinarySchedule = (schedule: CourseSchedule) =>
  isBaseModule(schedule.module) &&
  isWeekDay(schedule.day) &&
  1 <= schedule.period &&
  schedule.period <= 8;

/**
 * ホーム画面の通常授業のテーブルを作成する.
 * 院生モードのときは7,8限を表示する.
 * 土曜授業を表示するかは表示設定に従う.
 */
export const courseListToTable = (
  courses: RegisteredCourse[],
  saturdayCourseMode: boolean,
  bachelorMode: boolean
): Table => {
  const table = courses.reduce<Table>(
    (table, course) => {
      const name = course.name ?? course.course?.name ?? "";
      const schedules = course.schedules ?? course.course?.schedules ?? [];
      const room = [...new Set(schedules.map((s) => s.room))].join(",");
      schedules
        .filter((schedule): schedule is OrdinarySchedule =>
          isOrdinarySchedule(schedule)
        )
        .forEach((schedule) =>
          table[schedule.module][weekdayNum(schedule.day as WeekDay)][
            schedule.period - 1
          ].push({
            name,
            room,
            id: course.id,
          })
        );

      return table;
    },
    {
      SpringA: createNdarray([6, 8, 0]),
      SpringB: createNdarray([6, 8, 0]),
      SpringC: createNdarray([6, 8, 0]),
      FallA: createNdarray([6, 8, 0]),
      FallB: createNdarray([6, 8, 0]),
      FallC: createNdarray([6, 8, 0]),
    }
  );

  if (!saturdayCourseMode) {
    modules.forEach((m) => {
      table[m] = table[m].slice(0, 5);
    });
  }

  if (!bachelorMode) {
    modules.forEach((m) => {
      table[m] = table[m].map((arr) => arr.slice(0, 6));
    });
  }

  return table;
};
