import { BASE_URL, axios } from './config'
const url = BASE_URL

async function login() {
  try {
    const { data } = await axios.get(`${url}/login`)
    return data
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return null
  }
}

async function logout() {
  try {
    const { data } = await axios.get(`${url}/logout`)
    return data
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return null
  }
}

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
    if (status === 401) {
      return false
    }
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return false
  }
}

export { login, logout, isLogin }
