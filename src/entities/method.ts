import { CourseMethod } from "~/api/@types";

export type MethodJa = "対面" | "同時双方向" | "オンデマンド" | "その他";

export const methodList: CourseMethod[] = [
  "FaceToFace",
  "Synchronous",
  "Asynchronous",
  "Others",
];

export const methodMap: Record<CourseMethod, MethodJa> = {
  FaceToFace: "対面",
  Synchronous: "同時双方向",
  Asynchronous: "オンデマンド",
  Others: "その他",
};

export const methodToJa = (method: CourseMethod): MethodJa => methodMap[method];

/** 任意の値をCourseMethodに変換できるように */
export const jaToMethod = (method: string): CourseMethod =>
  methodList.find((key) => methodMap[key] === method) ?? "Others";

/** DropdownAddable */
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
