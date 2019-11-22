import { mutations } from "../src/store/table";
import { S, Module } from "../src/store/table/type";
import { Period } from "~/src/types";
export enum Day {
  Sun = "日",
  Mon = "月",
  Tue = "火",
  Wed = "水",
  Thu = "木",
  Fri = "金",
  Sat = "土",
  Unknown = "不明"
}

let state: S;

beforeEach(() => {
  state = {
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
  };
});

describe("nextModule", () => {
  it("SpringA -> SpringA : loop", () => {
    mutations.nextModule(state);
    expect(state.module).toBe(Module.SpringB);
    mutations.nextModule(state);
    expect(state.module).toBe(Module.SpringC);
    mutations.nextModule(state);
    expect(state.module).toBe(Module.FallA);
    mutations.nextModule(state);
    expect(state.module).toBe(Module.FallB);
    mutations.nextModule(state);
    expect(state.module).toBe(Module.FallC);
    mutations.nextModule(state);
    expect(state.module).toBe(Module.SpringA);
  });
});

describe("prevModule", () => {
  it("SpringA -> SpringA : loop", () => {
    mutations.prevModule(state);
    expect(state.module).toBe(Module.FallC);
    mutations.prevModule(state);
    expect(state.module).toBe(Module.FallB);
    mutations.prevModule(state);
    expect(state.module).toBe(Module.FallA);
    mutations.prevModule(state);
    expect(state.module).toBe(Module.SpringC);
    mutations.prevModule(state);
    expect(state.module).toBe(Module.SpringB);
    mutations.prevModule(state);
    expect(state.module).toBe(Module.SpringA);
  });
});

describe("setModule", () => {
  it("set module to SpringC", () => {
    mutations.setModule(state, { module: Module.SpringC });
    expect(state.module).toBe(Module.SpringC);
  });
});

describe("クリックした授業情報を追加", () => {
  const period: Period = {
    period: 4,
    day: Day.Thu,
    module: Module.FallB,
    room: "3A306",
    year: 2019,
    lectureID: "GB11404",
    name: "電磁気学",
    instructor: "安永 守利"
  };
  it("set period GB11404 into looking", () => {
    mutations.setLooking(state, { period });
    expect(state.looking).toBe(period);
  });
});

//TODO UserData
