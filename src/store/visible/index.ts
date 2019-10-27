import { Getters, Mutations } from "vuex";
import { S, G, M } from "./type";
// ______________________________________________________
//
export const state = (): S => ({
  drawer: false,
  detail: false,
  add: false,
  table: { display: true, move: "" }
});
// ______________________________________________________
//
export const getters: Getters<S, G> = {
  drawer(state) {
    return state.drawer;
  },
  detail(state) {
    return state.detail;
  },
  add(state) {
    return state.add;
  },
  table(state) {
    return state.table;
  }
};
// ______________________________________________________
//
export const mutations: Mutations<S, M> = {
  chDrawer(state, payload) {
    state.drawer = payload.display;
  },
  chDetail(state, payload) {
    state.detail = payload.display;
  },
  chAdd(state, payload) {
    state.add = payload.display;
  },
  chTable(state, payload) {
    state.table = { display: payload.display, move: payload.move };
  }
};
