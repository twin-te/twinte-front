import { ICourseRepository } from "~/application/ports/ICourseRepository";
import { RegisteredCourse } from "~/domain";
import { Ok, Result } from "~/domain/result";

export class CourseRepository implements ICourseRepository {
  constructor() {}

  async getCourseListByYear(year: number) {
    return new Promise<Result<RegisteredCourse[]>>((resolve) => {
      setTimeout(() => {
        resolve(new Ok([]));
      }, 1000);
    });
  }
}
