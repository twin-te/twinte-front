import { Ports } from "~/application/ports";
import { Course, SearchMode } from "~/domain/course";
import {
  InternalServerError,
  isResultError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { Module } from "~/domain/module";
import { isNormalSchedule } from "~/domain/schedule";
import { Timetable } from "~/domain/timetable";

export const searchCourse = ({ courseRepository }: Ports) => async (
  year: number,
  keywords: string[],
  codes: string[],
  timetable: Timetable<Module, boolean>,
  onlyBlank: boolean,
  mode: SearchMode,
  offset: number,
  limit: number
): Promise<
  Course[] | UnauthorizedError | NetworkError | InternalServerError
> => {
  if (onlyBlank) {
    const result = await courseRepository.getRegisteredCoursesByYear(year);
    if (isResultError(result)) return result;

    result
      .map(({ schedules }) => schedules)
      .flat()
      .filter(isNormalSchedule)
      .forEach(({ module, day, period }) => {
        timetable.normal[module][day][period] = false;
      });
  }

  return courseRepository.searchCourse(
    year,
    keywords,
    codes,
    timetable,
    onlyBlank ? "Contain" : mode,
    offset,
    limit
  );
};
