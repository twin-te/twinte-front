// import { mutations } from '../api'
import { S } from '../api/type'

let state: S
const todo = true

beforeEach(() => {
  state = {
    timeTables: [],
    isLogin: false
  }
})

describe('add lecture', () => {
  it('no login', () => {
    state.isLogin = false
    expect(todo).toBe(todo)
  })
  it('logined', () => {
    state.isLogin = true
    expect(todo).toBe(todo)
  })
})
