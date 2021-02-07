import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { User } from "~/api/@types";
import { mutations } from "./mutations";

export type GlobalState = {
  user: User | null;
};

export const StateKey: InjectionKey<Store<GlobalState>> = Symbol();

const initState: GlobalState = {
  user: null,
};

export const store = createStore<GlobalState>({
  state: initState,
  mutations,
  strict: true,
});
