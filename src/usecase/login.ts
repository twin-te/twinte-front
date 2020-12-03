import { PortsPick } from '~/adapter'
import { UseCase } from '.'
type R = PortsPick<'users' | 'store'>
type A = boolean

export class Login implements UseCase<R, A> {
  async run({ users, store }: R) {
    if (await users.isLogin()) {
      store.dispatch('tableData/login')
      return true
    } else {
      store.dispatch('tableData/logout')
      return false
    }
  }
}
