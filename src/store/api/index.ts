/**
 * API通信を伴う状態処理
 *
 * - 時間割はPeriod配列ですべてのモジュールをまとめて保持する
 * - 任意のコンポネントで時間割は作成される
 * - isLoginはページ初回に毎回確認が行われる
 */

import { Getters, Mutations, Actions } from 'vuex';
import { S, G, M, A } from './type';

import { deleteLecture, postAllLectures, getTimeTables } from './timetables';
import { YEAR } from './config';
import { deleteUserData } from './user-lectures';

export const state = (): S => ({
  timeTables: [],
  isLogin: false
});

export const getters: Getters<S, G> = {
  table(state) {
    return state.timeTables;
  },
  isLogin(state) {
    return state.isLogin;
  }
};

export const mutations: Mutations<S, M> = {
  SET_TABLE(state, payload) {
    state.timeTables = payload.periodDatas;
  },
  LOGIN(state) {
    state.isLogin = true;
  },
  LOGOUT(state) {
    state.isLogin = false;
    state.timeTables = [];
  }
};

export const actions: Actions<S, A, G, M> = {
  async addTable(ctx, { lectureCodes }) {
    await postAllLectures(lectureCodes, YEAR);
    // → サーバーへ時間割の登録

    await ctx.dispatch('fetch');
    // → 時間割のフェッチ
  },

  async deleteTable(ctx, { module, day, period, UserLecture }) {
    await deleteLecture(YEAR, module, day, period);
    await deleteUserData(UserLecture);
    // → サーバーから削除

    await ctx.dispatch('fetch');
    // → 時間割のフェッチ
  },

  async fetch(ctx) {
    const periodDatas = await getTimeTables(YEAR);
    // → サーバーから時間割の取得

    ctx.commit('SET_TABLE', { periodDatas });
    localStorage.setItem('table', JSON.stringify(ctx.state.timeTables));
    // → ローカルデータへの追加
  },

  async login(ctx) {
    const periodDatas = await getTimeTables(YEAR);
    ctx.commit('SET_TABLE', { periodDatas });
    ctx.commit('LOGIN');
    localStorage.setItem('table', JSON.stringify(ctx.state.timeTables));
  },

  logout(ctx) {
    ctx.commit('LOGOUT');
    localStorage.removeItem('table');
    localStorage.removeItem('login');
  }
};
