import { Ports } from "~/adapter";
import { Tag } from "~/api/@types";
import { isValidStatus } from "./api";
import { NetworkAccessError, NetworkError } from "./error";

/**
 * タグ名を更新する
 */
export const updateTagName = ({ api, store }: Ports) => async ({
  id,
  name,
}: Pick<Tag, "id" | "name">): Promise<Tag> => {
  const { body, status, originalResponse } = await api.tags
    ._id(id)
    .put({ body: { name } })
    .catch(() => {
      throw new NetworkError();
    });
  if (isValidStatus(status)) {
    store.commit("updateTag", body);
    return body;
  } else {
    console.error(body);
    throw new NetworkAccessError(originalResponse);
  }
};
