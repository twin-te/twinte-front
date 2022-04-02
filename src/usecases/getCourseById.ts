import { RegisteredCourse } from "~/api/@types";
import { isValidStatus } from "~/usecases/api";
import { NetworkError, NetworkAccessError } from "~/usecases/error";
import { Ports } from "~/adapter";
import { getCourseListByYear } from "./getCourseListByYear";

/**
 * storeまたはAPIからidに該当する登録した講義データを取得する。
 */
export const getCourseById = (ports: Ports) => async (
  id: string
): Promise<RegisteredCourse> => {
  const { api, store } = ports;

  const storedCourse = (store.getters.courses as Array<RegisteredCourse>).find(
    (c) => id === c.id
  );
  if (storedCourse) return storedCourse;

  const { body, status, originalResponse } = await api.registered_courses
    ._id(id)
    .get()
    .catch(() => {
      throw new NetworkError();
    });
  if (!isValidStatus(status)) {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
  // store.state.courses において year が同じ授業の初期化を行う
  const courses = getCourseListByYear(ports)(body.year);
  store.commit("setCourses", { year: body.year, courses });

  return body;
};
