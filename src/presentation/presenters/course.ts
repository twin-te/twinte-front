import { Course, RegisteredCourse } from "~/domain/course";
import { isSpecialSchedule } from "~/domain/schedule";
import { Tag } from "~/domain/tag";
import { deepCopy } from "~/utils";
import { DisplayCourse, DisplayRegisteredCourse } from "../viewmodels/course";
import { creditToDisplay } from "./credit";
import { instructorsToDisplay } from "./instructor";
import { methodsToDisplay } from "./method";
import { roomsToDisplay } from "./room";
import { schedulesToFullString, schedulesToModuleStrings } from "./schedule";

export const courseToDisplay = (course: Course): DisplayCourse => {
  return {
    id: course.id,
    year: course.year,
    code: course.code ?? "",
    name: course.name,
    schedule: {
      full: schedulesToFullString(course.schedules),
      onlyModule: schedulesToModuleStrings(course.schedules),
    },
    credit: creditToDisplay(course.credit),
    instructor: instructorsToDisplay(course.instructors),
    method: methodsToDisplay(course.methods),
    room: roomsToDisplay(course.rooms),
    overview: course.overview,
  };
};

/**
 *
 * @param course - Target course
 * @param tags - All tags which the user has
 */
export const registeredCourseToDisplay = (
  course: RegisteredCourse,
  tags: Tag[]
): DisplayRegisteredCourse => {
  return {
    id: course.id,
    year: course.year,
    code: course.code ?? "",
    name: course.name,
    schedule: {
      full: schedulesToFullString(course.schedules),
      onlyModule: schedulesToModuleStrings(
        course.schedules.filter(isSpecialSchedule)
      ),
    },
    credit: creditToDisplay(course.credit),
    instructor: instructorsToDisplay(course.instructors),
    method: methodsToDisplay(course.methods),
    room: roomsToDisplay(course.rooms),
    memo: course.memo,
    attendance: course.attendance,
    absence: course.absence,
    late: course.late,
    tags: deepCopy(tags)
      .sort((a, b) => a.order - b.order)
      .map(({ id, name }) => {
        const index = course.tagIds.findIndex((tagId) => tagId === id);
        return {
          id,
          name,
          assign: index !== -1,
        };
      }),
  };
};
