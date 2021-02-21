import axiosClient from "@aspida/axios";
import axios from "axios";
import { useStore } from "vuex";
import { Ports } from "~/adapter";
import instance, { ApiInstance } from "~/api/$api";
import { StateKey } from "~/store";
import { useAsyncState } from "@vueuse/core";
import * as dayjs from "dayjs";

/**
 * @example
 * // define in usecase directory
 * const getMe = async ({ api }: Ports) => {
 *     return await api.users.me.$get();
 * };
 * @example
 * // use in *.vue
 * const { loading, data } = useUsecase(getMe);
 */
export const useUsecase = <T>(
  fn: (ports: Ports) => Promise<T>,
  initState: T
) => {
  const ports = {
    api: instance(
      axiosClient(axios, {
        withCredentials: true,
        validateStatus: () => true,
      })
    ) as ApiInstance,
    store: useStore(StateKey),
    now: dayjs().locale("ja"),
  };

  return useAsyncState(fn(ports), initState);
};
