import { Dayjs, OpUnitType } from "dayjs";
import _ from "lodash";

export const deepCopy = <T>(value: T): T => {
  return _.cloneDeep(value);
};

export const isContained = <T extends string | number | boolean>(
  value: unknown,
  array: T[]
): value is T => {
  return array.findIndex((el) => el === value) !== -1;
};

export const initializeObject = <K extends string | number | symbol, V>(
  keys: K[],
  initValue: V
): Record<K, V> => {
  return keys.reduce(
    (obj, key) => ({ ...obj, [key]: deepCopy(initValue) }),
    {} as Record<K, V>
  );
};

export const getKeysFromObj = <T extends object>(obj: T) =>
  Object.keys(obj) as (keyof T)[];

export const removeDuplicate = <T>(array: T[]): T[] =>
  new Array(...new Set(array));

export const isEqualPrimitive = <T extends string | number | boolean>(
  v1: T,
  v2: T
): boolean => v1 === v2;

export const isEqualSet = <T>(s1: Set<T>, s2: Set<T>): boolean => {
  return s1.size === s2.size && [...s1].every((el) => s2.has(el));
};

export const createId = (): string => {
  return (
    new Date().getTime().toString(16) +
    "-" +
    Math.floor(Math.random() * 100000)
      .toString(16)
      .padStart(5, "0")
  );
};

export const isBetween = (
  target: Dayjs,
  start: Dayjs,
  end: Dayjs,
  unit?: OpUnitType
): boolean => {
  return (
    (start.isSame(target, unit) || start.isBefore(target, unit)) &&
    (end.isSame(target, unit) || end.isAfter(target, unit))
  );
};

/**
 * Whether the element is contained in the array.
 */
export const containedInArray = <T extends { id: string }>(
  array: T[],
  element: T
): boolean => {
  return array.findIndex(({ id }) => id === element.id) !== -1;
};

export const addElementsInArray = <T extends { id: string }>(
  array: T[],
  newElements: T[]
) => {
  array.splice(array.length, 0, ...newElements);
};

/**
 * All elements in the array are deleted and new elements are added to the array.
 */
export const updateAllElementsInArray = <T extends { id: string }>(
  array: T[],
  newElements: T[]
) => {
  array.splice(0, array.length, ...newElements);
};

/**
 * If an element with the same id as the new element exists in the array, it is replaced by the new element.
 * Otherwise, the new element is added to the array.
 */
export const updateElementInArray = <T extends { id: string }>(
  array: T[],
  newElement: T
) => {
  const index = array.findIndex((element) => element.id === newElement.id);
  if (index === -1) array.push(newElement);
  else array.splice(index, 1, newElement);
};

/**
 * If an element with specified id exists in the array, it is deleted.
 * Otherwise, nothing happens.
 */
export const deleteElementInArray = <T extends { id: string }>(
  array: T[],
  id: string
) => {
  const index = array.findIndex((element) => element.id === id);
  if (index !== -1) array.splice(index, 1);
};

const hasUnknownProperty = <P extends string>(
  obj: object,
  prop: P
): obj is { [key in P]: unknown } => {
  return prop in obj;
};

const clarifyPropertyType = <P extends string, T>(
  obj: { [key in P]: unknown },
  prop: P,
  fn: (value: unknown) => value is T
): obj is { [key in P]: T } => {
  return fn(obj[prop]);
};

export const hasProperty = <P extends string, T>(
  obj: object,
  prop: P,
  fn: (value: unknown) => value is T
): obj is { [key in P]: T } => {
  return hasUnknownProperty(obj, prop) && clarifyPropertyType(obj, prop, fn);
};

export const asyncFilter = async <T, S>(
  array: T[],
  asyncCallback: (arg: T) => Promise<S>
) => {
  const mask = await Promise.all(array.map(asyncCallback));
  return array.filter((_, i) => Boolean(mask[i]));
};
