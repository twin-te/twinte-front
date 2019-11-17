import { mutations } from '../src/store/visible'
import { S } from '../src/store/visible/type'

let state: S

beforeEach(() => {
  state = {
    drawer: false,
    detail: false,
    add: false,
    table: { display: true, move: 'left' },
  }
})

describe('科目詳細の画面の表示の切り替え chDetail', () => {
  it('set true', () => {
    mutations.chDetail(state, { display: true })
    expect(state.detail).toBe(true)
  })
  it('set false', () => {
    mutations.chDetail(state, { display: false })
    expect(state.detail).toBe(false)
  })
})

describe('サイドバーの表示の切り替え chDrawer', () => {
  it('set true', () => {
    mutations.chDrawer(state, { display: true })
    expect(state.drawer).toBe(true)
  })
  it('set false', () => {
    mutations.chDrawer(state, { display: false })
    expect(state.drawer).toBe(false)
  })
})

describe('科目追加画面の表示の切り替え chAdd', () => {
  it('set true', () => {
    mutations.chAdd(state, { display: true })
    expect(state.add).toBe(true)
  })
  it('set false', () => {
    mutations.chAdd(state, { display: false })
    expect(state.add).toBe(false)
  })
})
