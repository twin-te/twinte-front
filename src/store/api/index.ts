import { Getters, Mutations, Actions } from 'vuex'
import { S, G, M, A } from './type'

import { logout } from './auth'
import {
  deleteLecture,
  getTableAll,
  postLecture,
} from './timetables'

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
  CREATE_TABLE(state, payload) {
    state.timeTables = [...state.timeTables, ...payload.periods]
  },
  DELETE_TABLE(state, payload) {
    state.timeTables = state.timeTables
      .filter(table => table !== payload.period)
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

  async addTable(ctx, { lectureIds }) {

    lectureIds.forEach(async lectureId => {
      await postLecture(lectureId, 2019)
    })
    // 時間割の登録

    const periods = await getTableAll(2019)
    ctx.commit('CREATE_TABLE', { periods })
    localStorage.setItem('table', JSON.stringify(ctx.state.timeTables))
    // ローカルに追加

  },


  async deleteTable(ctx, { module, day, period }) {

    await deleteLecture(2019, module, day, period)
    // サーバーから削除

    ctx.commit('DELETE_TABLE', { period })
    localStorage.setItem('table', JSON.stringify(ctx.state.timeTables))
    // ローカルデータの削除

  },


  async asyncCSV(ctx, payload) {
    console.log("未実装", ctx, payload)
  },


  async login(ctx) {
    const periods = await getTableAll(2019)
    ctx.commit('CREATE_TABLE', { periods })
    ctx.commit('LOGIN')
    localStorage.setItem('table', JSON.stringify(ctx.state.timeTables))
  },


  async logout(ctx) {
    logout()
    ctx.commit('LOGOUT')
    localStorage.removeItem('table')
  },

  
}
