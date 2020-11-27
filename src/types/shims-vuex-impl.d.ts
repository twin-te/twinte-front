import 'vuex'
import * as Visible from '../adapter/store/visible/type'
import * as Table from '../adapter/store/table/type'
import * as Api from '../adapter/store/api/type'

declare module 'vuex' {
  type RootState = {
    Visible: Visible.S
    Table: Table.S
    Api: Api.S
  }
  type RootGetters = Visible.RG & Table.RG & Api.RG
  type RootMutations = Visible.RM & Table.RM & Api.RM
  type RootActions = Table.RA & Api.RA
}
