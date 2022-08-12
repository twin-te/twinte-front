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
