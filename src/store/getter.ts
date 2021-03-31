import { GetterTree } from "vuex";
import { GlobalState } from ".";

export const getters: GetterTree<GlobalState, GlobalState> = {
  sidebar: (state) => {
    return state.sidebar;
  },
  courses: (state) => {
    return state.courses;
  },
  label: (state) => {
    return state.label;
  },
  bachelorMode: (state) => {
    return state.bachelorMode;
  },
  toasts: (state) => {
    return state.toasts;
  },
};
