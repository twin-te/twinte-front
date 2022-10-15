import { computed, ComputedRef, reactive } from "vue";
import { usePorts } from "~/adapter";
import Usecase from "~/application/usecases";
import { isResultError } from "~/domain/error";
import { Tag } from "~/domain/tag";
import {
  deepCopy,
  deleteElementInArray,
  updateAllElementsInArray,
  updateElementInArray,
} from "~/utils";

// state
const tags = reactive<Tag[]>([]);

// getter
export const getAllTags = (): ComputedRef<Tag[]> => {
  return computed(() => deepCopy(tags));
};

export const getTagById = (id: string): ComputedRef<Tag | undefined> => {
  return computed(() => deepCopy(tags.find((tag) => tag.id === id)));
};

// action
const ports = usePorts();

export const setAllTags = async () => {
  const result = await Usecase.getAllTags(ports)();
  if (isResultError(result)) throw result;
  updateAllElementsInArray(tags, result);
};

export const createTag = async (name: string) => {
  const result = await Usecase.createTag(ports)(name);
  if (isResultError(result)) throw result;
  updateElementInArray(tags, result);
  return result;
};

export const updateTagName = async (id: string, name: string) => {
  const result = await Usecase.updateTagName(ports)(id, name);
  if (isResultError(result)) throw result;
  updateElementInArray(tags, result);
};

export const updateTagOrders = async (ids: string[]) => {
  const result = await Usecase.updateTagOrders(ports)(ids);
  if (isResultError(result)) throw result;
  updateAllElementsInArray(tags, result);
};

export const deleteTag = async (id: string) => {
  const result = await Usecase.deleteTag(ports)(id);
  if (isResultError(result)) throw result;
  deleteElementInArray(tags, id);
};
