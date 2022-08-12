import { Ports } from "~/application/ports";
import { Module, NormalSchedule, NormalTimetable, Schedule } from "~/domain";
import {
  InternalServerError,
  NetworkError,
  Ok,
  PromiseResult,
  UnauthorizedError,
} from "~/domain/result";
import {
  initializeNormalTimetable,
  modules,
  normalDays,
  periods,
} from "~/domain/utils";
import { isNormalSchedule } from "~/domain/validations";

/**
 * Return true if the schedules do not overlap comparing to the schedules of registered courses. Return false otherwise.
 */
export const checkScheduleDuplicate = ({ courseRepository }: Ports) => async (
  year: number,
  schedules: Schedule[]
): PromiseResult<
  boolean,
  UnauthorizedError | NetworkError | InternalServerError
> => {
  const result = await courseRepository.getRegisteredCoursesByYear(year);
  if (result.isErr()) return result;

  const normalSchedules: NormalSchedule[] = schedules.filter(isNormalSchedule);
  const registeredNormalSchedules: NormalSchedule[] = result.value
    .map(({ schedules }) => schedules)
    .flat()
    .filter(isNormalSchedule);

  const schedulesToTimetable = (
    schedules: NormalSchedule[]
  ): NormalTimetable<Module, boolean> => {
    const timetable: NormalTimetable<
      Module,
      boolean
    > = initializeNormalTimetable(modules, false);

    schedules.forEach(({ module, day, period }) => {
      timetable[module][day][period] = true;
    });

    return timetable;
  };

  const timetable: NormalTimetable<Module, boolean> = schedulesToTimetable(
    normalSchedules
  );
  const registeredTimetable: NormalTimetable<
    Module,
    boolean
  > = schedulesToTimetable(registeredNormalSchedules);

  return new Ok(
    !modules.some((module) =>
      normalDays.some((day) =>
        periods.some(
          (period) =>
            timetable[module][day][period] &&
            registeredTimetable[module][day][period]
        )
      )
    )
  );
};
