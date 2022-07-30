import { Ports } from "~/adapter";
import { Tag } from "~/api/@types";
import { getTags } from "./getTags";

export const getTagById = (ports: Ports) => async (
  id: string
): Promise<Tag | undefined> => {
  const tags = await getTags(ports);
  const tag = tags.find((tag) => tag.id === id);
  return tag;
};
