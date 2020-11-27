/**
 * API通信を伴う状態処理
 *
 * - 時間割はPeriod配列ですべてのモジュールをまとめて保持する
 * - 任意のコンポネントで時間割は作成される
 * - isLoginはページ初回に毎回確認が行われる
 */

import { Getters, Mutations, Actions } from 'vuex'
import { S, G, M, A } from './type'

import { YEAR } from '~/config'

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
  SET_TABLE(state, payload) {
    state.timeTables = payload.periodDatas
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
  async addTable(ctx, { lectureCodes }) {
    // サーバーへ時間割の登録
    await $nuxt.$deps.timeTable.postAllLectures(lectureCodes, YEAR)

    await ctx.dispatch('fetch')
  },

  async deleteTable(ctx, { table, userLecture }) {
    // サーバーから削除
    await $nuxt.$deps.timeTable.deleteLecture(YEAR, table)
    await $nuxt.$deps.userLectures.deleteUserData(userLecture.user_lecture_id)

    await ctx.dispatch('fetch')
  },

  async fetch(ctx) {
    // サーバーから時間割の取得
    const periodDatas = await $nuxt.$deps.timeTable.getTimeTables(YEAR)

    // ローカルデータへの追加
    ctx.commit('SET_TABLE', { periodDatas })
    localStorage.setItem('table', JSON.stringify(ctx.state.timeTables))
  },

  async login(ctx) {
    ctx.dispatch('fetch')
    ctx.commit('LOGIN')
  },

  logout(ctx) {
    ctx.commit('LOGOUT')
    localStorage.removeItem('table')
    localStorage.removeItem('login')
  },
}
