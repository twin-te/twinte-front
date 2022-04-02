import { Ports } from "~/adapter";

export type Toast = {
  text: string;
  id: number;
  type: "primary" | "danger";
};

/**
 * トースト通知を表示する。指定した ms 後に消える。
 * 0を指定した場合は自動で消えない。
 */
export const displayToast = ({ store }: Ports) => (
  text: string,
  {
    displayPeriod = 5000,
    type = "danger",
  }: Partial<{ displayPeriod: number; type: Toast["type"] }> = {}
) => {
  // WARN: index で id を決めると transition-group がバグる
  const id = Math.round(Math.random() * 100);
  // console.log({ id, text, type });
  store.commit("addToast", { id, text, type });
  if (displayPeriod > 0) {
    setTimeout(() => {
      store.commit("deleteToast", id);
    }, displayPeriod);
  }
};
