import { CourseSchedule, RegisteredCourse } from "~/api/@types";
import { weeksNum } from "~/entities/day";
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
            weeksNum(schedule.day) !== -1 &&
            0 <= schedule.period &&
            schedule.period <= 5
        )
        .forEach((schedule) =>
          prevTable[weeksNum(schedule.day)][schedule.period].push({
            name,
            room: schedule.room,
            courseId,
          })
        );

      return prevTable;
    },
    [
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
      [[], [], [], [], [], []],
    ] as Table
  );

  return table;
};
