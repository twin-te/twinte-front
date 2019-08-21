/** example
import 'vuex'
import * as Counter from '../store/counter/type'
import * as Todos from '../store/todos/type'

declare module 'vuex' {
  type RootState = {
    counter: Counter.S
    todos: Todos.S
  }
  type RootGetters = Counter.RG & Todos.RG
  type RootMutations = Counter.RM & Todos.RM
  type RootActions = Counter.RA & Todos.RA
}
 */

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
