import './shims-vuex-impl'
import './shims-vuex-type'

// twinte-parser, twinte-server
import { Period, User, UserData, Lecture } from './server'
import { Day, Module } from './parser'

/** 時間割 */
type TimeTables = Period[]

export { Period, User, UserData, Day, Module, TimeTables, Lecture }