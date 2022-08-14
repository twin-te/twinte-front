import { Module, Period, Timetable } from "~/domain";
import {
  days,
  modules,
  normalDays,
  periods,
  specialDays,
} from "~/domain/utils";
import { initializeObject } from "~/utils";
import * as ApiType from "../aspida/@types";

export const timetableToApi = (
  timetable: Timetable<Module, boolean>
): ApiType.SearchCourseTimetableQuery => {
  const apiPeriods: ("0" | Period)[] = ["0", ...periods];

  const apiTimetable = initializeObject(
    modules,
    initializeObject(days, initializeObject(apiPeriods, false))
  );

  modules.forEach((module) => {
    normalDays.forEach((day) => {
      periods.forEach((period) => {
        apiTimetable[module][day][period] =
          timetable["normal"][module][day][period];
      });
    });

    specialDays.forEach((day) => {
      apiPeriods.forEach((period) => {
        apiTimetable[module][day][period] = timetable["special"][module][day];
      });
    });
  });

  return apiTimetable;
};
