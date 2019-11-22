/**
 * # State of Table #
 *
 * - ユーザーが閲覧している学期の情報はここで管理する。
 * - 授業をクリックしたときの場所情報も保持している
 * - サーバーとの型の統一化のためモジュール情報はすべて"SpringA": Moduleなどのフォーマットで記述します。
 *
 */

import { Getters, Mutations, Actions } from "vuex";
import { S, G, M, A, Module } from "./type";
import { getUserData, updateUserData } from "../api/userdata";
import { YEAR } from "../api/config";
// ______________________________________________________
//
export const state = (): S => ({
  moduleList: [
    Module.SpringA,
    Module.SpringB,
    Module.SpringC,
    Module.FallA,
    Module.FallB,
    Module.FallC
  ],
  module: Module.SpringA,
  looking: null,
  userData: null
});
// ______________________________________________________
//
export const getters: Getters<S, G> = {
  module(state) {
    return state.module;
  },

  prevModule(state) {
    const num: number = state.moduleList.indexOf(state.module) - 1;
    return num === -1 ? Module.FallC : state.moduleList[num];
  },

  nextModule(state) {
    const num: number = state.moduleList.indexOf(state.module) + 1;
    return num === 6 ? Module.SpringA : state.moduleList[num];
  },

  moduleNum(state) {
    return state.moduleList.indexOf(state.module);
  },

  looking(state) {
    return state.looking;
  },

  userData(state) {
    return state.userData;
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
    const num: number = state.moduleList.indexOf(state.module) - 1;
    state.module = num === -1 ? Module.FallC : state.moduleList[num];
    localStorage.setItem("module", state.module);
  },

  nextModule(state) {
    const num: number = state.moduleList.indexOf(state.module) + 1;
    state.module = num === 6 ? Module.SpringA : state.moduleList[num];
    localStorage.setItem("module", state.module);
  },

  setLooking(state, { period }) {
    state.looking = period;
  },

  setUserData(state, { userData }) {
    state.userData = userData;
  }
};

export const actions: Actions<S, A, G, M> = {
  async setPeriod(ctx, { period }) {
    let userData = await getUserData(period.lectureID, YEAR);
    if (!userData) {
      userData = {
        year: period.year,
        lectureID: period.lectureID,
        memo: "",
        attendance: 0,
        absence: 0,
        late: 0
      };
    }
    ctx.commit("setLooking", { period });
    ctx.dispatch("updatePeriod", { userData });
  },

  async updatePeriod(ctx, { userData }) {
    await updateUserData(userData);
    console.log(await getUserData(userData.lectureID, YEAR), userData);
    ctx.commit("setUserData", { userData });
  }
};
