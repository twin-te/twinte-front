import { Ports } from "~/adapter";

export type Toast = {
  text: string;
  id: number;
};

export const displayToast = ({ store }: Ports) => (
  text: string,
  displayPeriod = 5000
) => {
  // WARN: index で id を決めると transition-group がバグる
  const id = Math.round(Math.random() * 100);
  console.log({ id, text });
  store.commit("addToast", { id, text });
  setTimeout(() => {
    store.commit("deleteToast", id);
  }, displayPeriod);
};
