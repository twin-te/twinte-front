import { CourseSchedule, RegisteredCourse } from "~/api/@types";
import { weekdayNum } from "~/entities/day";
import { moduleFromJa, ModuleJa } from "~/entities/module";
import { Table } from "~/entities/table";

/**
 * ホーム画面のテーブルを作成する。
 */
export const courseListToTable = (
  courses: RegisteredCourse[],
  moduleJa: ModuleJa
): Table => {
  const module = moduleFromJa(moduleJa);
  const table = courses.reduce(
    (prevTable, course) => {
      const name = course.name ?? (course.course?.name as string);
      const courseId = course.id;
      const schedules =
        course.schedules ?? (course.course?.schedules as CourseSchedule[]);
      schedules
        .filter(
          (schedule) =>
            schedule.module === module &&
            weekdayNum(schedule.day) !== -1 &&
            1 <= schedule.period &&
            schedule.period <= 8
        )
        .forEach((schedule) =>
          prevTable[weekdayNum(schedule.day)][schedule.period - 1].push({
            name,
            room: schedule.room,
            courseId,
          })
        );

      return prevTable;
    },
    [
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], []],
    ] as Table
  );

  if (table.some((arr) => arr[6].length !== 0 || arr[7].length !== 0))
    return table;
  return table.map((arr) => arr.slice(0, 6));
};
