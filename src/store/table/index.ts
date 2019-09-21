import { Getters, Mutations, Actions } from "vuex";
import { S, G, M, A } from "./type";
// ______________________________________________________
//
export const state = (): S => ({
  moduleList: ["SpringA", "SpringB", "SpringC", "FallA", "FallB", "FallC"],
  module: "SpringA",
  click: null
});
// ______________________________________________________
//
/**
 * stateを利用して作られる,vueファイル内で使う値
 */
export const getters: Getters<S, G> = {
  /**
   * @description 現在の学期を返す
   */
  module(state) {
    return state.module;
  },

  /**
   * @description 前の学期を返す
   */
  prevModule(state) {
    const num: number = state.moduleList.indexOf(state.module) - 1;
    return num === -1 ? "FallC" : state.moduleList[num];
  },

  /**
   * @description 次の学期を返す
   */
  nextModule(state) {
    const num: number = state.moduleList.indexOf(state.module) + 1;
    return num === 6 ? "SpringA" : state.moduleList[num];
  },

  /**
   * @description 現在の学期の配列番号を返す、空の場合は0を返す
   */
  moduleNum(state) {
    return state.moduleList.indexOf(state.module);
  },
  click(state) {
    if (state.click === null) {
      return { x: 0, y: 0 };
    }
    return state.click;
  }
};
// ______________________________________________________
//
/**
 * 同期的なstate値の更新
 */
export const mutations: Mutations<S, M> = {
  setModule(state, payload) {
    state.module = payload.module;
    localStorage.setItem("module", state.module);
  },
  /**
   * @description 前の学期を返す
   * @param state なし
   */
  prevModule(state) {
    //TODO getterの値を使いたかった
    const num: number = state.moduleList.indexOf(state.module) - 1;
    state.module = num === -1 ? "FallC" : state.moduleList[num];
    localStorage.setItem("module", state.module);
  },

  /**
   * @description 次の学期を返す
   * @param state なし
   */
  nextModule(state) {
    //TODO getterの値を使いたかった
    const num: number = state.moduleList.indexOf(state.module) + 1;
    state.module = num === 6 ? "SpringA" : state.moduleList[num];
    localStorage.setItem("module", state.module);
  },
  setClick(state, payload) {
    state.click = { x: payload.x, y: payload.y };
  }
};
// ______________________________________________________
//
/**
 * 非同期な処理を行なう
 * @literal `async${Verb}`
 */
export const actions: Actions<S, A, G, M> = {};
