import { Ports } from "~/adapter";
import { isValidStatus } from "~/usecases/api";
import { NetworkAccessError, NetworkError } from "~/usecases/error";

/**
 * idに該当する登録済みの講義を削除する。
 */
export const deleteCourse = ({ api, store }: Ports) => async (id: string) => {
  const { body, status, originalResponse } = await api.registered_courses
    ._id(id)
    .delete()
    .catch(() => {
      throw new NetworkError();
    });
  if (isValidStatus(status)) {
    store.commit("deleteCourse", id);
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};
