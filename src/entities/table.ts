import { CourseDay, CourseSchedule, RegisteredCourse } from "~/api/@types";
import { SpecialDay } from "./day";
import {
  BaseModule,
  fullModulesNum,
  ModuleFlg,
  moduleFlgToDisplay,
} from "./module";

export type CourseState = {
  id: string;
  name: string;
  room: string;
};

// Specialはホーム画面の特殊を指す
export type SpecialCourseState = {
  id: string;
  name: string;
  room: string;
  module: string[];
};

/**
 * ```
 * table
 *   [曜日 月~金]
 *   [時限 0~7]
 *   [該当する科目は一つとは限らないので配列（重複しなければ0番目に目的の CourseState が入っている）]
 * ```
 */
export type Table = Record<BaseModule, CourseState[][][]>;

export type SpecialTable = {
  [key in SpecialDay | "Weekend"]: SpecialCourseState[];
};

/**
 * 講義の中からscheudle.dayがtargetDaysに含まれる講義を抽出し、SpecialCourseStateに変換する
 */
export const createSpecialCourseStateList = (
  courses: RegisteredCourse[],
  targetDays: CourseDay[],
  filter = true
): SpecialCourseState[] => {
  const unsortedCourses = courses.reduce<
    {
      moduleFlg: ModuleFlg;
      name: string;
      room: string;
      id: string;
    }[]
  >((acc, course) => {
    const schedules: CourseSchedule[] =
      course.schedules ?? course.course?.schedules ?? [];
    const moduleFlg = schedules.reduce<ModuleFlg>(
      (moduleFlg, schedule) => {
        if (schedule.module === "Unknown" || !targetDays.includes(schedule.day))
          return moduleFlg;
        moduleFlg[fullModulesNum(schedule.module)] = true;
        return moduleFlg;
      },
      [false, false, false, false, false, false, false, false]
    );
    if (filter && moduleFlg.every((flg) => !flg)) return acc;
    const name = course.name ?? course.course?.name ?? "";
    const room = [...new Set(schedules.map((s) => s.room))].join(",");
    acc.push({ moduleFlg, name, room, id: course.id });

    return acc;
  }, []);

  // 比較する インデックス より前に同じ要素が存在するのか (hasSame) で大小関係が異なる
  // [T, F ...] < [F, T ...] 春A < 春B
  // [T, F ...] > [T, T ...] 春A < 春AB
  return unsortedCourses
    .sort((prev, next) => {
      let hasSame = false;
      for (let i = 0; i < 8; i++) {
        if (prev.moduleFlg[i] && next.moduleFlg[i]) hasSame = true;
        if (prev.moduleFlg[i] === next.moduleFlg[i]) continue;
        const ans = Number(prev.moduleFlg[i]) - Number(next.moduleFlg[i]);
        return hasSame ? ans : -ans;
      }
      return prev.name.localeCompare(next.name);
    })
    .map<SpecialCourseState>((c) => ({
      module: moduleFlgToDisplay(c.moduleFlg),
      name: c.name,
      room: c.room,
      id: c.id,
    }));
};
