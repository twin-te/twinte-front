import { fetchLectures } from '../api/util'
import res_GB11514 from './data/response_1572495022957.json'
import res_GB21601 from './data/GB21621.json'

describe('fetchLectures', () => {
  it('一つ指定', async () => {
    const data = ['GB11514']
    const table = await fetchLectures(data, 2019)
    expect(table).toMatchObject([res_GB11514])
  })
  it('複数指定', async () => {
    const data = ['GB11514', 'GB21601']
    const table = await fetchLectures(data, 2019)
    expect(table).toMatchObject([res_GB11514, res_GB21601])
  })
  it('重複指定', async () => {
    const data = ['GB11514', 'GB21601', 'GB11514']
    const table = await fetchLectures(data, 2019)
    expect(table).toMatchObject([res_GB11514, res_GB21601])
  })
  it('エラーを含む', async () => {
    const data = ['114514', 'GB11514', 'GB21601', 'GB11514']
    const table = await fetchLectures(data, 2019)
    expect(table).toMatchObject([res_GB11514, res_GB21601])
  })
})
