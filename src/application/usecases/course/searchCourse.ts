import { Ports } from "~/application/ports";
import {
  Course,
  Module,
  NormalSchedule,
  NormalTimetable,
  Schedule,
  ScheduleMode,
  SpecialSchedule,
  SpecialTimetable,
} from "~/domain";
import {
  InternalServerError,
  isError,
  NetworkError,
  UnauthorizedError,
} from "~/domain/result";
import {
  initializeNormalTimetable,
  initializeSpecialTimetable,
  modules,
} from "~/domain/utils";
import { isNormalSchedule, isSpecialSchedule } from "~/domain/validations";

export const searchCourse = ({ courseRepository }: Ports) => async (
  year: number,
  keywords: string[],
  codes: string[],
  schedules: Schedule[],
  scheduleMode: ScheduleMode,
  onlyBlank: boolean,
  offset: number,
  limit: number
): Promise<
  Course[] | UnauthorizedError | NetworkError | InternalServerError
> => {
  const initValue = onlyBlank ? true : false;

  const result = await courseRepository.getRegisteredCoursesByYear(year);
  if (isError(result)) return result;
  const registeredNormalSchedules: NormalSchedule[] = result
    .map(({ schedules }) => schedules)
    .flat()
    .filter(isNormalSchedule);

  const comparedNormalSchedules: NormalSchedule[] = onlyBlank
    ? registeredNormalSchedules
    : schedules.filter(isNormalSchedule);
  const comparedSpecialSchedules: SpecialSchedule[] = schedules.filter(
    isSpecialSchedule
  );

  const normalTimetable: NormalTimetable<
    Module,
    boolean
  > = initializeNormalTimetable(modules, initValue);

  const specialTimetable: SpecialTimetable<
    Module,
    boolean
  > = initializeSpecialTimetable(modules, initValue);

  comparedNormalSchedules.forEach(({ module, day, period }) => {
    normalTimetable[module][day][period] = !initValue;
  });

  if (!onlyBlank) {
    comparedSpecialSchedules.forEach(({ module, day }) => {
      specialTimetable[module][day] = !initValue;
    });
  }

  return courseRepository.searchCourse(
    year,
    keywords,
    codes,
    { normal: normalTimetable, special: specialTimetable },
    onlyBlank ? "Cover" : scheduleMode,
    offset,
    limit
  );
};
