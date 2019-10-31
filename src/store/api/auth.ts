import axios from 'axios'
import { BASE_URL } from '.'

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
 * nullの場合はネートワークエラー
 */
async function isLogin() {
  try {
    const { data } = await axios.get(`${url}/users/me`)
    return data ? true : false
  } catch (error) {
    const { status, statusText } = error.response
    if (status === 401) {
      return false
    }
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return null
  }
}

export { login, logout, isLogin }
