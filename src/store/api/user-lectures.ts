import { BASE_URL, axios } from './config';
const url = BASE_URL + '/user-lectures';
import { UserLectureEntity } from '../../types/server';

/**
 * 指定した講義のユーザーデータを取得
 * @param user_lecture_id
 */
async function getUserData(user_lecture_id: string) {
  try {
    const { data } = await axios.get<UserLectureEntity>(
      `${url}/${user_lecture_id}`
    );
    return data;
  } catch (error) {
    const { status, statusText } = error.response;
    console.log(`Error! HTTP Status: ${status} ${statusText}`);
    return null;
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
    );
    return data;
  } catch (error) {
    const { status, statusText } = error.response;
    console.log(`Error! HTTP Status: ${status} ${statusText}`);
    return null;
  }
}

/**
 * 指定した講義のユーザーデータを削除
 * @param user_lecture_id
 */
async function deleteUserData(UserLecture: UserLectureEntity) {
  try {
    await axios.delete<UserLectureEntity>(
      `${url}/${UserLecture.user_lecture_id}`
    );
  } catch (error) {
    const { status, statusText } = error.response;
    console.log(`Error! HTTP Status: ${status} ${statusText}`);
  }
  return;
}

export { getUserData, updateUserData, deleteUserData };
