import 'vuex'
import * as Visible from '../adapter/store/visible/type'
import * as PageState from '../adapter/store/pageState/type'
import * as TableData from '../adapter/store/tableData/type'

declare module 'vuex' {
  type RootState = {
    Visible: Visible.S
    Table: PageState.S
    TableData: TableData.S
  }
  type RootGetters = Visible.RG & PageState.RG & TableData.RG
  type RootMutations = Visible.RM & PageState.RM & TableData.RM
  type RootActions = PageState.RA & TableData.RA
}
