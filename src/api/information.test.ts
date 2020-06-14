import { getInformation } from './information'

jest.setTimeout(30000)

describe(getInformation, () => {
  it('basic usage', async () => {
    const info = await getInformation()
    expect(info.status).toBe(200)
  })
})
