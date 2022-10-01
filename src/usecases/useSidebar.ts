import { computed } from "vue";
import { usePorts } from ".";

export const useSidebar = () => {
  const { store } = usePorts();

  const isClose = computed<boolean>(() => !store.getters.sidebar);
  const isOpen = computed<boolean>(() => store.getters.sidebar);
  const closeSidebar = () => store.commit("setSidebar", false);
  const openSidebar = () => store.commit("setSidebar", true);
  const toggleSidebar = () => {
    store.commit("setSidebar", !store.state.sidebar);
  };

  return { isClose, isOpen, closeSidebar, openSidebar, toggleSidebar };
};
