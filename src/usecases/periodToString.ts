import { CourseModule, CourseSchedule } from "~/api/@types";
import {
  dayToJa,
  SpecialDay,
  specialDayMap,
  weeks,
  weekdayNum,
} from "~/entities/day";
import { courseModules, moduleToJa } from "~/entities/module";

/** periodを文字形式(ex 秋AB 火1,2)に変換する関数 */
export const periodToString = (schedules: CourseSchedule[]): string => {
  /** module(9) × day(6) × period(8)を表現 */
  const regularSchedules: {
    [key in Exclude<CourseModule, "Unknown">]: [
      number,
      number,
      number,
      number,
      number,
      number
    ];
  } = {
    Annual: [0, 0, 0, 0, 0, 0],
    SpringA: [0, 0, 0, 0, 0, 0],
    SpringB: [0, 0, 0, 0, 0, 0],
    SpringC: [0, 0, 0, 0, 0, 0],
    SummerVacation: [0, 0, 0, 0, 0, 0],
    FallA: [0, 0, 0, 0, 0, 0],
    FallB: [0, 0, 0, 0, 0, 0],
    FallC: [0, 0, 0, 0, 0, 0],
    SpringVacation: [0, 0, 0, 0, 0, 0],
  };

  const specialSchedules: {
    [key in Exclude<CourseModule, "Unknown">]?: SpecialDay;
  } = {};
  /**
   * ex.) { SpringC: "応談j" }
   */

  schedules.forEach((schedule) => {
    if (schedule.module === "Unknown" || schedule.day === "Unknown") return;
    if (weeks.includes(schedule.day)) {
      if (schedule.period < 1 || 8 < schedule.period) return;
      regularSchedules[schedule.module][weekdayNum(schedule.day)] |=
        1 << (schedule.period - 1);
    } else {
      specialSchedules[schedule.module] = specialDayMap[schedule.day];
    }
  });

  const convertedRegularSchedules = courseModules.reduce(
    (convertedRegularSchedules, module) => {
      // moduleごとにdayAndPeriodを作成
      convertedRegularSchedules[module] = regularSchedules[
        module
      ].reduce<string>(
        (dayAndPeriod, periodFlg, index, self) => {
          // dayをみる
          if (periodFlg === 0) return dayAndPeriod;
          let tmp: string = dayToJa(weeks[index]);
          let idx = self.indexOf(periodFlg, index + 1);
          while (idx !== -1) {
            tmp += dayToJa(weeks[idx]);
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
      Annual: "",
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

  return courseModules
    .reduce<[string, string][]>(
      (acc, module) => {
        if (convertedRegularSchedules[module] !== "")
          acc.push([moduleToJa(module), convertedRegularSchedules[module]]);
        if (module in specialSchedules)
          acc.push([moduleToJa(module), specialSchedules[module]]);
        return acc;
      },
      [] // ex.) [["春A", "月1,2"], ["春B", "月1,2"], ["春C", "水1 木3"], ["春C", "応談"]]
    )
    .reduce<[string, string][]>(
      (acc, cur) => {
        if (new RegExp("[ABC]$").test(cur[0])) {
          const idx = acc.findIndex(
            (tar) =>
              tar[0].charAt(0) === cur[0].charAt(0) && // 季節の確認 "春" === "春"
              new RegExp("[ABC]$").test(tar[0]) && // 春ABC, 秋ABC だけ結合する
              cur[1] === tar[1] // dayとperiodまたはspecialDayを確認 "月1" === "月1"
          );
          if (idx !== -1) {
            acc[idx][0] += cur[0].slice(-1);
            return acc;
          }
        }
        acc.push(cur);
        return acc;
      },
      [] // ex.) [["春AB", "月1,2"], ["春C", "水1 木3"], ["春C", "応談"]]
    )
    .reduce<[string, string][]>(
      (acc, cur) => {
        const idx = acc.findIndex((tar) => cur[0] === tar[0]);
        if (idx !== -1) acc[idx][1] += " " + cur[1];
        else acc.push(cur);
        return acc;
      },
      [] // ex.) [["春AB", "月1,2"], ["春C", "水1 木3 応談"]]
    )
    .map((arr) => `${arr[0]} ${arr[1]}`)
    .join(" / ");
};
