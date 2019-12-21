export const BASE_URL: string =
  process.env.API_URL || 'https://dev.api.twinte.net/v1';
const date = new Date();
export const YEAR: number =
  date.getMonth() < 4 ? date.getFullYear() - 1 : date.getFullYear();

import _axios from 'axios';
export const axios = _axios.create({
  withCredentials: true
});
