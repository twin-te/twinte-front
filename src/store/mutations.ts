import { MutationTree } from "vuex";
import { User } from "~/api/@types";
import { GlobalState } from ".";

export const mutations: MutationTree<GlobalState> = {
  setUser(state, user: User) {
    if (state.user !== null) {
      throw new Error("すでにユーザーが存在します。");
    }

    state.user = user;
  },
};
