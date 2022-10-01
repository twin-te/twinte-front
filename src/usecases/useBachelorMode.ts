import { computed } from "vue";
import { Ports } from "~/adapter";

export const useBachelorMode = ({ store }: Ports) => {
  const storageBachelorMode = localStorage.getItem("bachelor-mode");
  if (storageBachelorMode === "enabled") {
    store.commit("setBachelorMode", true);
  }

  const bachelorMode = computed<boolean>(() => store.getters.bachelorMode);
  const onBachelorMode = () => {
    store.commit("setBachelorMode", true);
    localStorage.setItem("bachelor-mode", "enabled");
  };
  const offBachelorMode = () => {
    store.commit("setBachelorMode", false);
    localStorage.setItem("bachelor-mode", "disabled");
  };

  const toggleBachelorMode = () => {
    if (bachelorMode.value) {
      offBachelorMode();
    } else {
      onBachelorMode();
    }
  };

  return { bachelorMode, onBachelorMode, offBachelorMode, toggleBachelorMode };
};
