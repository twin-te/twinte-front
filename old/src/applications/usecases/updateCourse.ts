import { isValidStatus } from "~/usecases/api";
import { NetworkAccessError, NetworkError } from "~/usecases/error";
import { Ports } from "~/adapter";
import {
  Course,
  RegisteredCourse,
  RegisteredCourseWithoutID,
} from "~/api/@types";

/**
 * 講義情報を更新する
 */
export const updateCourse = ({ api, store }: Ports) => async (
  id: string,
  course: { course?: Course } & RegisteredCourseWithoutID
): Promise<RegisteredCourse> => {
  const { body, status, originalResponse } = await api.registered_courses
    ._id(id)
    .put({
      body: course as { course: { id: string } } & RegisteredCourseWithoutID,
    })
    .catch(() => {
      throw new NetworkError();
    });
  if (isValidStatus(status)) {
    store.commit("updateCourse", body);
    return body;
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};
