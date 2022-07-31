import axiosClient from "@aspida/axios";
import axios from "axios";
import qs from "qs";
import instance, { ApiInstance } from "./aspida/$api";

const baseURL =
  import.meta.env.VITE_API_URL === undefined
    ? "https://app.dev.twinte.net/api/v3"
    : String(import.meta.env.VITE_API_URL);

export const getApiInstance = () => {
  return instance(
    axiosClient(axios, {
      baseURL,
      paramsSerializer: (r) => qs.stringify(r),
      validateStatus: () => true,
      withCredentials: true,
    })
  ) as ApiInstance;
};
