import { computed } from "vue";
import { Ports } from "~/adapter";
import { Select } from "~/components/ToggleButton.vue";

export const useLabel = ({ store }: Ports) => {
  const whichSelected = computed<Select>(() => store.getters.label);
  const onClickLabel = () => {
    store.commit("setLabel", store.getters.label === "left" ? "right" : "left");
  };

  return { whichSelected, onClickLabel };
};
