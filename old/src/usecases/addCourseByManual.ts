import { isValidStatus } from "~/usecases/api";
import { NetworkError, NetworkAccessError } from "~/usecases/error";
import { Ports } from "~/adapter";
import { RegisteredCourseWithoutID } from "~/api/@types";

/**
 * 手動で作成した授業を登録する。
 */
export const addCourseByManual = ({ api, store }: Ports) => async (
  course: Required<RegisteredCourseWithoutID>
) => {
  const { body, status, originalResponse } = await api.registered_courses
    .post({
      body: course,
    })
    .catch(() => {
      throw new NetworkError();
    });
  if (isValidStatus(status)) {
    store.commit("addCourse", body);
    return body;
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};
