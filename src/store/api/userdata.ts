import axios from 'axios'
import { BASE_URL } from '.'

const url = BASE_URL + '/userdatas'

/**
 * 指定した講義のユーザーデータを取得
 * @param lectureId
 * @param year
 */
async function getUserData(lectureId: string, year: number = 2019) {
  try {
    const { data } = await axios.post(`${url}/${year}/${lectureId}`)
    return data
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return null
  }
}

/**
 * 指定した講義のユーザーデータを更新
 * @param lectureId
 * @param year
 */
async function updateUserData(lectureId: string, year: number = 2019) {
  try {
    const { data } = await axios.put(`${url}/${year}/${lectureId}`)
    return data
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return null
  }
}

export { getUserData, updateUserData }
