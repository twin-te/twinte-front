import { Ports } from "~/adapter";
import { isValidStatus } from "~/usecases/api";
import { NetworkError, NetworkAccessError } from "~/usecases/error";
import { getCourseListByYear } from "./getCourseListByYear";
import { getYear } from "./getYear";

/**
 * 講義情報をサーバに登録し、成功すれば Vuex にも登録する。
 */
export const bulkAddCourseById = (ports: Ports) => async (codes: string[]) => {
  const { api, store } = ports;
  const year = await getYear(ports);
  const { body, status, originalResponse } = await api.registered_courses
    .post({
      body: codes.map((code) => ({
        code,
        year,
      })),
    })
    .catch(() => {
      throw new NetworkError();
    });

  if (isValidStatus(status)) {
    const cachedCourses = await getCourseListByYear(ports)(year);
    const addedCourses = Array.isArray(body) ? body : [body];
    const newCourses = [...cachedCourses, ...addedCourses];
    store.commit("setCourses", { year, newCourses });
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};
