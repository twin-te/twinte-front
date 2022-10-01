import { Method } from "~/domain/method";
import { DisplayMethod } from "../viewmodels/method";

export const methodMap: Record<Method, DisplayMethod> = {
  FaceToFace: "対面",
  Synchronous: "同時双方向",
  Asynchronous: "オンデマンド",
  Others: "その他",
};

export const methodsToDisplay = (methods: Method[]): string => {
  return methods.map((method) => methodMap[method]).join(",");
};
