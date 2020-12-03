export const BASE_URL =
  process.env.NODE_ENV != 'production'
    ? 'https://api.twinte.net/v1' // 'https://api.dev.twinte.net/v1'
    : process.env.API_URL || 'https://api.twinte.net/v1'
const date = new Date()
export const YEAR =
  date.getMonth() + 1 < 4 ? date.getFullYear() - 1 : date.getFullYear()
