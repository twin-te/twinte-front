import { getInformation, parse } from './information'

jest.setTimeout(30000)

describe(getInformation.name, () => {
  it('basic usage', async () => {
    const info = await getInformation()
    expect(info.status).toBe(200)
    expect(info.data.slice(-1)[0]).toMatchSnapshot('info__result')
  })
})

describe(parse.name, () => {
  it('parse is Endomophism', async () => {
    const info = await getInformation()
    const parsedInfo = parse(info)
    expect(parsedInfo.slice(-1)[0]).toMatchSnapshot('info__result__parced')
  })
})
