import { isValidStatus } from "~/usecases/api";
import { NetworkAccessError, NetworkError } from "~/usecases/error";
import { Ports } from "~/adapter";
import { RegisteredCourse } from "~/api/@types";

/**
 * 登録されている講義を取得し同時に Vuex に保存する
 */
export const getCourseList = async ({
  api,
  store,
  dayjs,
}: Ports): Promise<RegisteredCourse[]> => {
  const courses: RegisteredCourse[] = store.getters.courses;
  if (courses.length > 0) return courses;
  const now = dayjs();
  const year = now.month() < 3 ? now.year() - 1 : now.year();
  const { body, status, originalResponse } = await api.registered_courses
    .get({
      query: { year },
    })
    .catch((error) => {
      console.error(error);
      throw new NetworkError();
    });
  if (isValidStatus(status)) {
    store.commit("setCourses", body);
    return body;
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};
