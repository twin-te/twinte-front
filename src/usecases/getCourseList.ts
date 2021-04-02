import { isValidStatus } from "~/usecases/api";
import { NetworkAccessError, NetworkError } from "~/usecases/error";
import { Ports } from "~/adapter";
import { RegisteredCourse } from "~/api/@types";
import { getYear } from "./getYear";

/**
 * 登録されている講義を取得し同時に Vuex に保存する
 */
export const getCourseList = async ({
  api,
  store,
  dayjs,
}: Ports): Promise<RegisteredCourse[]> => {
  const courses: RegisteredCourse[] = store.getters.courses;
  const year = await getYear({ api, store, dayjs });
  if (courses.length > 0 && courses[0].year === year) return courses;
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
  } else if ((status as number) === 401) {
    return [];
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};
