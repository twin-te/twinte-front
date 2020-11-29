import { PortsPick } from '~/adapter'
import { UseCase } from '.'

type R = PortsPick<'auth' | 'store'>
type A = void

export class Logout implements UseCase<R, A> {
  async run({ store }: R) {
    store.dispatch('tableData/logout')
  }
}
