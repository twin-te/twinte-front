import { Ports } from "~/adapter";
import { isValidStatus } from "./api";
import { NetworkAccessError, NetworkError } from "./error";

/**
 * idに該当するタグを削除する
 */
export const deleteTag = ({ api, store }: Ports) => async (
  id: string
): Promise<void> => {
  const { body, status, originalResponse } = await api.tags
    ._id(id)
    .delete()
    .catch(() => {
      throw new NetworkError();
    });
  if (isValidStatus(status)) {
    store.commit("deleteTag", id);
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};
