import { Getters, Mutations } from "vuex";
import { S, G, M } from "./type";
// ______________________________________________________
//
export const state = (): S => ({
  moduleList: ["SpringA", "SpringB", "SpringC", "FallA", "FallB", "FallC"],
  module: "SpringA",
  click: null
});
// ______________________________________________________
//
export const getters: Getters<S, G> = {

  module(state) {
    return state.module;
  },

  prevModule(state) {
    const num: number = state.moduleList.indexOf(state.module) - 1;
    return num === -1 ? "FallC" : state.moduleList[num];
  },

  nextModule(state) {
    const num: number = state.moduleList.indexOf(state.module) + 1;
    return num === 6 ? "SpringA" : state.moduleList[num];
  },

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
export const mutations: Mutations<S, M> = {

  setModule(state, payload) {
    state.module = payload.module;
    localStorage.setItem("module", state.module);
  },

  prevModule(state) {
    //TODO getterの値を使いたかった
    const num: number = state.moduleList.indexOf(state.module) - 1;
    state.module = num === -1 ? "FallC" : state.moduleList[num];
    localStorage.setItem("module", state.module);
  },

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
