import { ICourseRepository } from "~/src/applications/ports/ICourseRepository";
import { RegisteredCourse, Result } from "~/entities/entities";
import api from "~/src/repository/_api/$api";

class CourseRepository implements ICourseRepository {
  constructor() {}

  async getCourseListByYear(year: number): Promise<Result<RegisteredCourse[]>> {
    const { body, status, originalResponse } = await api.registered_courses
      .get({
        query: { year },
      })
      .catch((error: any) => {
        console.error(error);
        return new NetworkError();
      });

    if (isValidStatus(status)) {
      // ここでEntityに変換
      return body;
    } else if ((status as number) === 401) {
      return [];
    } else {
      return new NetworkAccessError(originalResponse);
    }
  }
}
