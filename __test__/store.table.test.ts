import { mutations } from '../src/store/table'
import { S, Module } from '../src/store/table/type'

let state: S

beforeEach(() => {
  state = {
    moduleList: [Module.SpringA, Module.SpringB, Module.SpringC, Module.FallA, Module.FallB, Module.FallC],
    module: Module.SpringA,
    looking: null,
  }
})

describe('nextModule', () => {
  it('SpringA -> SpringA : loop', () => {
    mutations.nextModule(state)
    expect(state.module).toBe(Module.SpringB)
    mutations.nextModule(state)
    expect(state.module).toBe(Module.SpringC)
    mutations.nextModule(state)
    expect(state.module).toBe(Module.FallA)
    mutations.nextModule(state)
    expect(state.module).toBe(Module.FallB)
    mutations.nextModule(state)
    expect(state.module).toBe(Module.FallC)
    mutations.nextModule(state)
    expect(state.module).toBe(Module.SpringA)
  })
})

describe('prevModule', () => {
  it('SpringA -> SpringA : loop', () => {
    mutations.prevModule(state)
    expect(state.module).toBe(Module.FallC)
    mutations.prevModule(state)
    expect(state.module).toBe(Module.FallB)
    mutations.prevModule(state)
    expect(state.module).toBe(Module.FallA)
    mutations.prevModule(state)
    expect(state.module).toBe(Module.SpringC)
    mutations.prevModule(state)
    expect(state.module).toBe(Module.SpringB)
    mutations.prevModule(state)
    expect(state.module).toBe(Module.SpringA)
  })
})

describe('setModule', () => {
  it('set module to SpringC', () => {
    mutations.setModule(state, { module: Module.SpringC })
    expect(state.module).toBe(Module.SpringC)
  })
})

//TODO looking
