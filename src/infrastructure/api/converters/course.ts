import { Course } from "~/domain/course";
import * as ApiType from "../aspida/@types";
import { apiToInstructors } from "./instructor";
import { apiToSchedules } from "./schedule";

export const apiToCourse = (apiCourse: ApiType.Course): Course => {
  const { schedules, rooms } = apiToSchedules(apiCourse.schedules);

  return {
    id: apiCourse.id,
    year: apiCourse.year,
    code: apiCourse.code,
    name: apiCourse.name,
    instructors: apiToInstructors(apiCourse.instructor),
    credit: apiCourse.credit,
    overview: apiCourse.overview,
    remarks: apiCourse.remarks,
    recommendedGrades: apiCourse.recommendedGrades,
    methods: apiCourse.methods,
    schedules,
    rooms,
  };
};
