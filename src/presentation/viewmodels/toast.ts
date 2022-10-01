export type ToastType = "primary" | "danger";

export type Toast = {
  id: string;
  text: string;
  type: ToastType;
};
