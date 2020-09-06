import { BASE_URL, axios, YEAR } from '../../common/config'
const url = BASE_URL + '/user-lectures'
import { UserLectureEntity } from '../../types/server'
import union from 'lodash/union'

/**
 * 指定した講義のユーザーデータを追加
 * 取得された `user_lecture_id` はとっても大事
 */
async function postUserData(lecture_name: string, instructor: string) {
  try {
    const { data } = await axios.post<UserLectureEntity>(`${url}`, {
      year: YEAR,
      lecture_name,
      instructor,
      // TODO
      credits: 0,
      formats: [],
    })
    return data
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return null
  }
}

/**
 * 指定した講義のユーザーデータを取得
 * @param user_lecture_id
 */
async function getUserData(user_lecture_id: string) {
  try {
    const { data } = await axios.get<UserLectureEntity>(
      `${url}/${user_lecture_id}`
    )
    return data
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return null
  }
}

/**
 * 指定した講義のユーザーデータを更新
 * @param user_lecture_id
 */
async function updateUserData(UserLecture: UserLectureEntity) {
  try {
    const { data } = await axios.put<UserLectureEntity>(
      `${url}/${UserLecture.user_lecture_id}`,
      UserLecture
    )
    return data
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
    return null
  }
}

/**
 * 指定した講義のユーザーデータを削除
 * @param user_lecture_id
 */
async function deleteUserData(user_lecture_id: string) {
  try {
    await axios.delete<UserLectureEntity>(`${url}/${user_lecture_id}`)
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
  }
  return
}

/**
 * 講義のユーザーデータをすべて削除
 */
async function deleteUserDataAll() {
  try {
    const targetLectures = await axios.get<UserLectureEntity[]>(
      `${BASE_URL}/user-lectures`
    )

    const userLectureIds = targetLectures.data.reduce<string[]>((acc, l) => {
      acc.push(l.user_lecture_id)
      return acc
    }, [])

    union(userLectureIds).forEach(async (i) => await deleteUserData(i))
    location.reload()
  } catch (error) {
    const { status, statusText } = error.response
    console.log(`Error! HTTP Status: ${status} ${statusText}`)
  }
  return
}

export {
  postUserData,
  getUserData,
  updateUserData,
  deleteUserData,
  deleteUserDataAll,
}
