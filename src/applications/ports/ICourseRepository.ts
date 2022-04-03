import { RegisteredCourse } from "~/entities/entities";

export interface ICourseRepository {
  getCourseListByYear(year: number): RegisteredCourse[];
  getCourseById(id: string): RegisteredCourse[];
}
