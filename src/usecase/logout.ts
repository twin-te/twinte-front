import { PortsPick } from '~/adapter'
import { BASE_URL } from '~/config'
import { UseCase } from '.'

type R = PortsPick<'store'>
type A = void

export class Logout implements UseCase<R, A> {
  async run({ store }: R) {
    store.dispatch('tableData/logout')
    location.href = `${BASE_URL}/auth/logout`
  }
}
