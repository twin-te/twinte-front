/**
 * サーバー完成したら書く
 */
import { Auth } from '../auth'

let AuthRepository: Auth

beforeAll(() => {
  AuthRepository = new Auth()
})

describe('isLogin', () => {
  it('isLogin is false', async () => {
    const data = await AuthRepository.isLogin()
    expect(data).not.toBeTruthy()
  })

  it('after login', async () => {
    // ログイン
    jest.spyOn(Auth.prototype, 'isLogin').mockReturnValue(Promise.resolve(true))

    const data = await AuthRepository.isLogin()
    expect(data).toBeTruthy()
  })
})
