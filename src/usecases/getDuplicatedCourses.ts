import { Ports } from "~/adapter";
import {
  Course,
  CourseSchedule,
  RegisteredCourse,
  RegisteredCourseWithoutID,
} from "~/api/@types";
import { weeksNum } from "~/entities/day";
import { modulesNum } from "~/entities/module";

export const scheduleToNum = (
  schedule: CourseSchedule
): { moduleNum: number; weekNum: number; period: number } => {
  return {
    moduleNum: modulesNum(schedule.module),
    weekNum: weeksNum(schedule.day),
    period: schedule.period,
  };
};

/**
 * 追加しようとしている講義から、すでに登録済みの講義とコマが被っている講義を取り出す。
 */

export const getDuplicatedCourses = <
  T extends Course | RegisteredCourseWithoutID
>(
  { store }: Ports,
  target: T[]
): T[] => {
  const courses: RegisteredCourse[] = store.getters.courses;

  /**
   * 各コマの状態（すでに授業が登録されているか）を持つ
   * module 6
   * day 5
   * period 6
   * @example
   * 春B 月曜 2限 -> (30 * 1) + (6 * 0) + 2 = 31;
   */
  const flg: boolean[] = new Array(181).fill(false); // indexは1から始める
  courses.forEach((course) => {
    const schedules =
      course.schedules ?? (course.course?.schedules as CourseSchedule[]);
    schedules.forEach((schedule) => {
      const { moduleNum, weekNum, period } = scheduleToNum(schedule);
      if (moduleNum === -1 || weekNum === -1) return;
      const i = moduleNum * 30 + weekNum * 6 + period;
      flg[i] = true;
    });
  });

  const checkDuplicated = (schedules: CourseSchedule[]): boolean => {
    return schedules.some((schedule) => {
      const { moduleNum, weekNum, period } = scheduleToNum(schedule);
      if (moduleNum === -1 || weekNum === -1) return false;
      const i = moduleNum * 30 + weekNum * 6 + period;
      return flg[i];
    });
  };

  return target.filter((course) => {
    const schedules = course.schedules as CourseSchedule[];
    return checkDuplicated(schedules);
  });
};
