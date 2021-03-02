import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { User } from "~/api/@types";
import { mutations } from "./mutations";
import { getters } from "./getter";

export type GlobalState = {
  user: User | null;
  sidebar: boolean;
};

export const StateKey: InjectionKey<Store<GlobalState>> = Symbol();

const initState: GlobalState = {
  user: null,
  sidebar: false,
};

export const store = createStore<GlobalState>({
  state: initState,
  mutations,
  getters,
  strict: true,
});
