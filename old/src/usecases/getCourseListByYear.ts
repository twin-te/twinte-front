import { isValidStatus } from "~/usecases/api";
import { NetworkAccessError, NetworkError } from "~/usecases/error";
import { Ports } from "~/adapter";
import { RegisteredCourse } from "~/api/@types";

/**
 * 年度を指定して授業を取得する。
 */
export const getCourseListByYear = ({ api, store }: Ports) => async (
  year: number
): Promise<RegisteredCourse[]> => {
  const courses: RegisteredCourse[] = store.state.courses[year];
  if (courses != undefined && courses.length > 0) return courses;
  const { body, status, originalResponse } = await api.registered_courses
    .get({
      query: { year },
    })
    .catch((error) => {
      console.error(error);
      throw new NetworkError();
    });
  if (isValidStatus(status)) {
    store.commit("setCourses", { year, courses: body });
    return body;
  } else if ((status as number) === 401) {
    return [];
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};
