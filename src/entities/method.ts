import { CourseMethod } from "~/api/@types";

export type MethodJa = "対面" | "同時双方向" | "オンデマンド" | "その他";

export const methodMap: { [key in CourseMethod]: MethodJa } = {
  FaceToFace: "対面",
  Synchronous: "同時双方向",
  Asynchronous: "オンデマンド",
  Others: "その他",
};

export const methodToJa = (method: CourseMethod): MethodJa => methodMap[method];
export const jaToMethod = (method: MethodJa): CourseMethod => {
  const courseMethod =
    Object.keys(methodMap).find((m) => methodMap[m] === method) ?? "Other";
  return courseMethod as CourseMethod;
};

export type MethodOption = MethodJa | "指定なし";

export const methodOptions: MethodOption[] = [
  "指定なし",
  "対面",
  "同時双方向",
  "オンデマンド",
  "その他",
];

export const createOption = (selectedOptions: { value: MethodOption }[]) => {
  return methodOptions.filter((option) => {
    return !selectedOptions.some((obj) => obj.value === option);
  });
};
