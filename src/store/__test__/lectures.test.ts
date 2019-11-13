import { getLectureById, searchLectures } from '../api/lectures'
import res_tomato from '../__test__/data/response_1572494666201.json'
import res_GB11514 from '../__test__/data/response_1572495022957.json'

describe('授業名での検索 searchLectures', () => {
  it.skip('search トマト -> オートマトン', async () => {
    const data = await searchLectures('トマト', 2019)
    expect(data).toMatchObject(res_tomato)
  })
  it.skip('search ンゴー(no match)', async () => {
    const data = await searchLectures('ンゴー', 2019)
    expect(data).toBeNull
  })
})

describe('IDでの授業の検索 getLectureById', () => {
  it.skip('GB11514 -> シミュレーション物理', async () => {
    const data = await getLectureById('GB11514', 2019)
    expect(data).toMatchObject(res_GB11514)
  })
  it.skip('GB114514(no match)', async () => {
    const data = await getLectureById('GB114514', 2019)
    expect(data).toBeNull
  })
})
