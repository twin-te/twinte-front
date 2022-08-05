import { Ports } from "~/adapter";
import { TagPositionOnly } from "~/api/@types";
import { isValidStatus } from "./api";
import { NetworkAccessError, NetworkError } from "./error";

/**
 * タグの順番を変更する
 */
export const changeTagOrders = ({ api, store }: Ports) => async (
  tags: TagPositionOnly[]
): Promise<TagPositionOnly[]> => {
  const { body, status, originalResponse } = await api.tags
    .patch({ body: tags })
    .catch(() => {
      throw new NetworkError();
    });
  if (isValidStatus(status)) {
    body.forEach((tag) => store.commit("updateTag", tag));
    return body;
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};
