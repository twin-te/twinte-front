import { createId } from "~/utils";

export const createNewTagId = (): string => {
  return `new-tag-${createId()}`;
};

export const isNewTagId = (id: string): boolean => {
  return id.slice(0, 7) === "new-tag";
};
