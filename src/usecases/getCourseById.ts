import { RegisteredCourse } from "~/api/@types";
import { store } from "~/store";
import { reactive, ToRefs, toRefs } from "vue-demi";
import { apiToDisplayCourse, DisplayCourse } from "~/entities/course";
import { isValidStatus } from "~/usecases/api";
import { NetworkError, NetworkAccessError } from "~/usecases/error";
import { Ports } from "~/adapter";

/**
 * storeまたはAPIからidに該当する登録した講義データを取得する。
 */
export const getCourseById = ({ api }: Ports) => async (
  id: string
): Promise<RegisteredCourse> => {
  const storedCourse = (store.getters.courses as Array<RegisteredCourse>).find(
    (c) => id === c.id
  );
  if (storedCourse) {
    return storedCourse;
  }
  const { body, status, originalResponse } = await api.registered_courses
    ._id(id)
    .get()
    .catch(() => {
      throw new NetworkError();
    });
  if (isValidStatus(status)) {
    return body;
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};

export const useDisplayCourse = (ports: Ports) => async (
  id: string
): Promise<ToRefs<DisplayCourse>> => {
  const course = await getCourseById(ports)(id);
  const displayedCourse = apiToDisplayCourse(course);
  return toRefs(reactive(displayedCourse));
};
