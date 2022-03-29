import { Ports } from "~/adapter";
import { Tag } from "~/api/@types";
import { isValidStatus } from "./api";
import { NetworkAccessError, NetworkError } from "./error";

/**
 * タグを取得する。
 */
export const getTags = async ({ api, store }: Ports): Promise<Tag[]> => {
  const storedTags = store.getters.tags;
  if (storedTags != undefined) return storedTags;
  const { body, status, originalResponse } = await api.tags.get().catch(() => {
    throw new NetworkError();
  });
  if (isValidStatus(status)) {
    store.commit("setTags", body);
    return body;
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};
