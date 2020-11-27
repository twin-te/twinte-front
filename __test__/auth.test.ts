import { Auth } from '~/adapter'

jest.setTimeout(30000)

let AuthRepository: Auth

beforeAll(() => {
  AuthRepository = new Auth()
})

describe('isLogin', () => {
  it('isLogin is false', async () => {
    const data = await AuthRepository.isLogin()
    expect(data).not.toBeTruthy()
  })
})
