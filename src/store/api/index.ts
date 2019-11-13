import { Getters, Mutations, Actions } from 'vuex'
import { S, G, M, A } from './type'

// import { Lecture } from '../../types/index'

// import { isLogin, login, logout } from './auth'
// import { getLectureById, searchLectures } from './lectures'
// import { getUserData, updateUserData } from './userdata'
import { fetchLectures } from './util'
// import {
//   createLecture,
//   deleteLecture,
//   getTable,
//   getTableAll,
//   getToday,
//   postLecture,
// } from './timetables'

export const BASE_URL = 'https://dev.api.twinte.net'

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
    state.timeTables.concat(payload.lectures)
    localStorage.setItem('table', JSON.stringify(state.timeTables))
  },
  DELETE_TABLE(state, payload) {
    state.timeTables = state.timeTables.filter((table) => {
      table.lectureID !== payload.lecture.lectureID
    })
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
  async addTable(ctx, payload) {
    const lectures = await fetchLectures(payload.lectureId, 2019)
    console.log(ctx, lectures)
  },
  async deleteTable(ctx, payload) {
    console.log(ctx, payload)
  },
  async asyncCSV(ctx, payload) {
    console.log(ctx, payload)
  },
  async login(ctx) {
    ctx.commit('LOGIN')
  },
  async logout(ctx) {
    ctx.commit('LOGOUT')
  },
}
