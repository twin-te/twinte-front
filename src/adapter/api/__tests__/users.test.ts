/**
 * サーバー完成したら書く
 */
import { Users } from '../users'

let users: Users

beforeAll(() => {
  users = new Users()
})

describe('isLogin', () => {
  it('isLogin is false', async () => {
    const data = await users.isLogin()
    expect(data).not.toBeTruthy()
  })

  it('after login', async () => {
    // ログイン
    jest
      .spyOn(Users.prototype, 'isLogin')
      .mockReturnValue(Promise.resolve(true))

    const data = await users.isLogin()
    expect(data).toBeTruthy()
  })
})
