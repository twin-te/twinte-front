import { Dayjs } from "dayjs";
import { Store } from "vuex";
import { ApiInstance } from "~/api/$api";
import { GlobalState } from "~/store";

export interface Ports {
  api: ApiInstance;
  store: Store<GlobalState>;
  now: Dayjs;
}
