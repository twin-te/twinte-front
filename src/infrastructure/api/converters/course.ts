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

// For search performance, exclude `codes` property in the request when codes is an empty string
export const codesForSearchRequest = (codes: string[]): string[] | undefined =>
  codes.length === 0 || codes.at(0) === "" ? undefined : codes;

// For search performance, make keywords array empty when keyword is an empty string
export const keywordsForSearchRequest = (keywords: string[]): string[] =>
  keywords.at(0) === "" ? [] : keywords;
