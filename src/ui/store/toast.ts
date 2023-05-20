import { computed, reactive } from "vue";
import { Toast, ToastType } from "~/presentation/viewmodels/toast";
import { deepCopy, deleteElementInArray, createId } from "~/utils";

// state
const toasts = reactive<Toast[]>([]);

// getter
export const getToasts = () => {
  return computed(() => deepCopy(toasts));
};

// mutation
export const deleteToast = (id: string) => {
  deleteElementInArray(toasts, id);
};

// action
export const displayToast = (
  text: string,
  option?: { displayPeriod?: number; type?: ToastType }
) => {
  const id = createId();
  const displayPeriod = option?.displayPeriod ?? text.length * 240; // 250 characters per minute reading speed
  const type = option?.type ?? "danger";

  toasts.push({ id, text, type });
  if (displayPeriod > 0) setTimeout(() => deleteToast(id), displayPeriod);
};
