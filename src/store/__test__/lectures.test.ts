import { getLectureById, searchLectures } from '../api/lectures'
import res_tomato from '../__test__/data/response_1572494666201.json'
import res_GB11514 from '../__test__/data/response_1572495022957.json'

describe('授業名での検索 searchLectures', () => {
  it('search トマト -> オートマトン', async () => {
    const data = await searchLectures('トマト')
    expect(data).toMatchObject(res_tomato)
  })
  it('search ンゴー(no match)', async () => {
    const data = await searchLectures('ンゴー')
    expect(data).toBeNull
  })
})

describe('IDでの授業の検索 getLectureById', () => {
  it('GB11514 -> シミュレーション物理', async () => {
    const data = await getLectureById('GB11514')
    expect(data).toMatchObject(res_GB11514)
  })
  it('GB114514(no match)', async () => {
    const data = await getLectureById('GB114514')
    expect(data).toBeNull
  })
})
