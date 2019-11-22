import "./shims-vuex-impl";
import "./shims-vuex-type";

// twinte-parser, twinte-server
import { Period, UserData, Lecture } from "./server";
import { Day, Module } from "./parser";

/** 時間割 */
type TimeTables = Period[];

export { Period, UserData, Day, Module, TimeTables };
