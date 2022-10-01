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

export type SpecialCourseState = {
  id: string;
  name: string;
  room: string;
  module: string[];
};

/**
 * ```
 * ホーム画面で通常授業を表示するためのデータ
 * CourseStateの3次元配列で表現する.
 *
 * [ 曜日 : 月,火,水,木,金,(土) ]
 * [ 時限 : 1,2,3,4,5,6,(7,8) ]
 * [ 該当する科目の配列 ]
 * ```
 */
export type Table = Record<BaseModule, CourseState[][][]>;

/**
 * ホーム画面の特殊授業を表示するためのデータ
 */
export type SpecialTable = Record<SpecialDay, SpecialCourseState[]>;

/**
 * 授業の中からscheudle.dayがtargetDaysに含まれる授業を抽出し、SpecialCourseStateに変換する.
 * その際、モジュールを基準にソートを行う.
 */
export const createSpecialCourseStateList = (
  courses: RegisteredCourse[],
  targetDays: CourseDay[],
  filter = true // モジュールが指定されていない授業を除外するかどうか
): SpecialCourseState[] => {
  const unsortedCourses = courses.reduce<
    {
      moduleFlg: ModuleFlg;
      name: string;
      room: string;
      id: string;
    }[]
  >((unsortedCourses, course) => {
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
    if (filter && moduleFlg.every((flg) => !flg)) return unsortedCourses;
    const name = course.name ?? course.course?.name ?? "";
    const room = [...new Set(schedules.map((s) => s.room))].join(",");
    unsortedCourses.push({ moduleFlg, name, room, id: course.id });

    return unsortedCourses;
  }, []);

  // 比較するモジュールより前に同じモジュールが存在するのか (hasSame) で大小関係が異なる
  // ans: [T, F, ...] - [F, T, ...] =  1, hasSame: False -> 春A < 春B
  // ans: [T, F, ...] - [T, T, ...] = -1, hasSame: True  -> 春A < 春AB
  // ans: [F, T, ...] - [T, T, ...] = -1, hasSame: False -> 春B > 春AB
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
