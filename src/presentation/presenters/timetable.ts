import { RegisteredCourse } from "~/domain/course";
import { NormalDay, SpecialDay } from "~/domain/day";
import { Module } from "~/domain/module";
import { Period } from "~/domain/period";
import { isNormalSchedule, isSpecialSchedule } from "~/domain/schedule";
import { Tag } from "~/domain/tag";
import { initializeObject, isContained, removeDuplicate } from "~/utils";
import { DiaplayNormalTimetable, DisplaySpecialTimetable, DisplayTimetable } from "../viewmodels/timetable";
import { registeredCourseToDisplay } from "./course";

export const getDisplayTimetable = <M extends Module, ND extends NormalDay, SD extends SpecialDay, P extends Period>(
  courses: RegisteredCourse[],
  tags: Tag[],
  targetModules: M[],
  targetNormalDays: ND[],
  targetSpecialDays: SD[],
  targetPeriods: P[]
): DisplayTimetable<M, ND, SD, P> => {
  const courseIdToSchedules = courses.reduce<
    Record<
      string,
      {
        normal: { module: M; day: ND; period: P }[];
        special: { module: M; day: SD }[];
      }
    >
  >((map, course) => {
    if (!(course.id in map)) {
      map[course.id] = { normal: [], special: [] };
    }

    course.schedules.forEach((schedule) => {
      if (
        isNormalSchedule(schedule) &&
        isContained(schedule.module, targetModules) &&
        isContained(schedule.day, targetNormalDays) &&
        isContained(schedule.period, targetPeriods)
      ) {
        map[course.id]["normal"].push(schedule as { module: M; day: ND; period: P });
      }

      if (
        isSpecialSchedule(schedule) &&
        isContained(schedule.module, targetModules) &&
        isContained(schedule.day, targetSpecialDays)
      ) {
        map[course.id]["special"].push(schedule as { module: M; day: SD });
      }
    });

    return map;
  }, {});

  const diaplayNormalTimetable: DiaplayNormalTimetable<M, ND, P> = initializeObject(
    targetModules,
    initializeObject(targetNormalDays, initializeObject(targetPeriods, []))
  );
  const displaySpecialTimetable: DisplaySpecialTimetable<SD> = initializeObject([...targetSpecialDays, "Others"], []);

  courses.forEach((course) => {
    const displayCourse = registeredCourseToDisplay(course, tags);

    courseIdToSchedules[course.id]["normal"].forEach(({ module, day, period }) => {
      diaplayNormalTimetable[module][day][period].push(displayCourse);
    });

    removeDuplicate(courseIdToSchedules[course.id]["special"].map(({ day }) => day)).forEach((day) => {
      displaySpecialTimetable[day].push(displayCourse);
    });

    if (
      courseIdToSchedules[course.id]["normal"].length === 0 &&
      courseIdToSchedules[course.id]["special"].length === 0
    ) {
      displaySpecialTimetable["Others"].push(displayCourse);
    }
  });

  return {
    normal: diaplayNormalTimetable,
    special: displaySpecialTimetable,
  };
};
