// import { mutations } from '../api'
import { S } from '../api/type'

let state: S
const todo = true

beforeEach(() => {
  state = {
    data: null,
    list_number: [],
    moduleList: ['haruA', 'haruB', 'haruC', 'akiA', 'akiB', 'akiC'],
    isLogin: false,
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
