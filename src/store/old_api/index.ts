import axios from "axios";
import { union } from "lodash";

import tableData from "../../assets/json/data.json";

/** https://twinte.net/apiとの通信の状態管理を行なう */
import { Getters, Mutations, Actions } from "vuex";
import { S, G, M, A } from "./type";
// ______________________________________________________
//
export const state = (): S => ({
  data: null,
  list_number: [],
  moduleList: ["haruA", "haruB", "haruC", "akiA", "akiB", "akiC"]
});
// ______________________________________________________
//
export const getters: Getters<S, G> = {
  data(state) {
    return state.data;
  },
  list_number(state) {
    return state.list_number;
  }
};
// ______________________________________________________
//
export const mutations: Mutations<S, M> = {
  /**
   * 時間割の上書き更新
   * @param payload module: 更新する学期, data: その学期の時間割情報すべて
   */
  updateTable(state, payload) {
    if (state.data === null) {
      state.data = new Array(6);
    }
    const list: string[] = ["haruA", "haruB", "haruC", "akiA", "akiB", "akiC"];
    const position: number = list.indexOf(payload.module);
    state.data[position] = payload.data; // -1の状態だめじゃん
    localStorage.setItem("table", JSON.stringify(state.data));
  },
  updateTableAll(state, payload) {
    state.data = payload.data;
    localStorage.setItem("table", JSON.stringify(state.data));
  },
  /**
   * 授業番号のリストに重複なく追加+nullチェック
   * @param payload module: 追加する学期 ex) "haruA", data: 授業番号
   */
  pushNumber(state, payload) {
    const list: string[] = ["haruA", "haruB", "haruC", "akiA", "akiB", "akiC"];
    const position: number = list.indexOf(payload.module);
    state.list_number[position] = union(
      state.list_number[position],
      payload.data
    );
    localStorage.setItem("number", JSON.stringify(state.list_number));
  },
  pushNumberAll(state, payload) {
    state.list_number = payload.data;
    localStorage.setItem("number", JSON.stringify(state.list_number));
  }
};
// ______________________________________________________
//
export const actions: Actions<S, A, G, M> = {
  /** dispatch("old_api/asyncNumber", {
      number: number[],
      module: "haruA"
    }); */
  async asyncNumber(ctx, payload) {
    const list =
      ctx.state.list_number[ctx.state.moduleList.indexOf(payload.module)];
    const numbers = union(list, payload.number);
    try {
      await axios
        .post("https://twinte.net/api", {
          number: numbers,
          view_season: payload.module
        })
        .then(items => {
          if (items.data[0] === null) return; // 違うデータだった場合は追加しない
          ctx.commit("updateTable", {
            module: payload.module,
            data: items.data
          });
          ctx.commit("pushNumber", {
            module: payload.module,
            data: payload.number
          });
        });
    } catch (error) {
      console.error(error);
    }
  },
  dev(ctx) {
    ctx.commit("updateTableAll", { data: tableData });
  }
};
