export type NotSpecified = "指定なし";

export const notSpecified = "指定なし";

export const isNotSpecified = (value: unknown): value is NotSpecified => {
  return value === notSpecified;
};
