import 'vuex'
import * as Visible from '../adapter/store/visible/type'
import * as TableData from '../adapter/store/tableData/type'

declare module 'vuex' {
  type RootState = {
    Visible: Visible.S
    TableData: TableData.S
  }
  type RootGetters = Visible.RG & TableData.RG
  type RootMutations = Visible.RM & TableData.RM
  type RootActions = TableData.RA
}
