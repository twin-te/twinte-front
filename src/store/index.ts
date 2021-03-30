import { InjectionKey } from "vue";
import { createStore, Store, useStore as useStoreAny } from "vuex";
import { User, RegisteredCourse } from "~/api/@types";
import { Select } from "~/components/ToggleButton.vue";
import { mutations } from "./mutations";
import { getters } from "./getter";
import { Toast } from "~/entities/toast";

export type GlobalState = {
  user: User | null;
  sidebar: boolean;
  courses: RegisteredCourse[];
  label: Select;
  toasts: Toast[];
};

export const StateKey: InjectionKey<Store<GlobalState>> = Symbol();

const initState: GlobalState = {
  user: null,
  sidebar: false,
  courses: [],
  label: "left",
  toasts: [],
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
