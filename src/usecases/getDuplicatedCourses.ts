import { Ports } from "~/adapter";
import {
  Course,
  CourseSchedule,
  RegisteredCourse,
  RegisteredCourseWithoutID,
} from "~/api/@types";

/**
 * 引き数に与えられたコースの schedule が既に登録してあるコース
 * の schedule と重複してないかどうか確認する
 */
export const isCourseDuplicated = ({ store }: Ports) => <
  T extends Course | RegisteredCourseWithoutID
>(
  target: T
): boolean => {
  return (
    target.schedules?.some((targetSchedule) => {
      return store.getters.courses.some((c: RegisteredCourse) => {
        return c.course?.schedules.some(
          (s: CourseSchedule) =>
            targetSchedule.module === s.module &&
            targetSchedule.day === s.day &&
            targetSchedule.period === s.period
        );
      });
    }) ?? false
  );
};

/**
 * 追加しようとしている講義から、すでに登録済みの講義とコマが被っている講義を取り出す。
 */
export const getDuplicatedCourses = ({ store }: Ports) => <
  T extends Course | RegisteredCourseWithoutID
>(
  targets: T[]
): T[] => targets.filter((v) => isCourseDuplicated({ store } as Ports)(v));
