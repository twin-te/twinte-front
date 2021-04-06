import { computed } from "vue";
import { Ports } from "~/adapter";

export const useTableTimeMode = ({ store }: Ports) => {
  const storedTableTimeMode = localStorage.getItem("table-time-mode");
  if (storedTableTimeMode === "show") {
    store.commit("setTableTimeMode", true);
  }

  const tableTimeMode = computed(() => store.getters.tableTimeMode);
  const toggleTableTimeMode = () => {
    store.commit("setTableTimeMode", !tableTimeMode.value);
    localStorage.setItem(
      "table-time-mode",
      tableTimeMode.value ? "show" : "hide"
    );
  };

  return { tableTimeMode, toggleTableTimeMode };
};
