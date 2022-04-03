import axiosClient from "@aspida/axios";
import axios from "axios";
import { Ports } from "~/adapter";
import instance, { ApiInstance } from "~/api/$api";
import { useStore } from "~/store";
import { useAsyncState } from "@vueuse/core";
import dayjs, { ConfigType, Dayjs } from "dayjs";
import qs from "qs";
import "dayjs/locale/ja";

const baseURL =
  import.meta.env.VITE_API_URL === undefined
    ? "https://app.dev.twinte.net/api/v3"
    : String(import.meta.env.VITE_API_URL);

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
  const ports = usePorts();
  return useAsyncState(fn(ports), initState);
};

export const usePorts = (): Ports => ({
  api: instance(
    axiosClient(axios, {
      baseURL,
      paramsSerializer: (r) => qs.stringify(r),
      validateStatus: () => true,
      withCredentials: true,
    })
  ) as ApiInstance,
  store: useStore(),
  dayjs: (date?: ConfigType): Dayjs => dayjs(date).locale("ja"),
});
