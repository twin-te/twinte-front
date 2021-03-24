import {
  fullModulesMap,
  fullWeekMap,
  fullPeriodMap,
  ParsedSchedule,
} from "~/entities/schedule";
import { CourseModule, Day, SearchCourseTimetableQuery } from "~/api/@types";
import { fullDays } from "~/entities/day";
import { fullModules } from "~/entities/module";
import { periods } from "~/entities/period";
import { Ports } from "~/adapter";
import { Schedule } from "~/entities/schedule";

const parseSchedules = (schedule: Schedule) => ({
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
 * 与えられてた module day period が schedules の条件に当てはまるか確認する
 */
const isWishinSchedules = (
  schedules: ParsedSchedule[],
  module: CourseModule,
  day: Day,
  period: number // TODO: 適切な型を作成
): boolean => {
  return schedules.some((schedule) => {
    if (
      schedule.modules.includes(module) &&
      schedule.days.includes(day) &&
      schedule.periods.includes(String(period))
    ) {
      return true;
    } else {
      return false;
    }
  });
};

/**
 * scheduels から timetable形式 のデータを生成する。
 */
const schedulesToTimetable = (
  schedules: ParsedSchedule[]
): SearchCourseTimetableQuery => {
  const timetable = {};
  for (const module of fullModules) {
    timetable[module] = {};
    for (const day of fullDays) {
      timetable[module][day] = {};
      for (const period of [0, ...periods]) {
        timetable[module][day][period] = isWishinSchedules(
          schedules,
          module,
          day,
          period
        );
      }
    }
  }
  // TODO:なんとかする
  return timetable as SearchCourseTimetableQuery;
};

export const searchCourse = ({ api }: Ports) => async (
  schedules: Schedule[],
  searchWords: string[]
) => {
  console.log(searchWords);
  try {
    const courses = await api.courses.search.$post({
      body: {
        year: 2020,
        searchMode: "Cover", // TODO: ユーザが選択できるようにする
        keywords: searchWords,
        timetable: schedulesToTimetable(
          schedules.map((v) => parseSchedules(v))
        ),
      },
    });
    return courses;
  } catch (error) {
    console.error(error);
    return [];
  }
};
