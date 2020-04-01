export const BASE_URL: string =
  process.env.API_URL || 'https://api.twinte.net/v1'
const date = new Date()
export const YEAR: number =
  date.getMonth() + 1 < 4 ? date.getFullYear() - 1 : date.getFullYear()

import _axios from 'axios'
export const axios = _axios.create({
  withCredentials: true,
})
