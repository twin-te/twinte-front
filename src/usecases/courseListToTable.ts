import { RegisteredCourse } from "~/api/@types";
import { WeekDay, weekdayNum, weekdays } from "~/entities/day";
import { BaseModule, modules } from "~/entities/module";
import { Table } from "~/entities/table";

/**
 * ホーム画面のテーブルを作成する。
 */
export const courseListToTable = (
  courses: RegisteredCourse[],
  bachelorMode: boolean
): Table => {
  const table = courses.reduce(
    (prevTable, course) => {
      const name = course.name ?? course.course?.name ?? "";
      const schedules = course.schedules ?? course.course?.schedules ?? [];
      const room = [...new Set(schedules.map((s) => s.room))];
      schedules
        .filter(
          (schedule) =>
            modules.includes(schedule.module as BaseModule) &&
            weekdays.includes(schedule.day as WeekDay) &&
            1 <= schedule.period &&
            schedule.period <= 8
        )
        .forEach((schedule) =>
          prevTable[schedule.module][weekdayNum(schedule.day as WeekDay)][
            schedule.period - 1
          ].push({
            name,
            room,
            id: course.id,
          })
        );

      return prevTable;
    },
    {
      SpringA: [
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
      ],
      SpringB: [
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
      ],
      SpringC: [
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
      ],
      FallA: [
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
      ],
      FallB: [
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
      ],
      FallC: [
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
      ],
    } as Table
  );

  if (bachelorMode) return table;
  modules.forEach((m) => {
    table[m] = table[m].map((arr) => arr.slice(0, 6));
  });
  return table;
};
