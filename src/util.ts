export const getKeysFromObj = <T>(obj: T) => Object.keys(obj) as (keyof T)[];
