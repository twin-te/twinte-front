import { isLogin } from '../src/store/api/auth'

describe('isLogin', () => {
  it('isLogin is false', async () => {
    const data = await isLogin()
    expect(data).not.toBeTruthy()
  })
})
