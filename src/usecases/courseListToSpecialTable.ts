import { CourseSchedule, RegisteredCourse } from "~/api/@types";
import { SpecialDay, specialDays } from "~/entities/day";
import {
  fullModulesNum,
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
  const unsortedSpecialTable = courses.reduce<
    {
      [key in SpecialDay | "Weekend"]: {
        moduleFlg: ModuleFlg;
        name: string;
        room: string;
        id: string;
      }[];
    }
  >(
    (ust, course) => {
      const schedules = course.schedules ?? course.course?.schedules ?? [];
      /**
       * 各"配列"が表示する講義一個分(SpecialCourse)の元となるデータとなる。
       * schedule.dayが'Intensive', 'Appointment', 'AnyTime'のどれかと一致するものを取り出す。
       */
      const specialSchedules = schedules.reduce<
        { [key in SpecialDay | "Weekend"]: CourseSchedule[] }
      >(
        (ss, schedule) => {
          if ([...specialDays, "Sat", "Sun"].includes(schedule.day)) {
            ss[
              schedule.day === "Sat" || schedule.day === "Sun"
                ? "Weekend"
                : schedule.day
            ].push(schedule);
          }
          return ss;
        },
        {
          Intensive: [],
          Appointment: [],
          AnyTime: [],
          Weekend: [],
        }
      );
      // 表示する講義一個分(SpecialCourse)の元となるデータのmoduleとroomの情報を集約し、unsortedSpecialTableに追加する。
      [...specialDays, "Weekend"].forEach((sd) => {
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
        ];
        const roomSet: Set<string> = new Set();
        specialSchedules[sd].forEach((schedule) => {
          if (schedule.module === "Unknown") return;
          moduleFlg[fullModulesNum(schedule.module)] = true;
          roomSet.add(schedule.room);
        });
        ust[sd].push({
          moduleFlg,
          name: course.name ?? course.course?.name ?? "",
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
      Weekend: [],
    }
  );
  // unsortedSpecialTableをソートし、SpecilalTableに変換する。
  return [...specialDays, "Weekend"].reduce<SpecialTable>(
    (st, sd) => {
      unsortedSpecialTable[sd].sort((prev, next) => {
        // "夏休"と"夏休,春休"の大小関係を考慮
        // モジュールの始まりが同じなら早く終わる方をより上に表示する
        let hasSame = false;
        for (let i = 0; i < 8; i++) {
          if (prev.moduleFlg[i] && next.moduleFlg[i]) hasSame = true;
          if (prev.moduleFlg[i] === next.moduleFlg[i]) continue;
          const ans = Number(prev.moduleFlg[i]) - Number(next.moduleFlg[i]);
          return hasSame ? ans : -ans;
        }
        return prev.name.localeCompare(next.name);
      });
      st[sd] = unsortedSpecialTable[sd].map((sc) => ({
        module: moduleFlgToDisplay(sc.moduleFlg),
        name: sc.name,
        room: sc.room,
        id: sc.id,
      }));
      return st;
    },
    {
      Intensive: [],
      Appointment: [],
      AnyTime: [],
      Weekend: [],
    }
  );
};
