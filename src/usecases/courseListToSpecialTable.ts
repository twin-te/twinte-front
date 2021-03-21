import { CourseSchedule, RegisteredCourse } from "~/api/@types";
import { SpecialDay, specialDays } from "~/entities/day";
import {
  courseModulesNum,
  ModuleFlg,
  moduleFlgToDisplay,
} from "~/entities/module";
import { SpecialTable } from "~/entities/table";

/**
 * ホーム画面の特殊授業のテーブルを作成する。
 */
export const courseListToSpecialTable = (
  courses: RegisteredCourse[]
): SpecialTable => {
  // moduleをフラグで管理(ソートしやすいように、日本語へ変換しやすいようにするため)
  const unsortedSpecialTable = courses.reduce(
    (ust, course) => {
      const schedules =
        course.schedules ?? (course.course?.schedules as CourseSchedule[]);
      /**
       * 各"配列"が表示する講義一個分(SpecialCourse)の元となるデータとなる。
       * schedule.dayが'Intensive', 'Appointment', 'AnyTime'のどれかと一致するものを取り出す。
       */
      const specialSchedules = schedules.reduce(
        (ss, schedule) => {
          if (specialDays.includes(schedule.day as SpecialDay)) {
            ss[schedule.day].push(schedule);
          }
          return ss;
        },
        {
          Intensive: [],
          Appointment: [],
          AnyTime: [],
        } as {
          [key in SpecialDay]: CourseSchedule[];
        }
      );
      // 表示する講義一個分(SpecialCourse)の元となるデータのmoduleとroomの情報を集約し、unsortedSpecialTableに追加する。
      specialDays.forEach((sd) => {
        if (specialSchedules[sd].length === 0) return;
        const moduleFlg: ModuleFlg = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ];
        const roomSet: Set<string> = new Set();
        specialSchedules[sd].forEach((schedule) => {
          moduleFlg[courseModulesNum(schedule.module)] = true;
          roomSet.add(schedule.room);
        });
        ust[sd].push({
          moduleFlg,
          name: course.name ?? (course.course?.name as string),
          room: [...roomSet].join(", "),
          id: course.id,
        });
      });
      return ust;
    },
    {
      Intensive: [],
      Appointment: [],
      AnyTime: [],
    } as {
      [key in SpecialDay]: {
        moduleFlg: ModuleFlg;
        name: string;
        room: string;
        id: string;
      }[];
    }
  );
  // unsortedSpecialTableをソートし、SpecilalTableに変換する。
  return specialDays.reduce((st, sd) => {
    unsortedSpecialTable[sd].sort((prev, next) => {
      // [prev, next]の順
      if (prev.moduleFlg > next.moduleFlg) return -1;
      // [next, prev]の順
      if (prev.moduleFlg < next.moduleFlg) return 1;
      return prev.name <= next.name ? -1 : 1;
    });
    st[sd] = unsortedSpecialTable[sd].map((sc) => ({
      module: moduleFlgToDisplay(sc.moduleFlg),
      name: sc.name,
      room: sc.room,
      id: sc.id,
    }));
    return st;
  }, {} as SpecialTable);
};
