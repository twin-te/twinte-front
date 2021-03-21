import { InjectionKey } from "vue";
import { createStore, Store, useStore as useStoreAny } from "vuex";
import { RegisteredCourse, User } from "~/api/@types";
import { mutations } from "./mutations";
import { getters } from "./getter";

export type GlobalState = {
  user: User | null;
  sidebar: boolean;
  courses: RegisteredCourse[];
};

export const StateKey: InjectionKey<Store<GlobalState>> = Symbol();

const initState: GlobalState = {
  user: null,
  sidebar: false,
  courses: [],
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
