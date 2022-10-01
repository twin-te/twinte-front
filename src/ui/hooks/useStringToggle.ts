import { Ref, ref } from "vue";

/**
 * If initial is not specified, set the initial value to v1.
 *
 * @example ```
 * const [mode, toggleMode] = useStringToggle("index", "edit");
 *
 * // switch mode
 * toggleMode();
 *
 * // set mode to "edit"
 * toggleMode("edit");
 * ```
 */
export const useStringToggle = <V1 extends string, V2 extends string>(
  v1: V1,
  v2: V2,
  initial?: V1 | V2
): [Ref<V1 | V2>, (v?: V1 | V2) => void] => {
  const v = ref(initial ?? v1) as Ref<V1 | V2>;
  const toggle = (value?: V1 | V2) => {
    if (value) v.value = value;
    else v.value = v.value === v1 ? v2 : v1;
  };

  return [v, toggle];
};
