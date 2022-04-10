export const getKeysFromObj = <T>(obj: T) => Object.keys(obj) as (keyof T)[];

export const isContainedIn = <T extends string>(
  text: string,
  set: T[]
): text is typeof set[number] => set.some((el) => el === text);

export const flipSet = <T>(set: Set<T>, el: T) =>
  set.has(el) ? set.delete(el) : set.add(el);
