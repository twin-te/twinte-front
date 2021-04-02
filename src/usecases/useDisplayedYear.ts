import { ref } from "vue";
import { Ports } from "~/adapter";

export const useDisplayedYear = ({ store }: Ports) => {
  const storedDisplayedYear = localStorage.getItem("displayed-year");
  if (storedDisplayedYear != null && !isNaN(Number(storedDisplayedYear))) {
    store.commit("setDisplayedYear", Number(storedDisplayedYear));
  }

  const displayedYear = ref<number | null>(store.getters.displayedYear);
  const setDisplayedYear = (year: number | null) => {
    store.commit("setDisplayedYear", year);
    localStorage.setItem("displayed-year", String(year));
  };

  return { displayedYear, setDisplayedYear };
};
