import { isValidStatus } from "~/usecases/api";
import { NetworkAccessError, NetworkError } from "~/usecases/error";
import { Ports } from "~/adapter";
import { RegisteredCourse } from "~/api/@types";

/**
 * 出欠カウントを更新する。
 */
export const updateCourse = ({ api, store }: Ports) => async (
  course: Required<RegisteredCourse>
): Promise<RegisteredCourse> => {
  const { body, status, originalResponse } = await api.registered_courses
    ._id(course.id)
    .put({ body: course })
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
