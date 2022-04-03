import { CourseModule, CourseSchedule } from "~/api/@types";
import {
  Day,
  dayToJa,
  isDay,
  SpecialDayJa,
  specialDayMap,
  week,
  weekNum,
} from "~/entities/day";
import {
  FullModule,
  fullModules,
  moduleToFullModuleJa,
} from "~/entities/module";

/** periodを文字形式(ex 秋AB 火1,2)に変換する関数
 * データが不完全な時""を返す
 */
export const periodToString = (schedules: CourseSchedule[]): string => {
  /** module(8) × day(7) × period(8)を表現 */
  const regularSchedules: {
    [key in Exclude<CourseModule, "Unknown">]: [
      number,
      number,
      number,
      number,
      number,
      number,
      number
    ];
  } = {
    SpringA: [0, 0, 0, 0, 0, 0, 0],
    SpringB: [0, 0, 0, 0, 0, 0, 0],
    SpringC: [0, 0, 0, 0, 0, 0, 0],
    SummerVacation: [0, 0, 0, 0, 0, 0, 0],
    FallA: [0, 0, 0, 0, 0, 0, 0],
    FallB: [0, 0, 0, 0, 0, 0, 0],
    FallC: [0, 0, 0, 0, 0, 0, 0],
    SpringVacation: [0, 0, 0, 0, 0, 0, 0],
  };

  const specialSchedules: {
    [key in FullModule]?: SpecialDayJa;
  } = {};
  /**
   * ex.) { SpringC: "応談" }
   */

  schedules.forEach((schedule) => {
    if (schedule.module === "Unknown" || schedule.day === "Unknown") return;
    if (isDay(schedule.day)) {
      if (schedule.period < 1 || 8 < schedule.period) return;
      regularSchedules[schedule.module][weekNum(schedule.day as Day)] |=
        1 << (schedule.period - 1);
    } else {
      specialSchedules[schedule.module] = specialDayMap[schedule.day];
    }
  });

  const convertedRegularSchedules = fullModules.reduce(
    (convertedRegularSchedules, module) => {
      // moduleごとにdayAndPeriodを作成
      convertedRegularSchedules[module] = regularSchedules[
        module
      ].reduce<string>(
        (dayAndPeriod, periodFlg, index, self) => {
          // dayをみる
          if (periodFlg === 0) return dayAndPeriod;
          let tmp: string = dayToJa(week[index]);
          let idx = self.indexOf(periodFlg, index + 1);
          while (idx !== -1) {
            tmp += dayToJa(week[idx]);
            self[idx] = 0;
            idx = self.indexOf(periodFlg, idx + 1);
          }
          // periodをみる
          let period: string = "";
          for (let i = 0; i < 8; i++) {
            if ((periodFlg & (1 << i)) === 0) continue;
            const start = i;
            while ((periodFlg & (0b111 << i)) === 0b111 << i) i++;
            period += period ? "," : "";
            period += start !== i ? `${start + 1}-${++i + 1}` : i + 1;
          }
          tmp += period;

          dayAndPeriod += dayAndPeriod ? " " + tmp : tmp;
          return dayAndPeriod;
        },
        "" // ex.) "月1,2" や "水1 木3"
      );
      return convertedRegularSchedules;
    },
    {
      SpringA: "",
      SpringB: "",
      SpringC: "",
      SummerVacation: "",
      FallA: "",
      FallB: "",
      FallC: "",
      SpringVacation: "",
    }
    /**
     * ex.)
     * {
     *   Annual: "",
     *   SpringA: "月1,2",
     *   SpringB: "月1,2",
     *   SpringC: "水1 木3",
     *   SummerVacation: "",
     *   FallA: "",
     *   FallB: "",
     *   FallC: "",
     *   SpringVacation: "",
     * }
     */
  );

  return fullModules
    .reduce<{ module: string; date: string }[]>(
      (acc, module) => {
        if (convertedRegularSchedules[module] !== "")
          acc.push({
            module: moduleToFullModuleJa(module),
            date: convertedRegularSchedules[module],
          });
        if (module in specialSchedules)
          acc.push({
            module: moduleToFullModuleJa(module),
            date: specialSchedules[module] ?? "",
          });
        return acc;
      },
      [] // ex.) [{ module: "春A", date: "月1,2" }, { module: "春B", date: "月1,2" }, { module: "春C", date: "水1 木3" }, { module: "春C", date: "応談" }]
    )
    .reduce<{ module: string; date: string }[]>(
      (acc, cur) => {
        if (new RegExp("[ABC]$").test(cur.module)) {
          const idx = acc.findIndex(
            (tar) =>
              tar.module.charAt(0) === cur.module.charAt(0) && // 季節の確認 "春" === "春"
              new RegExp("[ABC]$").test(tar.module) && // 春ABC, 秋ABC だけ結合する
              cur.date === tar.date // dayとperiodまたはspecialDayを確認 "月1,2" === "月1,2" や "応談" === "応談"
          );
          if (idx !== -1) {
            acc[idx].module += cur.module.slice(-1);
            return acc;
          }
        }
        acc.push(cur);
        return acc;
      },
      [] // ex.) [{ module: "春AB", date: "月1,2" }, { module: "春C", date: "水1 木3" }, { module: "春C", date: "応談" }]
    )
    .reduce<{ module: string; date: string }[]>(
      (acc, cur) => {
        const idx = acc.findIndex((tar) => cur.module === tar.module);
        if (idx !== -1) acc[idx].date += " " + cur.date;
        else acc.push(cur);
        return acc;
      },
      [] // ex.) [{ module: "春AB", date: "月1,2" }, { module: "春C", date: "水1 木3 応談" }]
    )
    .map((arr) => `${arr.module} ${arr.date}`)
    .join(" / ");
};
