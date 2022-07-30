import { RegisteredCourse } from "~/domain";
import { Result } from "~/domain/result";

export interface ICourseRepository {
  getCourseListByYear(year: number): Promise<Result<RegisteredCourse[]>>;
}
