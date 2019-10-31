import { mutations } from '../table'
import { S } from '../table/type'

let state: S

beforeEach(() => {
  state = {
    moduleList: ['SpringA', 'SpringB', 'SpringC', 'FallA', 'FallB', 'FallC'],
    module: 'SpringA',
    click: null,
  }
})

describe('nextModule', () => {
  it('SpringA -> SpringA : loop', () => {
    mutations.nextModule(state)
    expect(state.module).toBe('SpringB')
    mutations.nextModule(state)
    expect(state.module).toBe('SpringC')
    mutations.nextModule(state)
    expect(state.module).toBe('FallA')
    mutations.nextModule(state)
    expect(state.module).toBe('FallB')
    mutations.nextModule(state)
    expect(state.module).toBe('FallC')
    mutations.nextModule(state)
    expect(state.module).toBe('SpringA')
  })
})

describe('prevModule', () => {
  it('SpringA -> SpringA : loop', () => {
    mutations.prevModule(state)
    expect(state.module).toBe('FallC')
    mutations.prevModule(state)
    expect(state.module).toBe('FallB')
    mutations.prevModule(state)
    expect(state.module).toBe('FallA')
    mutations.prevModule(state)
    expect(state.module).toBe('SpringC')
    mutations.prevModule(state)
    expect(state.module).toBe('SpringB')
    mutations.prevModule(state)
    expect(state.module).toBe('SpringA')
  })
})

describe('setModule', () => {
  it('set module to SpringC', () => {
    mutations.setModule(state, { module: 'SpringC' })
    expect(state.module).toBe('SpringC')
  })
})

describe('setClick', () => {
  it('value change when number click', () => {
    mutations.setClick(state, { x: 3, y: 2 })
    expect(state.click).toMatchObject({ x: 3, y: 2 })
  })
})
