import { isContained } from "~/utils";

export type Method = "FaceToFace" | "Synchronous" | "Asynchronous" | "Others";

export const methods: Method[] = [
  "FaceToFace",
  "Synchronous",
  "Asynchronous",
  "Others",
];

export const isMethod = (method: unknown): method is Method => {
  return isContained(method, methods);
};
