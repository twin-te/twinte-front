import "./shims-vuex-impl";
import "./shims-vuex-type";

// twinte-parser
import { OutputPeriodData } from "./server";
import { Day, Module } from "./parser";

/** 時間割 */
type TimeTables = OutputPeriodData[];
type Period = OutputPeriodData;

export { Day, Module, TimeTables, Period };
