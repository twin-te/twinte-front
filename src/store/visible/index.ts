import { Getters, Mutations } from 'vuex';
import { S, G, M } from './type';

export const state = (): S => ({
  drawer: false,
  detail: false,
  add: false,
  table: { display: true, move: 'left' }
});

export const getters: Getters<S, G> = {
  drawer: state => state.drawer,
  detail: state => state.detail,
  add: state => state.add,
  table: state => state.table
};

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
    state.table = payload;
  }
};
