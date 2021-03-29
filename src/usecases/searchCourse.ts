import {
  fullModulesMap,
  fullWeekMap,
  fullPeriodMap,
} from "~/entities/schedule";
import { SearchCourseTimetableQuery } from "~/api/@types";
import { dayToJa, fullDays, ScheduleDayJa } from "~/entities/day";
import { fullModules, moduleToJa, ScheduleModuleJa } from "~/entities/module";
import { isValidStatus } from "~/usecases/api";
import { NetworkAccessError, NetworkError } from "~/usecases/error";
import { periods } from "~/entities/period";
import { Ports } from "~/adapter";
import { Schedule } from "~/entities/schedule";

type ParsedSchedule = {
  modules: string[];
  days: string[];
  periods: string[];
};

/**
 * ex) module: "その他" -> modules: ["SummerVacation", "SpringVacation"]
 */
const parseSchedules = (schedule: Schedule): ParsedSchedule => ({
  modules: Object.keys(fullModulesMap).filter((k) =>
    fullModulesMap[k].includes(schedule.module)
  ),
  days: Object.keys(fullWeekMap).filter((k) =>
    fullWeekMap[k].includes(schedule.day)
  ),
  periods: Object.keys(fullPeriodMap).filter((k) =>
    fullPeriodMap[k].includes(schedule.period)
  ),
});

/**
 * 与えられた module day period が schedules の指す範囲に当てはまるか確認する
 */
const isWishinSchedules = (
  schedules: ParsedSchedule[],
  module: ScheduleModuleJa,
  day: ScheduleDayJa,
  period: number // TODO: 適切な型を作成
): boolean => {
  return schedules.some(
    (schedule) =>
      schedule.modules.includes(module) &&
      schedule.days.includes(day) &&
      schedule.periods.includes(String(period))
  );
};

/**
 * scheduels から timetable形式 のデータを生成する。
 */
const schedulesToTimetable = (
  schedules: ParsedSchedule[]
): SearchCourseTimetableQuery => {
  const timetable: Partial<SearchCourseTimetableQuery> = {};
  for (const module of fullModules) {
    timetable[module] = {};
    for (const day of fullDays) {
      timetable[module][day] = {};
      for (const period of [0, ...periods]) {
        timetable[module][day][period] = isWishinSchedules(
          schedules,
          moduleToJa(module),
          dayToJa(day),
          period
        );
      }
    }
  }
  return timetable as SearchCourseTimetableQuery;
};

export const searchCourse = ({ api }: Ports) => async (
  schedules: Schedule[],
  searchWords: string[]
) => {
  console.log(searchWords);
  const { body, status, originalResponse } = await api.courses.search
    .post({
      body: {
        year: 2020,
        searchMode: "Cover", // TODO: ユーザが選択できるようにする
        keywords: searchWords,
        timetable: schedulesToTimetable(schedules.map(parseSchedules)),
      },
    })
    .catch(() => {
      throw new NetworkError();
    });
  if (isValidStatus(status)) {
    return body;
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};
