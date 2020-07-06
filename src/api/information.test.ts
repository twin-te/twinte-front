import { getInformation, parse } from './information'

jest.setTimeout(30000)

describe(getInformation.name, () => {
  it('basic usage', async () => {
    const info = await getInformation()
    expect(info.status).toBe(200)
  })
})

describe(parse.name, () => {
  it('idが多分36文字固定だろうから、取得できるかためす', async () => {
    const { data: info } = await getInformation()
    console.dir(info)
    const parsedInfo = parse(info)
    expect(parsedInfo[0].id.length).toBe(36)
  })
})
