import { BASE_URL, axios } from './config'
const url = BASE_URL + '/userdatas'
import { UserData } from "../../types/server";

/**
 * 指定した講義のユーザーデータを取得
 * @param lectureId
 * @param year
 */
async function getUserData(lectureId: string, year: number = 2019) {
  try {
    const { data } = await axios.get<UserData>(`${url}/${year}/${lectureId}`)
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
async function updateUserData(userData: UserData) {
  try {
    const { data } = await axios.put<UserData>(`${url}/${userData.year}/${userData.lectureID}`, {
      memo: userData.memo,
      attendance: userData.attendance,
      absence: userData.absence,
      late: userData.late
    })
    return data
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return null
  }
}

export { getUserData, updateUserData }
