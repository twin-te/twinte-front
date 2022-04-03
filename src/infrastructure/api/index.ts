import axiosClient from "@aspida/axios";
import axios from "axios";
import instance, { ApiInstance } from "./aspida/$api";
import qs from "qs";

const baseURL =
  import.meta.env.VITE_API_URL === undefined
    ? "https://app.dev.twinte.net/api/v3"
    : String(import.meta.env.VITE_API_URL);

export const useApi = () => {
  return instance(
    axiosClient(axios, {
      baseURL,
      paramsSerializer: (r) => qs.stringify(r),
      validateStatus: () => true,
      withCredentials: true,
    })
  ) as ApiInstance;
};
