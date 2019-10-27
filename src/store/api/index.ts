import axios from "axios";
import union from "lodash/union";

import tableData from "../../assets/json/data.json";

export const BASE_URL = "https://dev.api.twinte.net";

import { Getters, Mutations, Actions } from "vuex";
import { S, G, M, A } from "./type";

export const state = (): S => ({
  data: null,
  list_number: [],
  moduleList: ["haruA", "haruB", "haruC", "akiA", "akiB", "akiC"],
  isLogin: false
});

export const getters: Getters<S, G> = {
  data(state) {
    return state.data;
  },
  list_number(state) {
    return state.list_number;
  },
  isLogin(state) {
    return state.isLogin;
  }
};

export const mutations: Mutations<S, M> = {
  UPDATE_TABLE(state, payload) {
    if (state.data === null) {
      state.data = new Array(6);
    }
    const position: number = state.moduleList.indexOf(payload.module);
    state.data[position] = payload.data; // -1の状態だめじゃん
    localStorage.setItem("table", JSON.stringify(state.data));
  },
  UPDATE_TABLES(state, payload) {
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
  },
  LOGIN(state) {
    state.isLogin = true;
  },
  LOGOUT(state) {
    state.isLogin = false;
    state.data = null;
  }
};

export const actions: Actions<S, A, G, M> = {
  async asyncNumber(ctx, payload) {
    ctx.dispatch("createNumbers");
    await axios
      .post(BASE_URL + "lectures", {
        number: payload.number
      })
      .then(items => {
        /**tableを作成する */

        /**tableを作成する */
        if (items.data[0] === null) return;
        ctx.commit("UPDATE_TABLE", {
          module: payload.module,
          data: items.data
        });
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
  async asyncCSV(ctx, payload) {
    ctx.commit("SET_NUMBER", { module: payload.module, data: [] });

    const reader = new FileReader();
    reader.onerror = function() {
      alert("ファイル読み取りに失敗しました");
    };
    reader.onload = function() {
      const lineArr: string[] =
        typeof reader.result === "string" ? reader.result.split("\n") : [];
      for (let i = 0; i < lineArr.length; i++) {
        const number = lineArr[i];
        const module = payload.module;
        ctx.dispatch("asyncNumber", { number, module });
      }
    };
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
    ctx.commit("UPDATE_TABLES", { data: data });
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
          if (c.number !== "") {
            data[i] = union(data[i], [c.number]);
          }
        });
      });
    });

    ctx.commit("SET_NUMBERS", { data });
    console.log(data);
  },
  login(ctx) {
    //TODO axiosで時間割をとってくる
    ctx.commit("UPDATE_TABLES", { data: tableData });
    ctx.dispatch("createNumbers"); // SET_NUMBERS
    ctx.commit("LOGIN");
  },
  logout(ctx) {
    ctx.commit("UPDATE_TABLES", { data: null });
    ctx.commit("SET_NUMBERS", { data: null });
    ctx.commit("LOGOUT");
  }
};
