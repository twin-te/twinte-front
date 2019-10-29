import { mutations } from '../visible'
import { S } from '../visible/type'

let state: S

beforeEach(() => {
  state = {
    drawer: false,
    detail: false,
    add: false,
    table: { display: true, move: 'left' },
  }
})

describe('chDetail', () => {
  it('set true', () => {
    mutations.chDetail(state, { display: true })
    expect(state.detail).toBe(true)
  })
  it('set false', () => {
    mutations.chDetail(state, { display: false })
    expect(state.detail).toBe(false)
  })
})

describe('chDrawer', () => {
  it('set true', () => {
    mutations.chDrawer(state, { display: true })
    expect(state.drawer).toBe(true)
  })
  it('set false', () => {
    mutations.chDrawer(state, { display: false })
    expect(state.drawer).toBe(false)
  })
})

describe('chAdd', () => {
  it('set true', () => {
    mutations.chAdd(state, { display: true })
    expect(state.add).toBe(true)
  })
  it('set false', () => {
    mutations.chAdd(state, { display: false })
    expect(state.add).toBe(false)
  })
})
