import { Getters, Mutations, Actions } from "vuex";
import { S, G, M, A } from "./type";
// ______________________________________________________
//
export const state = (): S => ({
  drawer: false,
  detail: false,
  add: false
});
// ______________________________________________________
//
/**
 * stateを利用して作られる,vueファイル内で使う値
 */
export const getters: Getters<S, G> = {
  drawer(state) {
    return state.drawer;
  },
  detail(state) {
    return state.detail;
  },
  add(state) {
    return state.add;
  }
};
// ______________________________________________________
//
/**
 * 同期的なstate値の更新
 */
export const mutations: Mutations<S, M> = {
  /**
   * ナビゲーションバーの表示のon/off
   * @param payload 任意 つけなかったら切り替え
   */
  chDrawer(state, payload) {
    state.drawer = payload.bool;
  },
  chDetail(state, payload) {
    state.detail = payload.bool;
  },
  chAdd(state, payload) {
    state.add = payload.bool;
  }
};
// ______________________________________________________
//
/**
 * 非同期な処理を行なう
 * @example
 * asyncSetCount(ctx, payload) {
 *   ctx.commit('setCount', { amount: payload.amount })
 * }
 * @literal `async${Verb}`
 */
export const actions: Actions<S, A, G, M> = {};
