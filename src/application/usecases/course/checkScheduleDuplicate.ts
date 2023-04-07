import { Ports } from "~/application/ports";
import { RegisteredCourse } from "~/domain/course";
import { normalDays } from "~/domain/day";
import {
  InternalServerError,
  isResultError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/error";
import { Module, modules } from "~/domain/module";
import { periods } from "~/domain/period";
import { isNormalSchedule, NormalSchedule, Schedule } from "~/domain/schedule";
import {
  NormalTimetable,
  normalSchedulesToNormalTimetable,
} from "~/domain/timetable";

/**
 * Return true if the schedules do not overlap comparing to the schedules of registered courses. Return false otherwise.
 */
export const checkScheduleDuplicate = ({ courseRepository }: Ports) => async (
  year: number,
  schedules: Schedule[],
  registered?: RegisteredCourse[]
): Promise<
  boolean | UnauthorizedError | NetworkError | InternalServerError
> => {
  let result: RegisteredCourse[];
  if (registered == null) {
    const res = await courseRepository.getRegisteredCoursesByYear(year);
    if (isResultError(res)) return res;
    result = res;
  } else {
    result = registered;
  }

  const normalSchedules: NormalSchedule[] = schedules.filter(isNormalSchedule);
  const registeredNormalSchedules: NormalSchedule[] = result
    .map(({ schedules }) => schedules)
    .flat()
    .filter(isNormalSchedule);

  const timetable: NormalTimetable<
    Module,
    boolean
  > = normalSchedulesToNormalTimetable(normalSchedules);
  const registeredTimetable: NormalTimetable<
    Module,
    boolean
  > = normalSchedulesToNormalTimetable(registeredNormalSchedules);

  return !modules.some((module) =>
    normalDays.some((day) =>
      periods.some(
        (period) =>
          timetable[module][day][period] &&
          registeredTimetable[module][day][period]
      )
    )
  );
};
