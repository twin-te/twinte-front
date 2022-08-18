import { Tag } from "~/domain";
import { undefinedTagOrder } from "~/domain/utils";
import * as ApiType from "../aspida/@types";

export const apiToTag = (apiTag: ApiType.Tag): Tag => {
  return {
    id: apiTag.id,
    name: apiTag.name,
    order: apiTag.position ?? undefinedTagOrder,
  };
};
