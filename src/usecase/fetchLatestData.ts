import { UseCase } from '.'
import { PortsPick } from '~/adapter'
import { YEAR } from '~/config'
import { TimetableEntity } from '~/api/@types'

type R = PortsPick<'timeTable' | 'store'>
type A = TimetableEntity[]

export class FetchLatestData implements UseCase<R, A> {
  year: number

  constructor(year = YEAR) {
    this.year = year
  }

  async run({ timeTable, store }: R) {
    const periodDatas = await timeTable.getTimeTables(YEAR)
    store.dispatch('tableData/setTable', periodDatas)
    // localStorage.setItem('table', JSON.stringify(periodDatas))
    return periodDatas
  }
}
