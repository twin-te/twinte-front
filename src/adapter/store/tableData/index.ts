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
  moduleList: ['春A', '春B', '春C', '秋A', '秋B', '秋C'],
  module: '春A',
  looking: null,
  userData: null,
})

export const getters: Getters<S, G> = {
  table(state) {
    return state.timeTables
  },

  isLogin(state) {
    return state.isLogin
  },

  module(state) {
    return state.module
  },

  moduleNum(state) {
    return state.moduleList.indexOf(state.module)
  },

  prevModule(state) {
    const num: number = state.moduleList.indexOf(state.module) - 1
    return num === -1 ? '秋C' : state.moduleList[num]
  },

  nextModule(state) {
    const num: number = state.moduleList.indexOf(state.module) + 1
    return num === 6 ? '春A' : state.moduleList[num]
  },

  looking(state) {
    return state.looking
  },

  userData(state) {
    return state.userData
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
  },

  setModule(state, payload) {
    state.module = payload.module
    localStorage.setItem('module', state.module)
  },

  prevModule(state) {
    const num: number = state.moduleList.indexOf(state.module) - 1
    state.module = num === -1 ? '秋C' : state.moduleList[num]
    localStorage.setItem('module', state.module)
  },

  nextModule(state) {
    const num: number = state.moduleList.indexOf(state.module) + 1
    state.module = num === 6 ? '春A' : state.moduleList[num]
    localStorage.setItem('module', state.module)
  },

  setLooking(state, { period }) {
    state.looking = period
  },

  setUserData(state, { userData }) {
    state.userData = userData
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
    ctx.commit('SET_TABLE', [])
    localStorage.clear()
  },

  async setPeriod(ctx, { period }) {
    const userData = await $nuxt.$deps.userLectures.getUserData(
      period.user_lecture_id
    )
    ctx.commit('setLooking', { period })
    ctx.dispatch('updatePeriod', { userData })
  },

  async updatePeriod(ctx, { userData }) {
    await $nuxt.$deps.userLectures.updateUserData(userData)
    ctx.commit('setUserData', { userData })
  },
}
