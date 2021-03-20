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
  const table: Table = [
    [[], [], [], [], [], []],
    [[], [], [], [], [], []],
    [[], [], [], [], [], []],
    [[], [], [], [], [], []],
    [[], [], [], [], [], []],
  ];
  courses.forEach((course) => {
    const name = course.name ?? (course.course?.name as string);
    const courseId = course.id;
    const schedules =
      course.schedules ?? (course.course?.schedules as CourseSchedule[]);
    schedules.forEach((schedule) => {
      if (schedule.module !== module) return;
      const weekNum = weeksNum(schedule.day);
      if (weekNum === -1) return;
      const period = schedule.period;
      if (period < 0 || 5 < period) return;
      table[weekNum][period].push({
        name,
        room: schedule.room,
        courseId,
      });
    });
  });

  return table;
};
