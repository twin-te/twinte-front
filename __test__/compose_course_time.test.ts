import { getLectureTimeAsStr } from '~/usecase/getLectureTimeAsStr'
jest.unmock('~/usecase/getLectureTimeAsStr')

describe('講義時間を文字列に逆パースするテスト', () => {
  test('授業データが空のとき', () => {
    expect(getLectureTimeAsStr([])).toBe('')
  })

  test('春A月1 のとき', () => {
    expect(
      getLectureTimeAsStr([
        { id: 0, module: '春A', day: '月', period: 1, room: '' },
      ])
    ).toBe('春A月1')
  })

  test('春ABC月1 のとき', () => {
    expect(
      getLectureTimeAsStr([
        { id: 0, module: '春A', day: '月', period: 1, room: '' },
        { id: 0, module: '春B', day: '月', period: 1, room: '' },
        { id: 0, module: '春C', day: '月', period: 1, room: '' },
      ])
    ).toBe('春ABC月1')
  })

  test('春A月1234 のとき', () => {
    expect(
      getLectureTimeAsStr([
        { id: 0, module: '春A', day: '月', period: 1, room: '' },
        { id: 0, module: '春A', day: '月', period: 2, room: '' },
        { id: 0, module: '春A', day: '月', period: 3, room: '' },
        { id: 0, module: '春A', day: '月', period: 4, room: '' },
      ])
    ).toBe('春A月1234')
  })

  test('春AB月56 のとき', () => {
    expect(
      getLectureTimeAsStr([
        { id: 0, module: '春A', day: '月', period: 5, room: '' },
        { id: 0, module: '春A', day: '月', period: 6, room: '' },
        { id: 0, module: '春B', day: '月', period: 5, room: '' },
        { id: 0, module: '春B', day: '月', period: 6, room: '' },
      ])
    ).toBe('春AB月56')
  })

  test('春秋モジュールがまたがってる（春秋AB56）とき', () => {
    expect(
      getLectureTimeAsStr([
        { id: 0, module: '春A', day: '月', period: 5, room: '' },
        { id: 0, module: '春A', day: '月', period: 6, room: '' },
        { id: 0, module: '秋A', day: '月', period: 5, room: '' },
        { id: 0, module: '秋A', day: '月', period: 6, room: '' },
      ])
    ).toBe('春秋A月56')
  })

  test('夏季休業中 のとき', () => {
    expect(
      getLectureTimeAsStr([
        { id: 0, module: '夏季休業中', day: '', period: 0, room: '' },
      ])
    ).toBe('夏季')
  })

  test('冬季休業中 & 集中 のとき', () => {
    expect(
      getLectureTimeAsStr([
        { id: 0, module: '冬季休業中', day: '集中', period: 0, room: '' },
      ])
    ).toBe('冬季集中')
  })

  test('通年 & 不明 のとき', () => {
    expect(
      getLectureTimeAsStr([
        { id: 0, module: '通年', day: '不明', period: 0, room: '' },
      ])
    ).toBe('通年不明')
  })

  test('生物資源科学研究法のとき', () => {
    expect(
      getLectureTimeAsStr([
        { id: 0, module: '春A', day: '金', period: 4, room: '' },
        { id: 0, module: '春B', day: '金', period: 4, room: '' },
        { id: 0, module: '春C', day: '集中', period: 0, room: '' },
        { id: 0, module: '夏季休業中', day: '集中', period: 0, room: '' },
      ])
    ).toBe('春AB金4C集中夏季集中')
  })

  describe('異常値でもエラーが起こらないかテスト', () => {
    test('値の重複があるとき', () => {
      const fn = jest.fn(() =>
        getLectureTimeAsStr([
          { id: 0, module: '春A', day: '金', period: 4, room: '' },
          { id: 0, module: '春A', day: '金', period: 4, room: '' },
          { id: 0, module: '春A', day: '金', period: 4, room: '' },
        ])
      )
      fn()
      // 関数が無事終了するか確認
      expect(fn).toHaveReturned()
    })

    test('一部の値が空欄のとき', () => {
      const fn = jest.fn(() =>
        getLectureTimeAsStr([
          { id: 0, module: '春A', day: '金', period: 4, room: '' },
          { id: 0, module: '春A', day: '', period: 0, room: '' },
          { id: 0, module: '', day: '', period: 0, room: '' },
        ])
      )
      fn()
      expect(fn).toHaveReturned()
    })

    test('一部の値が想定されてない値のとき', () => {
      const fn = jest.fn(() =>
        getLectureTimeAsStr([
          { id: 0, module: 'りんご', day: '金', period: -500, room: '' },
          { id: 0, module: '春A', day: 'アスタチン', period: 0, room: '' },
          { id: 0, module: 'パンダ', day: '反重力', period: 25, room: '' },
        ])
      )
      fn()
      expect(fn).toHaveReturned()
    })
  })
})
