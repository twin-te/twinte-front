import { Ref, ref } from "vue";

/**
 * 閉じたり開いたりする
 * @example ```
 * const [modal, openModal, closeModal, toggleModal, setModal] = useSwitch();
 *
 * // モーダルの閉じるボタンを押した時
 * closeModal()
 *
 * // モーダルの状態を今の逆にする
 * toggleModal()
 *
 * // モーダルを他の変数の状態と同じ状態にする
 * const isGood = ref(true)
 * setModal(isGood)
 * ```
 */
export const useSwitch = (
  initial = false
): [
  Ref<boolean>,
  () => void,
  () => void,
  () => void,
  (bool: boolean) => void
] => {
  const v = ref(initial);
  const open = () => {
    v.value = true;
  };
  const close = () => {
    v.value = false;
  };
  const toggle = () => {
    v.value = !v.value;
  };
  const set = (bool: boolean) => {
    v.value = bool;
  };
  return [v, open, close, toggle, set];
};
