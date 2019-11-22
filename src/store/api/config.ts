export const BASE_URL: string =
  process.env.API_URL || "https://dev.api.twinte.net";
export const YEAR: number = new Date().getFullYear();

import _axios from "axios";
export const axios = _axios.create({
  withCredentials: true
});
