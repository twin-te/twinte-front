import axios from "axios";
import union from "lodash/union";

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
  },
  isLogin(state) {
    return state.data !== null;
  }
};
// ______________________________________________________
//
export const mutations: Mutations<S, M> = {
  updateTable(state, payload) {
    if (state.data === null) {
      state.data = new Array(6);
    }
    const position: number = state.moduleList.indexOf(payload.module);
    state.data[position] = payload.data; // -1の状態だめじゃん
    localStorage.setItem("table", JSON.stringify(state.data));
  },
  updateTableAll(state, payload) {
    if (payload.data === null) {
      state.data = null;
      localStorage.removeItem("table");
      return;
    }
    state.data = payload.data;
    localStorage.setItem("table", JSON.stringify(state.data));
  },
  SET_NUMBER(state, payload) {
    const position: number = state.moduleList.indexOf(payload.module);
    state.list_number[position] = union(
      state.list_number[position],
      payload.data
    );
    localStorage.setItem("number", JSON.stringify(state.list_number));
  },
  SET_NUMBERS(state, payload) {
    if (payload.data === null) {
      state.list_number = [];
      localStorage.removeItem("number");
      return;
    }
    state.list_number = payload.data;
    localStorage.setItem("number", JSON.stringify(state.list_number));
  }
};
// ______________________________________________________
//
export const actions: Actions<S, A, G, M> = {
  async asyncNumber(ctx, payload) {
    ctx.dispatch("createNumbers");
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
          ctx.dispatch("assignObj", {
            moduleNum: ctx.state.moduleList.indexOf(payload.module)
          });
          ctx.dispatch("createNumbers");
          window.alert("時間割を追加しました");
        });
    } catch (error) {
      console.error(error);
    }
  },
  async asyncCSV(ctx, payload) {
    ctx.commit("SET_NUMBER", { module: payload.module, data: [] });
    await axios
      .post("https://twinte.net/api", payload.formData, payload.config)
      .then(function(items) {
        ctx.commit("updateTable", { module: payload.module, data: items.data });
        ctx.dispatch("assignObj", {
          moduleNum: ctx.state.moduleList.indexOf(payload.module)
        });
        ctx.dispatch("createNumbers");
        window.alert("時間割を追加しました");
      })
      .catch(function(err) {
        console.error(err);
      });
  },
  assignObj(ctx, payload) {
    const source = { attend: 0, absent: 0, late: 0, memo: "" };
    const data = ctx.getters.data;
    if (data === null) {
      return;
    }
    if (data[payload.moduleNum] === undefined) {
      return;
    }
    data[payload.moduleNum].map(a => {
      return a.map(b => {
        return b.absent === null ? Object.assign(b, source) : b;
      });
    });
    console.dir(data);
    ctx.commit("updateTableAll", { data: data });
  },
  createNumbers(ctx) {
    const table = ctx.getters["data"];
    if (table === null) {
      return;
    }

    const data = new Array(6);
    table.forEach((a, i) => {
      a.forEach(b => {
        b.forEach(c => {
          if (c.number !== '') {
            data[i] = union(data[i], [c.number]);
          }
        })
      })
    });
    
    ctx.commit("SET_NUMBERS", { data });
    console.log(data);
    
  },
  login(ctx) {
    ctx.commit("updateTableAll", { data: tableData });
  },
  logout(ctx) {
    ctx.commit("updateTableAll", { data: null });
    ctx.commit("SET_NUMBERS", { data: null });
  }
};
