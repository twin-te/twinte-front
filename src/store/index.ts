import { InjectionKey } from "vue";
import { createStore, Store, useStore as useStoreAny } from "vuex";
import { User, RegisteredCourse } from "~/api/@types";
import { Select } from "~/components/ToggleButton.vue";
import { mutations } from "./mutations";
import { getters } from "./getter";
import { Toast } from "~/entities/toast";
import { ModuleJa } from "~/entities/module";

export type GlobalState = {
  user: User | null;
  sidebar: boolean;
  courses: RegisteredCourse[];
  label: Select;
  bachelorMode: boolean;
  tableTimeMode: boolean;
  saturdayCourseMode: boolean;
  toasts: Toast[];
  displayedYear: number | null;
  module: ModuleJa | null;
};

export const StateKey: InjectionKey<Store<GlobalState>> = Symbol();

const initState: GlobalState = {
  user: null,
  sidebar: false,
  courses: [],
  label: "left",
  bachelorMode: false,
  tableTimeMode: true,
  saturdayCourseMode: false,
  toasts: [],
  displayedYear: null,
  module: null,
};

export const store = createStore<GlobalState>({
  state: initState,
  mutations,
  getters,
  strict: true,
});

export const useStore = () => {
  return useStoreAny(StateKey);
};
