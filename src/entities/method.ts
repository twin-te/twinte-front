import { CourseMethod } from "~/api/@types";

export type MethodJa = "対面" | "同時双方向" | "オンデマンド" | "その他";

export const methodMap: { [key in CourseMethod]: MethodJa } = {
  FaceToFace: "対面",
  Synchronous: "同時双方向",
  Asynchronous: "オンデマンド",
  Others: "その他",
};

export const methodToJa = (method: CourseMethod): MethodJa => methodMap[method];

export type methodOption = MethodJa | "指定なし";

export const methodOptions: methodOption[] = [
  "指定なし",
  "対面",
  "同時双方向",
  "オンデマンド",
  "その他",
];

export const createOption = (selectedOptions: { value: methodOption }[]) => {
  return methodOptions.filter((option) => {
    return !selectedOptions.some((obj) => obj.value === option);
  });
};
