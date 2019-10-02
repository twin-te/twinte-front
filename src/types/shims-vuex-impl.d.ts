import "vuex";
import * as Visible from "../store/visible/type";
import * as Table from "../store/table/type";
import * as Old_api from "../store/old_api/type";
import * as Api from "../store/api/type";

declare module "vuex" {
  type RootState = {
    Visible: Visible.S;
    Table: Table.S;
    Old_api: Old_api.S;
    Api: Api.S;
  };
  type RootGetters = Visible.RG & Table.RG & Old_api.RG & Api.RG;
  type RootMutations = Visible.RM & Table.RM & Old_api.RM & Api.RM;
  type RootActions = Visible.RA & Table.RA & Old_api.RA & Api.RA;
}
