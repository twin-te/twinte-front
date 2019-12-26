import 'vuex';
import * as Visible from '../store/visible/type';
import * as Table from '../store/table/type';
import * as Api from '../store/api/type';

declare module 'vuex' {
  type RootState = {
    Visible: Visible.S;
    Table: Table.S;
    Api: Api.S;
  };
  type RootGetters = Visible.RG & Table.RG & Api.RG;
  type RootMutations = Visible.RM & Table.RM & Api.RM;
  type RootActions = Table.RA & Api.RA;
}
