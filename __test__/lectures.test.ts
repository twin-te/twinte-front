import { searchLectures } from '../src/store/api/lectures'

jest.setTimeout(30000)

describe('授業名での検索 searchLectures', () => {
  it('search トマト -> オートマトン', async () => {
    const data = await searchLectures('トマト')
    expect(data[0].name).toBe('オートマトンと形式言語')
  })
  it('search ンゴー(no match)', async () => {
    const data = await searchLectures('ンゴー')
    expect(data).toBeNull
  })
  it('GB11514 -> シミュレーション物理', async () => {
    const data = await searchLectures('GB11514')
    expect(data[0].name).toBe('シミュレーション物理')
  })
  it('GB114514(no match)', async () => {
    const data = await searchLectures('GB114514')
    expect(data).toBeNull
  })
})
