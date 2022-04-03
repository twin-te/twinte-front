import { Ports } from "~/adapter";
import { isValidStatus } from "./api";
import { NetworkAccessError, NetworkError } from "./error";

/**
 * idに該当するタグを削除する
 * 削除されたタグが紐ついている授業から削除されたタグの紐付けを解除する。
 */
export const deleteTag = (ports: Ports) => async (
  id: string
): Promise<void> => {
  const { api, store } = ports;
  const { body, status, originalResponse } = await api.tags
    ._id(id)
    .delete()
    .catch(() => {
      throw new NetworkError();
    });
  if (!isValidStatus(status)) {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
  store.commit("deleteTag", id);
};
