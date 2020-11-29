/**
 * API通信を伴う状態処理
 *
 * - 時間割はPeriod配列ですべてのモジュールをまとめて保持する
 * - 任意のコンポネントで時間割は作成される
 * - isLoginはページ初回に毎回確認が行われる
 */

import { Getters, Mutations, Actions } from 'vuex'
import { S, G, M, A } from './type'

export const state = (): S => ({
  timeTables: [],
  isLogin: false,
})

export const getters: Getters<S, G> = {
  table(state) {
    return state.timeTables
  },
  isLogin(state) {
    return state.isLogin
  },
}

export const mutations: Mutations<S, M> = {
  SET_TABLE(state, periodDatas) {
    state.timeTables = periodDatas
  },
  LOGIN(state) {
    state.isLogin = true
  },
  LOGOUT(state) {
    state.isLogin = false
    state.timeTables = []
  },
}

export const actions: Actions<S, A, G, M> = {
  async setTable(ctx, periodDatas) {
    ctx.commit('SET_TABLE', periodDatas)
    localStorage.setItem('table', JSON.stringify(ctx.state.timeTables))
  },

  login(ctx) {
    ctx.commit('LOGIN')
    localStorage.setItem('login', 'true')
  },

  logout(ctx) {
    ctx.commit('LOGOUT')
    localStorage.removeItem('table')
    localStorage.removeItem('login')
  },
}
