import { RegisteredCourse } from "~/domain/course";
import { deepCopy, isEqualPrimitive } from "~/utils";
import * as ApiType from "../aspida/@types";
import { instructorsToApi, apiToInstructors } from "./instructor";
import { isEqualCourseMethods } from "./method";
import {
  apiToSchedules,
  isEqualCourseSchedules,
  schedulesToApi,
} from "./schedule";

/**
 * Convert registerd course from api type to domain type.
 */
export const apiToRegisteredCourse = (
  apiCourse: Omit<ApiType.RegisteredCourse, "userId">
): RegisteredCourse => {
  const { schedules, rooms } = apiToSchedules(
    apiCourse.schedules ?? apiCourse.course?.schedules ?? []
  );

  const course: RegisteredCourse = {
    id: apiCourse.id,
    year: apiCourse.year,
    code: apiCourse.course?.code,
    name: apiCourse.name ?? apiCourse.course?.name ?? "",
    instructors: apiToInstructors(
      apiCourse.instructor ?? apiCourse.course?.instructor ?? ""
    ),
    credit: apiCourse.credit ?? apiCourse.course?.credit ?? 0,
    methods: apiCourse.methods ?? apiCourse.course?.methods ?? [],
    schedules,
    rooms,
    memo: apiCourse.memo,
    attendance: apiCourse.attendance,
    absence: apiCourse.absence,
    late: apiCourse.late,
    tagIds: apiCourse.tags.map(({ id }) => id),
  };

  return course;
};

/**
 * Update the property of the api course if it is changed.
 *
 * @param apiCourse - The api course of which the property can be changed.
 * @param prop - Target property.
 * @param newValue - New value of the peoperty.
 * @param compareFn - Function to compare. Return true if two values are same, return false otherwise.
 */
const updateApiCourseProp = <
  P extends keyof ApiType.Course & keyof Required<ApiType.RegisteredCourse>
>(
  apiCourse: ApiType.RegisteredCourse,
  prop: P,
  newValue: Required<ApiType.RegisteredCourse>[P],
  compareFn: (
    v1: ApiType.Course[P],
    v2: Required<ApiType.RegisteredCourse>[P]
  ) => boolean
): void => {
  if (
    prop in apiCourse ||
    (apiCourse.course && !compareFn(apiCourse.course[prop], newValue))
  ) {
    apiCourse[prop] = newValue;
  }
};

/**
 * Convert registered course from domain to api based on the stored api course.
 */
export const registeredCourseToApi = (
  course: RegisteredCourse,
  baseApiCourse: ApiType.RegisteredCourse
): ApiType.RegisteredCourse => {
  const apiCourse: ApiType.RegisteredCourse = {
    ...deepCopy(baseApiCourse),
  };

  const instructor: string = instructorsToApi(course.instructors);
  const schedules: ApiType.CourseSchedule[] = schedulesToApi(
    course.schedules,
    course.rooms
  );

  updateApiCourseProp(apiCourse, "name", course.name, isEqualPrimitive);
  updateApiCourseProp(apiCourse, "instructor", instructor, isEqualPrimitive);
  updateApiCourseProp(apiCourse, "credit", course.credit, isEqualPrimitive);
  updateApiCourseProp(
    apiCourse,
    "methods",
    course.methods,
    isEqualCourseMethods
  );
  updateApiCourseProp(
    apiCourse,
    "schedules",
    schedules,
    isEqualCourseSchedules
  );

  apiCourse.memo = course.memo;
  apiCourse.attendance = course.attendance;
  apiCourse.absence = course.absence;
  apiCourse.late = course.late;
  apiCourse.tags = course.tagIds.map((id) => ({ id }));

  return apiCourse;
};
