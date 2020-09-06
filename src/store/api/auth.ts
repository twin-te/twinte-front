import { BASE_URL, axios } from '@/common/config'
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
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return false
  }
}

export { isLogin }
