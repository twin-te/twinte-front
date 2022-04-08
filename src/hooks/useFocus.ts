import { nextTick, ref } from "vue";

export const useFocus = () => {
  const targetRef = ref<HTMLElement | null>(null);

  const focus = (selectors: string[]) => {
    nextTick(() => {
      const target = selectors.reduce<HTMLElement | null>((el, selector) => {
        return el?.querySelector(selector) as HTMLElement | null;
      }, targetRef.value);
      target?.focus();
    });
  };

  return {
    targetRef,
    focus,
  };
};
