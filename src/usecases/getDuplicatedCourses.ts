import { Ports } from "~/adapter";
import {
  Course,
  CourseSchedule,
  RegisteredCourse,
  RegisteredCourseWithoutID,
} from "~/api/@types";
import { BaseModule, modules } from "~/entities/module";
import { Day, week } from "~/entities/day";

/**
 * 引き数に与えられた schedules が既に登録してあるコース
 * の schedule と重複してないかどうか確認する
 * ただし「コマ」で表現できない日程は必ず重複しない
 */
export const isSchedulesDuplicated = ({ store }: Ports) => (
  targetSchedules: CourseSchedule[]
): boolean => {
  return (
    targetSchedules?.some((targetSchedule) => {
      return store.getters.courses.some((c: RegisteredCourse) => {
        const registeredSchedules = c.schedules ?? c.course?.schedules;
        return registeredSchedules?.some(
          (s: CourseSchedule) =>
            modules.includes(targetSchedule.module as BaseModule) &&
            week.includes(targetSchedule.day as Day) &&
            targetSchedule.period !== 0 &&
            targetSchedule.module === s.module &&
            targetSchedule.day === s.day &&
            targetSchedule.period === s.period
        );
      });
    }) ?? false
  );
};

/**
 * 引き数に与えられたコースの schedule が既に登録してあるコース
 * の schedule と重複してないかどうか確認する
 */
// TODO: 2つのコースに対応させる
export const isCourseDuplicated = ({ store }: Ports) => <
  T extends Course | RegisteredCourseWithoutID
>(
  target: T
): boolean => {
  if (target.schedules == undefined) {
    return false;
  }
  return isSchedulesDuplicated({ store } as Ports)(target.schedules);
};

/**
 * 追加しようとしている講義から、すでに登録済みの講義とコマが被っている講義を取り出す。
 */
export const getDuplicatedCourses = ({ store }: Ports) => <
  T extends Course | RegisteredCourseWithoutID
>(
  targets: T[]
): T[] => targets.filter((v) => isCourseDuplicated({ store } as Ports)(v));
