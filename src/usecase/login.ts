import { PortsPick } from '~/adapter'
import { UseCase } from '.'
type R = PortsPick<'auth' | 'store'>
type A = boolean

export class Login implements UseCase<R, A> {
  async run({ auth, store }: R) {
    if (await auth.isLogin()) {
      store.dispatch('tableData/login')
      return true
    } else {
      store.dispatch('tableData/logout')
      return false
    }
  }
}
