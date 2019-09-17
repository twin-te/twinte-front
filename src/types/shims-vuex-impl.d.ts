import "vuex";
import * as Visible from "../store/visible/type";
import * as Table from "../store/table/type";
import * as old_api from "../store/old_api/type";

declare module "vuex" {
  type RootState = {
    Visible: Visible.S;
    Table: Table.S;
    Old_api: old_api.S;
  };
  type RootGetters = Visible.RG & Table.RG & old_api.RG;
  type RootMutations = Visible.RM & Table.RM & old_api.RM;
  type RootActions = Visible.RA & Table.RA & old_api.RA;
}
