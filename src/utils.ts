import { Dayjs, OpUnitType } from "dayjs";

export const initializeObject = <K extends string | number | symbol, V>(
  keys: K[],
  initValue: V
): Record<K, V> => {
  return keys.reduce(
    (obj, key) => ({ ...obj, [key]: initValue }),
    {} as Record<K, V>
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

export const getKeysFromObj = <T>(obj: T) => Object.keys(obj) as (keyof T)[];

export const removeDuplicate = <T>(array: T[]): T[] =>
  new Array(...new Set(array));

export const isEqualPrimitive = <T>(v1: T, v2: T): boolean => v1 === v2;

export const isEqualSet = <T>(s1: Set<T>, s2: Set<T>): boolean => {
  return s1.size === s2.size && [...s1].every((el) => s2.has(el));
};

export const isContain = <T>(value: any, array: T[]): value is T => {
  return array.findIndex((el) => el === value) !== -1;
};

/**
 * Manipulate the specified element of array in place.
 * If there is newEl, update element. Otherwise, delete element.
 *
 * @param array - Target array.
 * @param predicate - For Array.prototype.findIndex.
 * @param newEl - Optional.
 */
export const manipulateArrayEl = <T>(
  array: T[],
  predicate: (el: T) => boolean,
  newEl?: T
): void => {
  const index = array.findIndex(predicate);
  if (newEl) {
    // update
    if (index !== -1) array.splice(index, 1, newEl);
    else array.push(newEl);
  } else {
    // delete
    if (index !== -1) array.splice(index, 1);
  }
};
