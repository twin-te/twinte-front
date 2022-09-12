import { useSwitch } from "../hooks/useSwitch";

export const [
  isVisibleSidebar,
  openSidebar,
  closeSidebar,
  toggleSidebar,
  setSidebar,
] = useSwitch(false);
