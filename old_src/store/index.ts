import { InjectionKey } from "vue";
import { createStore, Store, useStore as useStoreAny } from "vuex";
import { User, RegisteredCourse, Tag } from "~/api/@types";
import { Select } from "~/components/ToggleButton.vue";
import { ModuleJa } from "~/entities/module";
import { Toast } from "~/entities/toast";
import { getters } from "./getter";
import { mutations } from "./mutations";

export type GlobalState = {
  user: User | null;
  sidebar: boolean;
  courses: Record<number, RegisteredCourse[]>; // number は年度を表す
  label: Select;
  bachelorMode: boolean;
  tableTimeMode: boolean;
  saturdayCourseMode: boolean;
  toasts: Toast[];
  displayedYear: number | null;
  module: ModuleJa | null;
  tags: Tag[] | null;
};

export const StateKey: InjectionKey<Store<GlobalState>> = Symbol();

const initState: GlobalState = {
  user: null,
  sidebar: false,
  courses: {},
  label: "left",
  bachelorMode: false,
  tableTimeMode: true,
  saturdayCourseMode: false,
  toasts: [],
  displayedYear: null,
  module: null,
  tags: null,
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
