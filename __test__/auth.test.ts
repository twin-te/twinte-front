import { isLogin } from '../src/api/auth'

jest.setTimeout(30000)

describe('isLogin', () => {
  it('isLogin is false', async () => {
    const data = await isLogin()
    expect(data).not.toBeTruthy()
  })
})
