import { Getters, Mutations } from 'vuex';
import { S, G, M } from './type';

export const state = (): S => ({
  drawer: false,
  detail: false,
  add: false,
  table: { display: true, move: 'left' },
  subject: {
    lecture_name: true,
    lecture_code: false,
    instructor: false,
    room: true,
    font_size: 'small'
  }
});

export const getters: Getters<S, G> = {
  drawer: state => state.drawer,
  detail: state => state.detail,
  add: state => state.add,
  table: state => state.table,
  subject: state => state.subject
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
  },
  setDisplaySubject(state, payload) {
    state.subject = payload;
  }
};
