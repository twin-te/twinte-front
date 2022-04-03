import { Ports } from "~/adapter";
import { Tag } from "~/api/@types";
import { isValidStatus } from "./api";
import { NetworkAccessError, NetworkError } from "./error";

/**
 * タグを作成する
 */
export const createTag = ({ api, store }: Ports) => async (
  name: string
): Promise<Tag> => {
  const { body, status, originalResponse } = await api.tags
    .post({ body: { name } })
    .catch(() => {
      throw new NetworkError();
    });
  if (isValidStatus(status)) {
    store.commit("addTag", body);
    return body;
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};
