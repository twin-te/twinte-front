import { BASE_URL, axios } from './config'
const url = BASE_URL

/**
 * ログインされているかの判定 true : false
 * ネートワークエラーもfalse
 */
async function isLogin(): Promise<boolean> {
  try {
    await axios.get(`${url}/users/me`)
    return true
  } catch (error) {
    if (error.response && error.response.status && error.response.statusText) {
      console.error(
        `Error! HTTP Status: ${error.response.status} ${error.response.statusText}`
      )
    }
    return false
  }
}

export { isLogin }
